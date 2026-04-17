import { AppError } from "./app-error";

export class NotFoundPostError extends AppError {
  constructor() {
    super("Post não encontrado", 404, "POST_NOT_FOUND");
  }
}