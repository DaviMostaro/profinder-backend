import { Router } from "express";
import { editReviewController } from "../controllers/reviews/edit-review.controller";

export const reviewsRoutes = Router();

reviewsRoutes.put("/:id", editReviewController);