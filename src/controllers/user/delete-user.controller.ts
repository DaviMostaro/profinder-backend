import { Request, Response } from "express";
import { deleteUserService } from "../../services/user/delete-user.service";
import { BadRequestError } from "../../errors/bad-request.error";
import { DeleteUserError } from "../../errors/delete-user.error";

export async function deleteUserController(req: Request, res: Response) {
    const userId = req.params.id;

    if (!userId) {
        throw new BadRequestError("ID inválido ou não fornecido");
    }

    await deleteUserService(userId);
    return res.status(200).json({ message: "Usuário deletado com sucesso" });
}