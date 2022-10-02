import categorySchema from "../schemas/category.schema.js";
import connection from "../database/database.js"
import { findArr } from "./validationFunctions.js";

async function validateCategories(req,res,next){
    const category = req.body;
    const validation = categorySchema.validate(category, {abortEarly: false});

    if(validation.error){
        console.log(validation.error.details);
        return res.sendStatus(400);
    }

    try {
        const query = await connection.query('SELECT * FROM categories;');
        if(findArr(query.rows,category.name,"name")){
            return res.sendStatus(409)
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    res.locals.category = category;

    next();
}
export default validateCategories;