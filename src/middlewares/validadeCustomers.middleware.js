import { customersSchema } from "../schemas/customer.schemas.js";

export async function validateCustomers(req, res, send){
    try{
        if(!req.body) return res.send("Necessário body").status(204);
        const validation = customersSchema.validate(req.body,{abortEarly: false});
        if(validation.error){
            const errors = validation.error.details.map((d)=>d.message);
            return res.send(errors).status(400);
        }
        next();
    }catch(err){
        return res.send(err.message).status(500); 
    }
}