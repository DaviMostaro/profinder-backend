import { Request, Response } from "express";
import { getUserPostsService } from "../../services/user/get-user-posts.service";
import { BadRequestError } from "../../errors/bad-request.error";
import { UserNotFoundError } from "../../errors/user-not-found.error";

export async function getUserPostsController(req: Request, res: Response) {
    const userId = req.params.id;
    if (!userId) {
        throw new BadRequestError("ID é obrigatório");
    }

    const userPosts = await getUserPostsService(userId);

    if (!userPosts) {
        throw new UserNotFoundError();
    }

    return res.status(200).json({ posts: userPosts });
}