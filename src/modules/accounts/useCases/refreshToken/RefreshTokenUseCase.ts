import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: DayjsDateProvider
  ) {}
  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;

    const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userTokens) {
      throw new AppError("Refresh Token dows not exists!");
    }

    await this.usersTokensRepository.deleteById(userTokens.id);

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      auth.expires_in_refresh_token_days
    );

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });
    await this.usersTokensRepository.create({
      user_id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
