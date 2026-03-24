import { Request, Response } from "express";
import { editReviewService } from "../../services/reviews/edit-review.services";
import { z, ZodError } from "zod";
import { ReviewNotFoundError } from "../../errors/review-not-found.error";

const editReviewParamsSchema = z.object({
    id: z.string(),
});

const editReviewBodySchema = z.object({
    rating: z.coerce.number().min(1).max(5).optional(),
    comment: z.string().optional(),
});

export async function editReviewController(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = editReviewParamsSchema.parse(req.params);
        const { rating, comment } = editReviewBodySchema.parse(req.body);

        const editReview = await editReviewService({ id, rating, comment });

        return res.json(editReview);
    } catch (error) {
        if (error instanceof ReviewNotFoundError) {
            return res.status(404).json({ error: error.message });
        }

        if (error instanceof ZodError) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}