import {Request, Response} from "express";
import {z} from "zod";
import {generateResetToken} from "../../services/auth/generate-reset-token.service";
import {env} from "../../env";

export async function requestResetTokenController(req: Request, res: Response): Promise<Response> {
    const requestResetTokenSchema = z.object({
        email: z.string(),
        id: z.uuid()
    });
    const { email, id } = requestResetTokenSchema.parse(req.body);

    const token = generateResetToken(email, id);
    const resetLink = `${env.FRONTEND_URL}/${id}/${token}`;

    return res.status(200).json({ link: resetLink });
}