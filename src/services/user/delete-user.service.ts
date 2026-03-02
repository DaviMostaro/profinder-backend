import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { DeleteUserError } from "../../errors/delete-user.error";

export async function deleteUserService(userId: string){
    const deletedUser =await db
        .delete(users)
        .where(eq(users.id, userId))
        .returning();

    if(deletedUser.length === 0) {
        throw new DeleteUserError();
    }

    return { message: "Usuário deletado com sucesso" }
}