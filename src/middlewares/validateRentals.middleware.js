import { rentalsSchema } from "../schemas/rentals.schema.js";

export async function validateRentals(req, res, next){
    try{
        if(!req.body) return res.status(204).send("Necessário enviar informações pelo body");
        const validation = rentalsSchema.validate(req.body,{abortEarly: false});
        if(validation.error){
            const errors = validation.error.details.map((d)=>d.message);
            return res.status(400).send(errors);
        }
        next();
    }catch(err){
        return res.status(500).send(err.message); 
    }
}