export class TokenInvalidOrNotFoundError extends Error {
    constructor() {
        super("Token inválido ou não encontrado");
    }
}