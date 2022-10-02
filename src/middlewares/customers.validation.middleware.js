import connection from "../database/database.js";

async function validateCustomerId(req,res,next){
    const {id} = req.params;
    if(!Number(id)){
        return res.sendStatus(400);
    }

    try {
        const queryCustomer = await connection.query('SELECT * FROM customers WHERE id=$1',[id]);
        const customer = queryCustomer.rows[0];
        if(!customer){
            return res.sendStatus(404);
        }
        res.locals.customer = customer;
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    next();
}

export {validateCustomerId}