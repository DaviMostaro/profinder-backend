import { Router } from "express";
import { signupController } from "../controllers/auth/signup-controller/signup.controller";
import { signinController } from "../controllers/auth/signin-controller/signin.controller";
import {signoutController} from "../controllers/auth/signout-controller/signout.controller";
import {forgotPasswordController} from "../controllers/auth/forgot-password-controller/forgot-password.controller";
import {
    requestResetTokenController
} from "../controllers/auth/reset-password-controller/request-reset-token.controller";
import {resetPasswordController} from "../controllers/auth/reset-password-controller/reset-password.controller";

export const authRoutes = Router();

authRoutes.post("/signup", signupController);
authRoutes.get("/signout", signoutController);
authRoutes.post("/signin", signinController);
authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.get("/reset-password/:token", requestResetTokenController);
authRoutes.put("/reset-password/:id/:token", resetPasswordController)
