import { gamesSchema } from "../schemas/games.schema.js";

export async function validateGames(req,res,next){
    try{
        if(!req.body) return res.status(204).send("Necessário body");
        const validation = gamesSchema.validate(req.body,{abortEarly: false});
        if(validation.error){
            const errors = validation.error.details.map((d)=>d.message);
            return res.status(400).send(errors);
        }
        next();
    }catch(err){
        return res.status(500).send(err.message);
    }
}