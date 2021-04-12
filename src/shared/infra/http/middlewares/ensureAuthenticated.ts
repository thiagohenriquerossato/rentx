import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("token missing!", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "81765114eb0beae31f1496f007cc183f"
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    request.user = {
      id: user_id,
    };
    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
