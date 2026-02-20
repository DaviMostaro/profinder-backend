import { Router } from "express";
import { signupController } from "../controllers/auth/signup-controller/signup.controller";
import { signinController } from "../controllers/auth/signin-controller/signin.controller";
import {signoutController} from "../controllers/auth/signout-controller/signout.controller";

export const authRoutes = Router();

authRoutes.post("/signup", signupController);
authRoutes.get("/signout", signoutController);
authRoutes.post("/signin", signinController);