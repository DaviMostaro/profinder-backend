import { Response } from "express";
import { ExtendedRequest } from "../../../types/extended-request";
import { updateUserSchema } from "../../../schemas/update-user-schema";
import { updateUserService } from "../../../services/user/update-user.service";


export async function updateUserController(req: ExtendedRequest, res: Response) {
    const safeData = updateUserSchema.safeParse(req.body);

    if(!safeData.success) {
        return res.status(400).json({ errors: safeData.error });
    }

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID é obrigatório" });
    }

    const newUser = await updateUserService({
        userId: id,
        data: safeData.data,
    });

    if(!newUser) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: newUser });
}
