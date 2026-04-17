import { AppError } from "./app-error";

export class EmailAlreadyExistsError extends AppError {
  constructor() {
    super("Email já cadastrado!", 409, "EMAIL_ALREADY_EXISTS");
  }
}