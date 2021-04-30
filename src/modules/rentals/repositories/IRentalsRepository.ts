import { Rental } from "../infra/typeorm/entities/Rental";

interface ICreateRental {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

interface IRentalsRepository {
  create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRental): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository, ICreateRental };
