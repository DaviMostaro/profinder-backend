import { removeSavedPostService } from "../../../services/post/remove-saved-post.service";
import { ExtendedRequest } from "../../../types/extended-request";
import { Response } from "express";

export async function removeSavedPostController(req: ExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const savedPostId = req.params.id;

    if (!userId) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    if (!savedPostId) {
        return res.status(400).json({ message: "ID do post salvo é obrigatório" });
    }

    try {
        const removedPost = await removeSavedPostService(userId, savedPostId);

        if (!removedPost) {
            return res.status(404).json({ message: "Post não encontrado ou não salvo" });
        }

        return res.status(200).json({ message: "Post removido com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}