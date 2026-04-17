import { AppError } from "./app-error";

export class UpdatePostError extends AppError {
  constructor() {
    super("Erro ao atualizar post", 500, "UPDATE_POST_ERROR");
  }
}