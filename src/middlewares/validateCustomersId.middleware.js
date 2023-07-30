import { db } from "../database/database.config.js";

export async function validateCustomerId(req,res,next){
    try{
        if(!req.body) return res.status(204).send("Necessário enviar informações no body");
        if(!req.params) return res.status(204).send("Necessário enviar id pela rota de parâmetro");
        const id = req.params.id;
        const teste = await db.query(`SELECT * FROM customers WHERE id=$1`,[id]);
        if(teste.rows.length == 0) return res.status(404).send('Id não foi encontrado!');
        next();
    }catch(err){
        return res.status(500).send(err.message); 
    }
}