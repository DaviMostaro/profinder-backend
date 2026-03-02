import { eq } from "drizzle-orm";
import { db } from "../../db";
import { savedPosts } from "../../db/schema";
import getPostByIdService from "./get-post-by-id.service";

export default async function getSavedPostsService(userId: string) {
    const savedPostsIds = await db.query.savedPosts.findMany({
        where: eq(savedPosts.userId, userId),
        columns: {
            postId: true,
        },
    });

    const posts = await Promise.all(
        savedPostsIds.map((savedPost) =>
            getPostByIdService(savedPost.postId)
        )
    );

    return posts;   
}