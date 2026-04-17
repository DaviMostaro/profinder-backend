import { Response } from "express";
import { ExtendedRequest } from "../../types/extended-request";
import { savePostService } from "../../services/post/save-post.service";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { BadRequestError } from "../../errors/bad-request.error";

export async function savePostController(req: ExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const postId = req.params.id;

    if (!userId) {
        throw new UnauthorizedError();
    }

    if (!postId) {
        throw new BadRequestError("ID do post é obrigatório");
    }

    await savePostService(userId, postId);
    return res.status(200).json({ message: "Post salvo com sucesso" });
}