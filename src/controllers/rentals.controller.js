import connection from "../database/database.js";

async function getRentals(req,res){
    const customerQuery = Number(req.query.customerId);
    const gameQuery = Number(req.query.gameId);
    let query = [];
    try {
        query = await connection.query(`
            SELECT rentals.*, 
            customers.name AS "customerName", 
            games.name AS "gameName", 
            games."categoryId" AS "categoryId", 
            categories.name AS "categoryName" 
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id 
            JOIN categories ON games."categoryId" = categories.id;
        `);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    const finalArr = [];

    query.rows.map((el)=>{
        const {
            id,
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
            customerName,
            gameName,
            categoryId,
            categoryName
        } = el;

        const customer = {
            id:customerId,
            name:customerName
        }

        const game = {
            id:gameId,
            name:gameName,
            categoryId,
            categoryName
        }

        const newObj = {
            id,
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee,
            customer,
            game
        };
        finalArr.push(newObj);
    });

    if(customerQuery){
        return res.send(finalArr.filter((el)=>el.customerId===customerQuery));
    }

    if(gameQuery){
        return res.send(finalArr.filter((el)=>el.gameId===gameQuery));
    }

    return res.send(finalArr);
}

export { getRentals };