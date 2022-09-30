import connection from "../database/database.js";

async function getGames(req,res){
    try {
        const query = await connection.query('SELECT * FROM games');
        return res.send(query.rows);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { getGames };