import { editPostBodySchema } from "../../schemas/edit-post-body-schema";
import { editPostService } from "../../services/post/edit-post.service";
import { ExtendedRequest } from "../../types/extended-request";
import { Response } from "express";
import { BadRequestError } from "../../errors/bad-request.error";
import { UpdatePostError } from "../../errors/update-post.error";

export async function editPostController(req: ExtendedRequest, res: Response) {
    const { title, description, categoryId } = editPostBodySchema.parse(req.body);
    const userId = req.user!.id;
    const postId = req.params.id;
    const files = req.files as Express.Multer.File[];

    if (!postId) {
        throw new BadRequestError("ID do post é obrigatório");
    }

    const updatedPost = await editPostService({
        title,
        description,
        categoryId,
        userId,
        postId,
        files
    });

    if (!updatedPost) {
        throw new UpdatePostError();
    }

    return res.status(200).json(updatedPost);
}