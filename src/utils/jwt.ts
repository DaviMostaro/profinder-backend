import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { getUserByEmailService } from "../services/user/get-user.service";
import { ExtendedRequest } from "../types/extended-request";
import { env } from "../env";

export const createJWT = (email: string) => {
    return jwt.sign({ email }, env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).json({ error: "Acesso não autorizado" });
        return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Acesso não autorizado" });
        return;
    }

    jwt.verify(token, env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ error: "Acesso não autorizado" });
            return;
        }
        const email = (decoded as { email?: string })?.email;
        if (!email) {
            res.status(401).json({ error: "Acesso não autorizado" });
            return;
        }
        getUserByEmailService(email).then((user) => {
            if (!user) {
                res.status(401).json({ error: "Acesso não autorizado" });
                return;
            }
            req.user = user;
            next();
        });
    });
};
