import { Router } from "express";
import { getReviewsController } from "../controllers/reviews/get-reviews.controller";

export const reviewsRoutes = Router();

reviewsRoutes.get("/:postId", getReviewsController);