import { Request, Response } from "express";
import { getUserPostsService } from "../../../services/user/get-user-posts.service";

export async function getUserPostsController(req: Request, res: Response) {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "ID é obrigatório" });
    }

    const userPosts = await getUserPostsService(userId);

    if (!userPosts) {
        return res.status(404).json({ message: "Nenhum post encontrado para este usuário" });
    }

    return res.status(200).json({ posts: userPosts });
}