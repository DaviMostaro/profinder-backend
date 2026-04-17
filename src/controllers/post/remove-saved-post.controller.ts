import { removeSavedPostService } from "../../services/post/remove-saved-post.service";
import { ExtendedRequest } from "../../types/extended-request";
import { Response } from "express";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { BadRequestError } from "../../errors/bad-request.error";
import { RemoveSavedPostError } from "../../errors/remove-saved-post.error";

export async function removeSavedPostController(req: ExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const savedPostId = req.params.id;

    if (!userId) {
        throw new UnauthorizedError();
    }

    if (!savedPostId) {
        throw new BadRequestError("ID do post salvo é obrigatório");
    }

    const removedPost = await removeSavedPostService(userId, savedPostId);

    if (!removedPost) {
        throw new RemoveSavedPostError();
    }

    return res.status(200).json({ message: "Post removido com sucesso" });
}