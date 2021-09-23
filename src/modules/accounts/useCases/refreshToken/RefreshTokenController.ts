import { Request, Response } from "express";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    throw new Error();
  }
}

export { RefreshTokenController };
