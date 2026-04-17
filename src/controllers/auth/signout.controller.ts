import {Request, Response} from "express";

export async function signoutController(_req: Request, res: Response): Promise<Response>{
    res.clearCookie("token").send();
    return res.sendStatus(204);
}