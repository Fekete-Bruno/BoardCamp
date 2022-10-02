import gameSchema from "../schemas/game.schema.js";
import connection from "../database/database.js";
import { findArr } from "./validationFunctions.js";

async function validateGames(req,res,next){
    const game = req.body;
    const validation = gameSchema.validate(game, {abortEarly: false});

    if(validation.error){
        console.error(validation.error.details);
        return res.sendStatus(400);
    }

    try {
        const queryCategory = await connection.query('SELECT id FROM categories;');
        if(!findArr(queryCategory.rows,game.categoryId,"id")){
            return res.sendStatus(400);
        }
        
        const queryGame = await connection.query('SELECT name FROM games;');
        if(findArr(queryGame.rows,game.name,"name")){
            return res.sendStatus(409);
        }

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    res.locals.game = game;

    next();
}

export default validateGames;