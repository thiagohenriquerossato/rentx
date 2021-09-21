import { inject, injectable } from "tsyringe";

import { Rental } from "../../infra/typeorm/entities/Rental";
import { RentalsRepository } from "../../infra/typeorm/repositories/RentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: RentalsRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
