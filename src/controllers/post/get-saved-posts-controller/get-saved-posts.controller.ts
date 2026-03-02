import getSavedPostsService from "../../../services/post/get-saved-posts.service";
import { ExtendedRequest } from "../../../types/extended-request";
import { Response } from "express";

export default async function getSavedPostsController(req: ExtendedRequest, res: Response): Promise<Response> {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    try {
        const savedPosts = await getSavedPostsService(userId);

        if (savedPosts.length === 0) {
            return res.status(404).json({ message: "Nenhum post salvo encontrado" });
        }

        return res.status(200).json(savedPosts);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar posts salvos", error });
    }
}