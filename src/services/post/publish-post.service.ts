import { db } from "../../db";
import { postImages, posts } from "../../db/schema";
import { CreatePostError } from "../../errors/create-post.error";
import { uploadImage } from "../../utils/upload";

interface PublishPostServiceProps {
    title: string;
    description: string;
    categoryId?: string;
    userId: string;
    files?: Express.Multer.File[];
}

export async function publishPostService({  title, description, categoryId, userId, files }: PublishPostServiceProps) {
    return await db.transaction(async (tx) => {
        const [post] = await tx
            .insert(posts)
            .values({
                title,
                description,
                categoryId,
                userId,
            })
            .returning();

        if (!post) {
            throw new CreatePostError();
        }

        if(files?.length) {
            const urls = await Promise.all(
                files.map((file) => uploadImage(file.buffer))
            );

            await tx.insert(postImages).values(
                urls.map((url) => ({
                    postId: post.id,
                    url,    
                }))
            );
        }

        return post;
    });
}