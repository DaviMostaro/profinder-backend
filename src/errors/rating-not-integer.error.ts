export class RatingNotIntegerError extends Error {
    constructor() {
        super("A avaliação deve ser um número inteiro entre 1 e 5");
    }
}