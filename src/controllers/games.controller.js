import connection from "../database/database.js";

async function getGames(req,res){
    const nameQuery = req.query.name?.toLowerCase();
    let query = []
    try {
        query = await connection.query('SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;');
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    if(nameQuery){
        return res.send(query.rows.filter((el)=>el.name.toLowerCase().includes(nameQuery)));
    }

    return res.send(query.rows);
}

async function postGames(req,res){
    const game =  res.locals.game;

    try {
        await connection.query(
            'INSERT INTO games ("name","image","stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5);'
            ,[game.name,game.image,game.stockTotal,game.categoryId,game.pricePerDay]
        );
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    return res.sendStatus(201);
}

export { getGames, postGames };