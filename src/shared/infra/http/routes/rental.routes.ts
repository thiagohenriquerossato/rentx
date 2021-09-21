import { request, response, Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/usecases/createRentals/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/usecases/devolutionRental/DevolutionRentalController";
import { DevolutionRentalUseCase } from "../../../../modules/rentals/usecases/devolutionRental/DevolutionRentalUseCase";
import { ListRentalsByUserController } from "../../../../modules/rentals/usecases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
