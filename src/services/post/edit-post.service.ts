import { db } from "../../db";
import { postImages, posts } from "../../db/schema";
import { NotFoundPostError } from "../../errors/not-found-post.error";
import { UpdatePostError } from "../../errors/update-post.error";
import { uploadImage } from "../../utils/upload";
import { eq, and } from "drizzle-orm";

interface EditPostServiceProps {
    title?: string;
    description?: string;
    categoryId?: string;
    userId: string;
    postId: string;
    files?: Express.Multer.File[];
}

export async function editPostService({  title, description, categoryId, userId, postId, files }: EditPostServiceProps) {
    if(!postId) {
        throw new NotFoundPostError();
    }

    return await db.transaction(async (tx) => {
        const [updatedPost] = await tx.update(posts).set({
            title,
            description,
            categoryId,
            updatedAt: new Date(),
        }).where(
            and(
                eq(posts.id, postId),
                eq(posts.userId, userId)
            )
        ).returning();

        if (!updatedPost) {
            throw new UpdatePostError();
        }

        await tx.delete(postImages).where(
            eq(postImages.postId, postId)
        );

        if(files?.length) {
            const urls = await Promise.all(
                files.map(file => uploadImage(file.buffer))
            );

            await tx.insert(postImages).values(
                urls.map(url => ({
                    postId,
                    url,    
                }))
            );
        }

        return updatedPost;
    });
}