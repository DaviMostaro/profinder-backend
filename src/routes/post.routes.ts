import { Router } from "express";
import { publishPostController } from "../controllers/post/publish-post-controller/publish-post.controller";
import { verifyJWT } from "../utils/jwt";
import { savePostController } from "../controllers/post/save-post-controller/save-post.controller";
import { upload } from "../lib/multer";
import { removeSavedPostController } from "../controllers/post/remove-saved-post-controller/remove-saved-post.controller";
import getSavedPostsController from "../controllers/post/get-saved-posts-controller/get-saved-posts.controller";

export const postRoutes = Router();

postRoutes.post("/", verifyJWT, upload.array("images", 5), publishPostController);
postRoutes.post("/:id/save", verifyJWT, savePostController);
postRoutes.delete("/:id/remove", verifyJWT, removeSavedPostController);
postRoutes.get("/saved-posts", verifyJWT, getSavedPostsController);