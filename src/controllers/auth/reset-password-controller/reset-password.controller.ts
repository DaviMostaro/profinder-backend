import { z } from "zod";
import { Request, Response } from "express";
import { resetPasswordService } from "../../../services/auth/reset-password.service";
import {TokenInvalidOrNotFoundError} from "../../../errors/token-invalid-or-not-found.error";
import {UserNotFoundError} from "../../../errors/user-not-found.error";

export async function resetPasswordController(req: Request, res: Response): Promise<Response> {
    const paramsSchema = z.object({ id: z.string(), token: z.string() });
    const bodySchema = z.object({ newPassword: z.string().min(8, "A senha deve ter no mínimo 8 caracteres") });

    const { id, token } = paramsSchema.parse(req.params);
    const { newPassword } = bodySchema.parse(req.body);

    try{
        await resetPasswordService({ id, token, newPassword });
        return res.sendStatus(204);
    }catch (error){
        if(error instanceof TokenInvalidOrNotFoundError){
            return res.status(401).send({ message: error.message });
        }

        if(error instanceof UserNotFoundError){
            return res.status(404).send({ message: error.message });
        }

        return res.status(500).send({ message: "Internal Server Error", error });
    }
}