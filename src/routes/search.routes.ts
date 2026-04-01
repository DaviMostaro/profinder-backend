import { Router } from "express";
import { searchPostController } from "../controllers/search/search-post.controller";

export const searchRoutes = Router();

searchRoutes.get("/", searchPostController);