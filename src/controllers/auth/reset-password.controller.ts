import { z } from "zod";
import { Request, Response } from "express";
import { resetPasswordService } from "../../services/auth/reset-password.service";

export async function resetPasswordController(req: Request, res: Response): Promise<Response> {
    const paramsSchema = z.object({ id: z.string(), token: z.string() });
    const bodySchema = z.object({ newPassword: z.string().min(8, "A senha deve ter no mínimo 8 caracteres") });

    const { id, token } = paramsSchema.parse(req.params);
    const { newPassword } = bodySchema.parse(req.body);

    await resetPasswordService({ id, token, newPassword });
    return res.sendStatus(204);
}