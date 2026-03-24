import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { posts, reviews } from "../../db/schema";
import { NotFoundPostError } from "../../errors/not-found-post.error";

interface GetReviewsResponse {
    rating: number;
    comment: string;
}

export async function getReviewsService(postId: string, page: number, limit: number): Promise<GetReviewsResponse[]> {
    const post = await db.query.posts.findFirst({
        where: eq(posts.id, postId),
    })

    if (!post || !postId) {
        throw new NotFoundPostError();
    }

    const listReviews = await db.select()
        .from(reviews)
        .where(eq(reviews.postId, postId))
        .orderBy(asc(reviews.createdAt))
        .limit(limit)
        .offset((page - 1) * limit)

    const reviewsResponse: GetReviewsResponse[] = listReviews.map((review) => ({
        rating: review.rating,
        comment: review.comment || "",
    }));

    return reviewsResponse || [];
}