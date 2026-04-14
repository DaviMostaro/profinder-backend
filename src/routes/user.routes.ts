import { Router } from "express";
import { getUserController } from "../controllers/user/get-user.controller";
import { getUserPostsController } from "../controllers/user/get-user-posts.controller";
import { updateUserController } from "../controllers/user/update-user.controller";
import { verifyJWT } from "../utils/jwt";
import { deleteUserController } from "../controllers/user/delete-user.controller";
import { upload } from "../lib/multer";

export const userRoutes = Router();

userRoutes.get("/:id", getUserController);
userRoutes.put("/:id/update", verifyJWT, upload.single("avatar"), updateUserController);
userRoutes.get("/:id/posts", getUserPostsController);
userRoutes.delete("/:id/delete", verifyJWT, deleteUserController);