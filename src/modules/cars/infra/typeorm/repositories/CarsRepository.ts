import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    license_plate,
    category_id,
    fine_amount,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      license_plate,
      category_id,
      fine_amount,
      daily_rate,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }
  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });
    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }
}

export { CarsRepository };
