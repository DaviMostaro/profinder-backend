import { deletePostService } from "../../../services/post/delete-post.service";
import { ExtendedRequest } from "../../../types/extended-request";
import { Response } from "express";

export async function deletePostController(req: ExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const postId = req.params.id;

    if (!userId) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    if (!postId) {
        return res.status(400).json({ message: "ID do post é obrigatório" });
    }

    try {
        const deletedPost = await deletePostService(userId, postId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post não encontrado ou não pertence ao usuario" });
        }

        return res.status(200).json({ message: "Post deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar post" });
    }
}