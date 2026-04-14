import { Router } from "express";
import { publishPostController } from "../controllers/post/publish-post.controller";
import { verifyJWT } from "../utils/jwt";
import { savePostController } from "../controllers/post/save-post.controller";
import { upload } from "../lib/multer";
import { removeSavedPostController } from "../controllers/post/remove-saved-post.controller";
import getSavedPostsController from "../controllers/post/get-saved-posts.controller";
import { editPostController } from "../controllers/post/edit-post.controller";
import { deletePostController } from "../controllers/post/delete-post.controller";

export const postRoutes = Router();

postRoutes.post("/", verifyJWT, upload.array("images", 5), publishPostController);
postRoutes.post("/:id/save", verifyJWT, savePostController);
postRoutes.delete("/:id/remove", verifyJWT, removeSavedPostController);
postRoutes.get("/saved-posts", verifyJWT, getSavedPostsController);
postRoutes.put("/:id/update", verifyJWT, upload.array("images", 5), editPostController);
postRoutes.delete("/:id/delete", verifyJWT, deletePostController);