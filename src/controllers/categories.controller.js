import connection from "../database/database.js";

async function getCategories(req,res){
    try {
        const query = await connection.query('SELECT * FROM categories;');
        return res.send(query.rows);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function postCategories(req,res){
    const category = res.locals.category;
    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1);',[category.name]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    return res.sendStatus(201);
}

export { getCategories, postCategories };