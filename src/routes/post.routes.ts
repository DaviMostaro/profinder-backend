import { Router } from "express";
import { publishPostController } from "../controllers/post/publish-post-controller/publish-post.controller";
import { verifyJWT } from "../utils/jwt";
import { SavePostController } from "../controllers/post/save-post-controller/save-post.controller";
import { upload } from "../lib/multer";

export const postRoutes = Router();

postRoutes.post("/", verifyJWT, upload.array("images", 5), publishPostController);
postRoutes.post("/:id/save", verifyJWT, SavePostController);