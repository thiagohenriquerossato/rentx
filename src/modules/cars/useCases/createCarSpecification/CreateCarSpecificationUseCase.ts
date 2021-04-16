import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const cars = await this.carsRepository.findById(car_id);

    if (!cars) {
      throw new AppError("Car does not exists!");
    }
    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    cars.specifications = specifications;
    const car = await this.carsRepository.create(cars);

    return car;
  }
}

export { CreateCarSpecificationUseCase };
