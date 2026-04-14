import { AppError } from "./app-error";

export class SavePostError extends AppError {
  constructor() {
    super("Erro ao salvar post", 500, "SAVE_POST_ERROR");
  }
}