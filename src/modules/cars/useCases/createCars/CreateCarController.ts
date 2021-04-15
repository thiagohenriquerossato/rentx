import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      daily_rate,
      description,
      license_plate,
      brand,
      category_id,
      fine_amount,
    } = request.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const car = await createCarUseCase.execute({
      name,
      daily_rate,
      description,
      license_plate,
      brand,
      category_id,
      fine_amount,
    });
    return response.status(201).send(car);
  }
}

export { CreateCarController };
