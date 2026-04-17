import { AppError } from "./app-error";

export class RemoveSavedPostError extends AppError {
  constructor() {
    super("Erro ao remover post salvo", 500, "REMOVE_SAVED_POST_ERROR");
  }
}