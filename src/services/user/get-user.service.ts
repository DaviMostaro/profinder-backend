import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export async function getUserService(userId: string) {
    const user = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            avatar: users.avatarUrl,
            ddd: users.ddd,
            phone: users.phone,
            bio: users.bio,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)

    return user;
}