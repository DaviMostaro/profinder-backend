import { Router } from "express";
import { getUserController } from "../controllers/user/get-user-controller/get-user.controller";

export const userRoutes = Router();

userRoutes.get("/:id", getUserController);