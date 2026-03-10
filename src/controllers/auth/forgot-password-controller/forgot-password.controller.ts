import {z} from "zod";
import {forgotPasswordService} from "../../../services/auth/forgot-password.service";
import {Request, Response} from "express";
import {UserNotFoundError} from "../../../errors/user-not-found.error";

export async function forgotPasswordController(req: Request, res: Response): Promise<Response> {
    const forgotPasswordSchema = z.object({
        email: z.string()
    });
    const { email } = forgotPasswordSchema.parse(req.body);

    try {
        const sender = await forgotPasswordService(email);
        return res.status(200).send({ sender });
    }catch (error) {
        if(error instanceof UserNotFoundError){
            return res.status(404).send({ message: error.message });
        }

        return res.status(500).send({ message: "Internal Server Error" });
    }
}