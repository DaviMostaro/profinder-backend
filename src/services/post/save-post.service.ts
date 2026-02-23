import { db } from "../../db";
import { savedPosts } from "../../db/schema";

export async function savePostService(userId: string, postId: string) {
    const savedPost = await db.insert(savedPosts).values({
        userId,
        postId,
    }).returning();

    return savedPost[0];
}