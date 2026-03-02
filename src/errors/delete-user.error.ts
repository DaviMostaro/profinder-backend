export class DeleteUserError extends Error {
    constructor() {
        super("Erro ao deletar usuário");
    }
}