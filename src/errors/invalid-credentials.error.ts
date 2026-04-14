import { AppError } from "./app-error";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Email ou senha inválidos", 401, "INVALID_CREDENTIALS");
  }
}