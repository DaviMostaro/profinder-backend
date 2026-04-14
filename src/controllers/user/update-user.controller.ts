import { Response } from "express";
import { ExtendedRequest } from "../../types/extended-request";
import { updateUserSchema } from "../../schemas/update-user-schema";
import { updateUserService } from "../../services/user/update-user.service";
import { uploadImage } from "../../utils/upload";
import { BadRequestError } from "../../errors/bad-request.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";

export async function updateUserController(req: ExtendedRequest, res: Response) {
    const safeData = updateUserSchema.safeParse(req.body);

    if(!safeData.success) {
        throw new BadRequestError("Dados inválidos");
    }

    const { id } = req.params;
    if (!id) {
        throw new BadRequestError("ID é obrigatório");
    }
    if (id !== req.user!.id) {
        throw new UnauthorizedError();
    }

    let avatarUrl: string | undefined;

    if (req.file) {
        avatarUrl = await uploadImage(req.file.buffer)
    }

    if (!Object.keys(safeData.data).length && !req.file) {
        throw new BadRequestError("Nenhum dado para atualizar");
    }   

    const newUser = await updateUserService({
        userId: id,
        data: {
            ...safeData.data,
            avatarUrl,
        },
    });

    return res.status(200).json({ user: newUser });
}