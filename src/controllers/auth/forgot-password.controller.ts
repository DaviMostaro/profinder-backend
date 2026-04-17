import {z} from "zod";
import {forgotPasswordService} from "../../services/auth/forgot-password.service";
import {Request, Response} from "express";

export async function forgotPasswordController(req: Request, res: Response): Promise<Response> {
    const forgotPasswordSchema = z.object({
        email: z.string()
    });
    const { email } = forgotPasswordSchema.parse(req.body);

    const sender = await forgotPasswordService(email);
    return res.status(200).send({ sender });
}