import { Request, Response } from "express";
import { getUserService } from "../../../services/user/get-user.service";

export async function getUserController(req: Request, res: Response) {
    const userId = req.params.id;

    const user = await getUserService(userId);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
}