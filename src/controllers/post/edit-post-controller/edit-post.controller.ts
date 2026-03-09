import { editPostBodySchema } from "../../../schemas/edit-post-body-schema";
import { editPostService } from "../../../services/post/edit-post.service";
import { ExtendedRequest } from "../../../types/extended-request";
import { Response } from "express";

export async function editPostController(req: ExtendedRequest, res: Response) {
    const { title, description, categoryId } = editPostBodySchema.parse(req.body);
    const userId = req.user!.id;
    const postId = req.params.id;
    const files = req.files as Express.Multer.File[];

    if (!postId) {
        return res.status(400).json({ message: "ID do post é obrigatório" });
    }

    try {
        const updatedPost = await editPostService({
            title,
            description,
            categoryId,
            userId,
            postId,
            files
        });

        if (!updatedPost) {
            return res.status(404).json({ message: "Falha ao editar post" });
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao editar post", error });
    }
}