import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      daily_rate: 100,
      description: "Description car",
      license_plate: "a1b2c3",
      brand: "Brand",
      category_id: "category",
      fine_amount: 50,
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        daily_rate: 100,
        description: "Description car",
        license_plate: "a1b2c3",
        brand: "Brand",
        category_id: "category",
        fine_amount: 50,
      });
      await createCarUseCase.execute({
        name: "Car2",
        daily_rate: 100,
        description: "Description car",
        license_plate: "a1b2c3",
        brand: "Brand",
        category_id: "category",
        fine_amount: 50,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      daily_rate: 100,
      description: "Description car",
      license_plate: "a1b2c3",
      brand: "Brand",
      category_id: "category",
      fine_amount: 50,
    });
    expect(car.available).toBe(true);
  });
});
