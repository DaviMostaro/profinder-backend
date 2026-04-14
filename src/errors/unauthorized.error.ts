import { AppError } from "./app-error";

export class UnauthorizedError extends AppError {
  constructor(message = "Acesso não autorizado") {
    super(message, 401, "UNAUTHORIZED");
  }
}