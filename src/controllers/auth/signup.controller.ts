import { Request, Response } from "express";
import { z } from "zod";
import { signupService } from "../../services/auth/signup.service";
import { createJWT } from "../../utils/jwt";

export async function signupController(req: Request, res: Response) {
    const signupSchema = z.object({
        name: z.string().min(2),
        email: z.email(),
        password: z.string().min(6),
        ddd: z.string().min(2).max(2),
        phone: z.string().min(9).max(9),
        bio: z.string().optional(),
    });

    const { name, email, password, ddd, phone, bio } = signupSchema.parse(req.body);

    await signupService({ 
        name,
        email,
        password,
        ddd,
        phone,
        bio 
    });

    const token = createJWT(email);

    res.status(201).json({ 
        message: "User created",
        token,
        user: {
            name,
            email,
            ddd,
            phone,
            bio
        },
     });
}