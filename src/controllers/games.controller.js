import connection from "../database/database.js";

async function getGames(req,res){
    const nameQuery = req.query.name?.toLowerCase();
    let query = []
    try {
        query = await connection.query('SELECT games.*, categories.name as "categorieName" FROM games JOIN categories ON games."categoryId" = categories.id;');
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    if(nameQuery){
        return res.send(query.rows.filter((el)=>el.name.toLowerCase().includes(nameQuery)));
    }

    return res.send(query.rows);
}

export { getGames };