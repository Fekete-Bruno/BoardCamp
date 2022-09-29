import connection from "../database/database.js";

async function getCategories(req,res){
    try {
        const query = await connection.query('SELECT * FROM categories;');
        return res.send(query.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export { getCategories };