import { deletePostService } from "../../services/post/delete-post.service";
import { ExtendedRequest } from "../../types/extended-request";
import { Response } from "express";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { DeletePostError } from "../../errors/delete-post.error";
import { BadRequestError } from "../../errors/bad-request.error";

export async function deletePostController(req: ExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const postId = req.params.id;

    if (!userId) {
        throw new UnauthorizedError();
    }

    if (!postId) {
        throw new BadRequestError("ID do post é obrigatório");
    }

    const deletedPost = await deletePostService(userId, postId);

    if (!deletedPost) {
        throw new DeletePostError();
    }

    return res.status(200).json({ message: "Post deletado com sucesso" });
}