import {Request, Response} from "express";

export async function signoutController(_req: Request, res: Response): Promise<Response>{
    try{
        res.clearCookie("token").send();
        return res.status(204);
    }catch (err){
        return res.status(500).json({ message: "Erro interno do servidor!" });
    }
}