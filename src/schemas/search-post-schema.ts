import z from "zod";

export const searchPostSchema = z.object({
    q: z.string({ message: "Preencha o campo de busca" }).min(3, { message: "A busca deve conter no mínimo 3 caracteres" }),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
    category: z.string().optional(),
    location: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
});