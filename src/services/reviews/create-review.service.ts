import { db } from "../../db";
import { reviews, users, posts } from "../../db/schema";
import { UserNotFoundError } from "../../errors/user-not-found.error";
import { NotFoundPostError } from "../../errors/not-found-post.error";
import { eq } from "drizzle-orm";
import { RatingNotIntegerError } from "../../errors/rating-not-integer.error";

interface CreateReviewProps {
    userId: string,
    postId: string,
    rating: number,
    comment?: string,
}

export async function createReviewService({ userId, postId, rating, comment }: CreateReviewProps) {
    const userExists = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    if (userExists.length === 0) {
        throw new UserNotFoundError();
    }

    const postExists = await db
        .select({ id: posts.id })
        .from(posts)
        .where(eq(posts.id, postId))
        .limit(1);

    if (postExists.length === 0) {
        throw new NotFoundPostError();
    }

    if (!Number.isInteger(rating)) {
        throw new RatingNotIntegerError();
    }

    const createdReview = await db
        .insert(reviews)
        .values({
            userId,
            postId,
            rating,
            comment,
        })
        .returning();

    return createdReview[0];
}