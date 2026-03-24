import { eq } from "drizzle-orm";
import { db } from "../../db";
import { reviews } from "../../db/schema";
import { ReviewNotFoundError } from "../../errors/review-not-found.error";

interface EditReviewsProps {
    id: string,
    rating?: number,
    comment?: string | null,
}

interface EditReviewsResponse {
    rating: number,
    comment: string | null,
}

export async function editReviewService({ id, rating, comment }: EditReviewsProps): Promise<EditReviewsResponse> {
    const getReviewById = await db.query.reviews.findFirst({
        where: eq(reviews.id, id)
    })

    if (!id || !getReviewById) {
        throw new ReviewNotFoundError();
    }

    await db.update(reviews).set({
        rating: rating || getReviewById.rating,
        comment: comment || getReviewById.comment,
    }).where(eq(reviews.id, id))

    return {
        rating: rating || getReviewById.rating,
        comment: comment || getReviewById.comment,
    };
}