import { Router } from "express";
import { editReviewController } from "../controllers/reviews/edit-review.controller";
import { getReviewsController } from "../controllers/reviews/get-reviews.controller";
import { createReviewController } from "../controllers/reviews/create-review.controller";
import { verifyJWT } from "../utils/jwt";

export const reviewsRoutes = Router();

reviewsRoutes.get("/:postId", getReviewsController);
reviewsRoutes.post("/:userId/:postId", verifyJWT, createReviewController);
reviewsRoutes.put("/:id", editReviewController);
