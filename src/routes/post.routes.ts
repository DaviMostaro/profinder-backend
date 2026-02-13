import { Router } from "express";
import { publishPostController } from "../controllers/post/publish-post-controller/publish-post.controller";
import { verifyJWT } from "../utils/jwt";

export const postRoutes = Router();

postRoutes.post("/", verifyJWT, publishPostController);