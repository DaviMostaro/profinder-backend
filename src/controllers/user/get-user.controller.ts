import { Request, Response } from "express";
import { getUserService } from "../../services/user/get-user.service";
import { BadRequestError } from "../../errors/bad-request.error";
import { UserNotFoundError } from "../../errors/user-not-found.error";

export async function getUserController(req: Request, res: Response) {
    const userId = req.params.id;
    if (!userId) {
        throw new BadRequestError("ID é obrigatório");
    }

    const user = await getUserService(userId);

    if (!user) {
        throw new UserNotFoundError();
    }

    return res.status(200).json(user);
}