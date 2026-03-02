export class CreatePostError extends Error {
    constructor() {
        super("Falha ao criar post");
    }
}