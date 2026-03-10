import {Request, Response} from "express";
import {z} from "zod";
import {generateResetToken} from "../../../services/auth/generate-reset-token.service";
import {env} from "../../../env";
import {TokenInvalidOrNotFoundError} from "../../../errors/token-invalid-or-not-found.error";

export async function requestResetTokenController(req: Request, res: Response): Promise<Response> {
    const requestResetTokenSchema = z.object({
        email: z.string(),
        id: z.uuid()
    });
    const { email, id } = requestResetTokenSchema.parse(req.body);

    try{
        const token = generateResetToken(email, id);
        const resetLink = `${env.FRONTEND_URL}/${id}/${token}`;

        return res.status(200).json({ link: resetLink });
    }catch(error){
        if(error instanceof TokenInvalidOrNotFoundError){
            return res.status(401).json({ message: error.message });
        }

        return res.status(500).json({ error: error});
    }
}