import dotenv from 'dotenv';

dotenv.config();

//Conectar ao banco de dados

/*

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

*/
try{
    console.log('Banco de dados conectado!');
}catch{
    console.log(err.message);
}

export const db = 'mongoCLient.db()';