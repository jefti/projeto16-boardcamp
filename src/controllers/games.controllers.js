import { db } from "../database/database.config.js";

export async function findAllGames(req, res) {
    try {
      const nameFilter = req.query.name;
      const nameFilterSQL = nameFilter ? nameFilter.toLowerCase() + '%' : '%';


      const games = await db.query("SELECT * FROM games WHERE LOWER(name) LIKE $1;",[nameFilterSQL]);
      return res.send(games.rows);
    } catch (err) {
      return res.status(500).send(err.message);
    }
}

export async function registerGames(req,res){
    const {name, image, stockTotal, pricePerDay} = req.body;
    try{
      const teste = await db.query(`SELECT * FROM games WHERE name = $1`, [name]); 
      if(teste.rows.length !== 0){
        return res.status(409).send('jogo já cadastrado');
      }
      
      
      await db.query(
          `INSERT INTO games (name, image, "stockTotal", "pricePerDay" )
            VALUES ($1, $2, $3, $4)
            `,
            [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);
    }catch (err){
        res.status(500).send(err.message);        
    }
}