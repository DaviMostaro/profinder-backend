import getSavedPostsService from "../../services/post/get-saved-posts.service";
import { ExtendedRequest } from "../../types/extended-request";
import { Response } from "express";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { NotFoundPostError } from "../../errors/not-found-post.error";

export default async function getSavedPostsController(req: ExtendedRequest, res: Response): Promise<Response> {
    const userId = req.user?.id;

    if (!userId) {
        throw new UnauthorizedError();
    }

    const savedPosts = await getSavedPostsService(userId);

    if (savedPosts.length === 0) {
        throw new NotFoundPostError();
    }

    return res.status(200).json(savedPosts);
}