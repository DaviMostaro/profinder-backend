import { eq, and } from "drizzle-orm";
import { db } from "../../db";
import { posts } from "../../db/schema";
import { DeletePostError } from "../../errors/delete-post.error";

export async function deletePostService(userId: string, postId: string) {
    const deletedPost = await db.delete(posts).where(
        and(
            eq(posts.id, postId),
            eq(posts.userId, userId)
        )
    ).returning();

    if (deletedPost.length === 0) {
        throw new DeletePostError();
    }

    return deletedPost[0]; 
}