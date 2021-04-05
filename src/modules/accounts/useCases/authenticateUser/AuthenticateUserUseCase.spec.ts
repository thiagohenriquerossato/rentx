import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUserCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUserCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUserCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "test@mail.com",
      name: "name test",
      password: "1234",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "Test",
        password: "12344",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "test@mail.com",
      name: "name test",
      password: "1234",
    };
    await createUserUseCase.execute(user);
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "12344",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
