import z from "zod";

export const editPostBodySchema = z.object({
    title: z.string().min(2, "O título deve conter pelo menos 2 caracteres").optional(),
    description: z.string().min(2, "A descrição deve conter pelo menos 2 caracteres").optional(),
    categoryId: z.uuid("O ID da categoria deve ser um UUID válido").optional(),
});