import jwt, {SignOptions} from "jsonwebtoken";
import {env} from "../../env";
import {TokenInvalidOrNotFoundError} from "../../errors/token-invalid-or-not-found.error";

export function generateResetToken(email: string, id: string){
    const payload = { email, id };
    const options: SignOptions = { expiresIn: "1h" };
    const secret = env.JWT_SECRET as string;

    if (!secret) {
        throw new TokenInvalidOrNotFoundError();
    }

    return jwt.sign(payload, secret, options);
}