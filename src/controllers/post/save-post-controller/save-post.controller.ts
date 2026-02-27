import { Response } from "express";
import { ExtendedRequest } from "../../../types/extended-request";
import { savePostService } from "../../../services/post/save-post.service";

export async function savePostController(req: ExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const postId = req.params.id;

    if (!userId) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    if (!postId) {
        return res.status(400).json({ message: "ID do post é obrigatório" });
    }

    try {
        await savePostService(userId, postId);
        return res.status(200).json({ message: "Post salvo com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao salvar post: " + error });
    }
}