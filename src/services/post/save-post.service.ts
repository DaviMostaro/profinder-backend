import { db } from "../../db";
import { savedPosts } from "../../db/schema";

export async function savePostService(userId: string, postId: string) {
    const savedPost = await db.insert(savedPosts).values({
        userId,
        postId,
    }).returning();

    if (savedPost.length === 0) {
        throw new Error("Erro ao salvar post");
    }

    return savedPost[0];
}