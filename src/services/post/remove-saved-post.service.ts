import { eq } from "drizzle-orm";
import { db } from "../../db";
import { savedPosts } from "../../db/schema";
import { RemoveSavedPostError } from "../../errors/remove-saved-post.error";

export async function removeSavedPostService(userId: string, savedPostId: string) {
    const removedPost = await db.delete(savedPosts).where(
        eq(savedPosts.id, savedPostId)
    ).returning();

    if (removedPost.length === 0) {
        throw new RemoveSavedPostError();
    }

    return removedPost[0];
}