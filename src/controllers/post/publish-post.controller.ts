import { Response } from "express";
import { publishPostService } from "../../services/post/publish-post.service";
import { postBodySchema } from "../../schemas/post-body-schema";
import { ExtendedRequest } from "../../types/extended-request";

export async function publishPostController(req: ExtendedRequest, res: Response) {
    const { title, description, categoryId } = postBodySchema.parse(req.body);
    const userId = req.user!.id;
    const files = req.files as Express.Multer.File[];

    const post = await publishPostService({
        title,
        description,
        categoryId,
        userId,
        files
    });

    return res.status(201).json(post);
}