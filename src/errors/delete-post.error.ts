import { AppError } from "./app-error";

export class DeletePostError extends AppError {
  constructor() {
    super("Post não encontrado ou não pertence ao usuário", 404, "DELETE_POST_ERROR");
  }
}