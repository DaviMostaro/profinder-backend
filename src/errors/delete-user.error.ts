import { AppError } from "./app-error";

export class DeleteUserError extends AppError {
  constructor() {
    super("Erro ao deletar usuário", 500, "DELETE_USER_ERROR");
  }
}