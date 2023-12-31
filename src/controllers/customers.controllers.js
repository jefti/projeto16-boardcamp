import { db } from "../database/database.config.js";

export async function registerCustomer(req, res){
    const {name, phone, cpf,birthday} = req.body;
    try{
        const teste = await db.query('SELECT * FROM customers WHERE cpf=$1;', [cpf]);
        if(teste.rows.length > 0) return res.status(409).send('CPF já está cadastrado');
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`,[name,phone, cpf, birthday]);
        return res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function getCustomers(req,res){
    try{
        const cpfilter = req.query.cpf;
        const cpffilterSQL = cpfilter? cpfilter+'%':'%';

        const customers = await db.query("SELECT * FROM customers WHERE cpf LIKE $1;", [cpffilterSQL]);
        const resposta = [];
        customers.rows.forEach((el)=>{
            const dateObj = new Date(el.birthday);
            const birthdayFormatted = dateObj.toISOString().split('T')[0];
            el.birthday = birthdayFormatted;
            resposta.push(el);
        })
        return res.send(resposta);
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function getCustomersById(req,res){
    try{
        const id = req.params.id;
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`,[id]);
        if(customer.rows.length === 0) return res.sendStatus(404);
        const {name, phone, cpf,birthday} = customer.rows[0];
        const dateObj = new Date(birthday);
        const birthdayFormatted = dateObj.toISOString().split('T')[0];
        const obj = {id, name, phone, cpf, birthday:birthdayFormatted};
        return res.send(obj);
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function updateCustomer(req, res){
    const id = req.params.id;
    const {name, phone, cpf,birthday} = req.body;
    try{

        const teste = await db.query('SELECT * FROM customers WHERE cpf=$1 AND id<> $2;', [cpf,id]);
        if(teste.rows.length > 0) return res.status(409).send('CPF já está cadastrado');
        await db.query(`UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5;`,[name,phone, cpf, birthday,id]);
        return res.sendStatus(200);
    }catch(err){
        return res.status(500).send(err.message)
    }
}