import { AppError } from "./app-error";

export class RatingNotIntegerError extends AppError {
  constructor() {
    super("A avaliação deve ser um número inteiro entre 1 e 5", 400, "RATING_NOT_INTEGER");
  }
}