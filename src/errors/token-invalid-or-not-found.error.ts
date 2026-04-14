import { AppError } from "./app-error";

export class TokenInvalidOrNotFoundError extends AppError {
  constructor() {
    super("Token inválido ou não encontrado", 400, "TOKEN_INVALID_OR_NOT_FOUND");
  }
}