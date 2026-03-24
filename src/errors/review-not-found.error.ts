export class ReviewNotFoundError extends Error {
    constructor() {
        super("Avaliação não encontrada");
    }
}