import { AppError } from "./app-error";

export class CreatePostError extends AppError {
  constructor() {
    super("Falha ao criar post", 500, "CREATE_POST_ERROR");
  }
}