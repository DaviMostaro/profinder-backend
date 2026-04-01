import { Request, Response } from "express";
import { searchPostService } from "../../services/search/search-post.service";
import { searchPostSchema } from "../../schemas/search-post-schema";
import { ZodError } from "zod";

export async function searchPostController(req: Request, res: Response): Promise<Response> {
    try {
        const { q, page, limit, order, category, location } = searchPostSchema.parse(req.query);

        const searchResults = await searchPostService(q, page, limit, order, category, location);

        return res.json(searchResults);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.issues[0]?.message ?? "Requisição inválida" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}