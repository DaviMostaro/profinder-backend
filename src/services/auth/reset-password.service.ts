import {db} from "../../db";
import {eq} from "drizzle-orm";
import {users} from "../../db/schema";
import {hash} from "bcryptjs";
import jwt, {JwtPayload} from "jsonwebtoken";
import {TokenInvalidOrNotFoundError} from "../../errors/token-invalid-or-not-found.error";
import {UserNotFoundError} from "../../errors/user-not-found.error";
import {env} from "../../env";

interface ResetPasswordProps {
    id: string;
    token: string;
    newPassword: string;
}

export async function resetPasswordService({ id, token, newPassword }: ResetPasswordProps){
    const saltRounds = 6;
    const secret = env.JWT_SECRET as string;

    if (!secret) {
        throw new TokenInvalidOrNotFoundError();
    }

    const tokenVerifier = jwt.verify(token, secret) as JwtPayload;
    if (tokenVerifier.id !== id) {
        throw new TokenInvalidOrNotFoundError();
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, id)
    });

    if(!user){
        throw new UserNotFoundError();
    }

    const hashedPassword = await hash(newPassword, saltRounds);
    return db
        .update(users)
        .set({
            password: hashedPassword,
            updatedAt: new Date()
        })
        .where(eq(users.id, id));
}