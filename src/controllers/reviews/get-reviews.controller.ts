import { Request, Response } from "express";
import { getReviewsService } from "../../services/reviews/get-reviews.services";
import { z } from "zod";

const getReviewsSchema = z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
});

const getReviewsParamsSchema = z.object({
    postId: z.string().uuid("postId inválido"),
});

export async function getReviewsController(req: Request, res: Response): Promise<Response> {
    const { postId } = getReviewsParamsSchema.parse(req.params);
    const { page, limit } = getReviewsSchema.parse(req.query);

    const reviews = await getReviewsService(postId, Number(page), Number(limit));

    return res.json(reviews);
}