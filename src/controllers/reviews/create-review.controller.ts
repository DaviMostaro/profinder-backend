import { Request, Response } from "express";
import z from "zod";
import { createReviewService } from "../../services/reviews/create-review.service";
import { UserNotFoundError } from "../../errors/user-not-found.error";
import { NotFoundPostError } from "../../errors/not-found-post.error";
import { RatingNotIntegerError } from "../../errors/rating-not-integer.error";

export async function createReviewController(req: Request, res: Response): Promise<Response> {
    const bodySchema = z.object({
        rating: z.number().min(1, "A avaliação precisa estar entre 1 e 5").max(5, "A avaliação precisa estar entre 1 e 5"),
        comment: z.string().min(1, "O comentário precisa ter pelo menos 1 caractere"),
    })

    const paramsSchema = z.object({
        userId: z.uuid(),
        postId: z.uuid(),
    })

    const body = bodySchema.parse(req.body);
    const params = paramsSchema.parse(req.params);

    try {
        const review = await createReviewService({
            userId: params.userId,
            postId: params.postId,
            rating: body.rating,
            comment: body.comment,
        })

        return res.status(201).json({ message: "Avaliação criada com sucesso", rating: review?.rating, comment: review?.comment });
    } catch (error) {
        if(error instanceof UserNotFoundError){
            return res.status(404).json({ error: error.message });
        }

        if(error instanceof NotFoundPostError){
            return res.status(404).json({ error: error.message });
        }

        if(error instanceof RatingNotIntegerError){
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}