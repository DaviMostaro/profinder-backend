import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { UserNotFoundError } from "../../errors/user-not-found.error";

interface updateUserProps {
    userId: string;
    data: {
        name?: string;
        ddd?: string;
        phone?: string;
        bio?: string;
        avatarUrl?: string;
    }
}

export async function updateUserService({ userId, data }: updateUserProps) {
    const updatedUser = await db
        .update(users)
        .set({
            ...data,
            updatedAt: new Date(),
        })
        .where(eq(users.id, userId))
        .returning({
            name: users.name,
            avatarUrl: users.avatarUrl,
            ddd: users.ddd,
            phone: users.phone,
            bio: users.bio,
            updatedAt: users.updatedAt,
        });

    if(updatedUser.length === 0) {
        throw new UserNotFoundError();
    }

    return updatedUser[0];
}