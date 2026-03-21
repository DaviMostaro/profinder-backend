import { Router } from "express";
import { createReviewController } from "../controllers/reviews/create-review.controller";
import { verifyJWT } from "../utils/jwt";

export const reviewRoutes = Router();

reviewRoutes.post("/:userId/:postId", verifyJWT, createReviewController);