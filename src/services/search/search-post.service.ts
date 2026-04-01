import { searchPostResponseType } from "../../types/post-type";
import { asc, desc, eq, and, ilike } from "drizzle-orm";
import { db } from "../../db";
import { posts, users, locations } from "../../db/schema";

export async function searchPostService(
        q: string, 
        page: number, 
        limit: number, 
        order: string, 
        category?: string, 
        location?: string
    ): Promise<searchPostResponseType[]> {
    const searchResults = await db
        .select({
            id: posts.id,
            title: posts.title,
            description: posts.description,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
            userId: posts.userId,
            categoryId: posts.categoryId,
            city: locations.city,
            state: locations.state,
        })
        .from(posts)
        .innerJoin(users, eq(posts.userId, users.id))
        .leftJoin(locations, eq(users.locationId, locations.id))
        .where(
            and(
                ilike(posts.title, `%${q}%`),
                category ? eq(posts.categoryId, category) : undefined,
                location ? ilike(locations.city, `%${location}%`) : undefined,
            )
        )
        .orderBy(order === "asc" ? asc(posts.createdAt) : desc(posts.createdAt))
        .limit(limit)
        .offset((page - 1) * limit)

    return searchResults ?? [];
}