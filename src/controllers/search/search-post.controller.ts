import { Request, Response } from "express";
import { searchPostService } from "../../services/search/search-post.service";
import { searchPostSchema } from "../../schemas/search-post-schema";

export async function searchPostController(req: Request, res: Response): Promise<Response> {
    const { q, page, limit, order, category, location } = searchPostSchema.parse(req.query);

    const searchResults = await searchPostService(q, page, limit, order, category, location);

    return res.json(searchResults);
}