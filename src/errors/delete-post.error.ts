export class DeletePostError extends Error {
    constructor() {
        super("Post não encontrado ou não pertence ao usuario");
    }
}