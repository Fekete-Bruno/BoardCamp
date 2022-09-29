import categorySchema from "../schemas/category.schema.js";
import connection from "../database/database.js"

async function validateCategories(req,res,next){
    const category = req.body;
    const validation = categorySchema.validate(category, {abortEarly: false});

    if(validation.error){
        console.log(validation.error.details);
        return res.sendStatus(400);
    }

    try {
        const query = await connection.query('SELECT * FROM categories;');
        if(isRepeated(query.rows,category.name)){
            return res.sendStatus(409)
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    res.locals.category = category;

    next();
}

function isRepeated(categories,name){
    return (categories.find((el)=>{return (el.name===name)}));
}

export default validateCategories;