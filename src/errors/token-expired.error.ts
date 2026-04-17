import { AppError } from "./app-error";

export class TokenExpiredError extends AppError {
  constructor(message = "Token expirado ou inválido") {
    super(message, 401, "TOKEN_EXPIRED");
  }
}