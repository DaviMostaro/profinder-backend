import { db } from "../../db";
import { savedPosts } from "../../db/schema";
import { SavePostError } from "../../errors/save-post.error";

export async function savePostService(userId: string, postId: string) {
    const savedPost = await db.insert(savedPosts).values({
        userId,
        postId,
    }).returning();

    if (savedPost.length === 0) {
        throw new SavePostError();
    }

    return savedPost[0];
}