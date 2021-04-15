import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase.";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description",
      brand: "Car brand",
      license_plate: "aa3234sxd3",
      category_id: "Category ID",
      fine_amount: 150,
      daily_rate: 300,
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand",
      license_plate: "aa3234sxd3",
      category_id: "Category1 ID",
      fine_amount: 150,
      daily_rate: 300,
    });
    const cars = await listAvailableCarsUseCase.execute({ name: "Car1" });
    expect(cars).toEqual([car1]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car2 = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      brand: "Car2 brand",
      license_plate: "aa3234sxd3",
      category_id: "Category2 ID",
      fine_amount: 150,
      daily_rate: 300,
    });
    const cars = await listAvailableCarsUseCase.execute({ brand: "Car brand" });
    expect(cars).toEqual([car2]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car3 = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car3 description",
      brand: "Car3 brand",
      license_plate: "aa3334sxd3",
      category_id: "Category3 ID",
      fine_amount: 150,
      daily_rate: 300,
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "Category3 ID",
    });
    expect(cars).toEqual([car3]);
  });
});
