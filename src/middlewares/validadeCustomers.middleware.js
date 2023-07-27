import { customersSchema } from "../schemas/customer.schemas";

export async function validateCustomers(req, res, send){
    try{
        if(!req.body) return res.send("Necessário body").status(204);
    }catch(err){
        return res.send(err.message).status(500); 
    }
}