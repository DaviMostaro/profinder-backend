import { eq } from "drizzle-orm";
import { db } from "../../db";
import { posts } from "../../db/schema";

export default async function getPostByIdService(postId: string) {
    const post = await db.query.posts.findFirst({
        where: eq(posts.id, postId),
        with: {
            images: true,
        },
    });

    return post;
}