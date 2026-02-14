import z from "zod";
import { Request, Response } from "express";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials.error";
import { signinService } from "../../../services/auth/signin.service";
import { createJWT } from "../../../utils/jwt";

export async function signinController(req: Request, res: Response) {
    const signinUserBodySchema = z.object({
        email: z.email(),
        password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
    });

    const { email, password } = signinUserBodySchema.parse(req.body)

    try {
        const { user } = await signinService({ email, password });

        const token = createJWT(user.email);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(401).json({ message: error.message });
        }

        throw error;
    }
}