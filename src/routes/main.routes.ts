import { Router } from "express";
import { authRoutes } from "./auth.routes.";
import { userRoutes } from "./user.routes";
import { postRoutes } from "./post.routes";
import { reviewsRoutes } from "./reviews.routes";

import { reviewsRoutes } from "./reviews.routes";

export const mainRoutes = Router();

mainRoutes.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/user", userRoutes);
mainRoutes.use("/post", postRoutes);
mainRoutes.use("/reviews", reviewsRoutes);

