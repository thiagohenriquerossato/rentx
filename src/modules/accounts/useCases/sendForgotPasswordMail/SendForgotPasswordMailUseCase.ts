import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email does not exists!");
    }

    const token = uuidV4();
    const expires_date = this.dateProvider.addHours(3);
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    await this.mailProvider.sandMail(
      email,
      "Recuperação de senha",
      `O link para redefinição de senha é${token}`
    );
  }
}

export { SendForgotPasswordMailUseCase };
