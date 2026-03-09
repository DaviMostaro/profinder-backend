export class NotFoundPostError extends Error {
    constructor() {
        super("Post não encontrado");
    }
}