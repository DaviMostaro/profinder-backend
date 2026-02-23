import { Response } from "express";
import { ExtendedRequest } from "../../../types/extended-request";
import { savePostService } from "../../../services/post/save-post.service";

export async function SavePostController(req: ExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const postId = req.params.id;

    if (!userId) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    if (!postId) {
        return res.status(400).json({ message: "ID do post é obrigatório" });
    }

    try {
        const savedPost = await savePostService(userId, postId);
        return res.status(200).json({ message: "Post salvo com sucesso", savedPost });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao salvar post: " + error });
    }
}