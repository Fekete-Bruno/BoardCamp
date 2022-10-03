import connection from "../database/database.js";
import customerSchema from "../schemas/customer.schema.js";
import { findArr } from "./validationFunctions.js";

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

async function validateCustomer(req,res,next){
    const customer = req.body;
    const validation = customerSchema.validate(customer, {abortEarly: false});

    if(validation.error){
        console.error(validation.error.details);
        return res.sendStatus(400);
    }

    try {
        const queryCustomer = await connection.query('SELECT cpf FROM customers');
        if(findArr(queryCustomer.rows,customer.cpf,"cpf")){
            return res.sendStatus(409);
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    res.locals.customer = customer;

    next();
}

export { validateCustomerId, validateCustomer }