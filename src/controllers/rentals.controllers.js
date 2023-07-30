import { db } from "../database/database.config.js";

export async function RegisterRental(req,res){
    try{
        const {customerId, gameId, daysRented} = req.body;
        const customer = await db.query(`SELECT * from customers WHERE id= $1;`,[customerId]);
        if(customer.rows.length == 0) return res.status(400).send('O id de cliente informado não consta no registro');
        const game = await db.query(`SELECT * from games WHERE id=$1`,[gameId]);
        if(game.rows.length == 0) return res.status(400).send('O id de jogo informado não consta no registro');
        const GameRentals = await db.query(`SELECT * from rentals WHERE "gameId"=$1;`, [gameId]);
        if(GameRentals.rows.length >= game.rows[0].stockTotal) return res.status(400).send(`Todas as unidades de ${game.rows[0].name} estão emprestadas no momento.`);
        
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
        const dia = String(dataAtual.getDate()).padStart(2, '0');
      
        const rentDate = `${ano}-${mes}-${dia}`;
        const originalPrice = Number(game.rows[0].pricePerDay) * Number(daysRented);
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,NULL,$5,NULL);`,[customerId,gameId,rentDate,daysRented,originalPrice]);
        return res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getRentals(req,res){
    try{
        const rentals = await db.query(`SELECT r.*,customer.id AS "customerId" ,customer.name AS "customerName",game.id AS "gameId", game.name AS "gameName"
        FROM rentals r
        JOIN customers customer ON r."customerId" = customer.id
        JOIN games game ON r."gameId" = game.id;`);
        
        const resposta = rentals.rows.map((el)=>{
            const dateObj1 = new Date(el.rentDate);
            const rentDateFormatado = dateObj1.toISOString().split('T')[0];
            let dateObj2 = null;
            let returnDateFormatado = null;
            if(el.returnDate != null){ 
                dateObj2 = new Date(el.returnDate);
                returnDateFormatado = dateObj2.toISOString().split('T')[0];
            };
            return {...el, rentDate:rentDateFormatado, returnDate:returnDateFormatado};
        });
        
        return res.send(resposta);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function returnGame(req,res){
    try{
        const id = req.params.id;
        const search = await db.query(`SELECT * from rentals WHERE id=$1`,[id]);
        if(search.rowCount == 0) return res.sendStatus(404);
        const rental = search.rows[0];
        if(rental.returnDate !== null) return res.status(400).send('Este aluguel já foi finalizado anteriormente.');
        const rentDate = new Date(rental.rentDate);
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); 
        const dia = String(hoje.getDate()).padStart(2, '0');
        const returnDateFormatado = `${ano}-${mes}-${dia}`;
        const Dias = Math.floor((hoje - rentDate)/(1000*60*60*24));
        const multa= (Dias > rental.daysRented) ? (Dias-rental.daysRented)*(rental.originalPrice/rental.daysRented):0;
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`,[returnDateFormatado, multa,id]);
        return res.sendStatus(200);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function finalizarRental(req,res){
    try{
        const id = req.params.id;
        const search = await db.query(`SELECT * FROM rentals WHERE id=$1;`,[id]);
        if(search.rowCount === 0) return res.status(404).send('Id não encontrado');
        const rental = search.rows[0];
        if(rental.returnDate === null) return res.status(400).send('Aluguel não finalizado');
        await db.query(`DELETE FROM rentals WHERE id=$1;`,[id])
        return res.sendStatus(200);
    }catch(err){
        return res.status(500).send(err.message);
    }
}