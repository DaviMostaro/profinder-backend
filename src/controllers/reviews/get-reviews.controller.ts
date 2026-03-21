import { Request, Response } from "express";
import { getReviewsService } from "../../services/reviews/get-reviews.services";
import { z, ZodError } from "zod";
import { NotFoundPostError } from "../../errors/not-found-post.error";

const getReviewsSchema = z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
});

const getReviewsParamsSchema = z.object({
    postId: z.string().uuid("postId inválido"),
});

export async function getReviewsController(req: Request, res: Response): Promise<Response> {
    try {
        const { postId } = getReviewsParamsSchema.parse(req.params);
        const { page, limit } = getReviewsSchema.parse(req.query);

        const reviews = await getReviewsService(postId, Number(page), Number(limit));

        return res.json(reviews);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.issues[0]?.message ?? "Requisição inválida" });
        }

        if (error instanceof NotFoundPostError) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}