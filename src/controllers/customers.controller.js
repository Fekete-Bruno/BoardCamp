import connection from "../database/database.js";

async function getCustomers(req,res){
    const cpfQuery = req.query.cpf;
    let query = [];

    try {
        query = await connection.query('SELECT * FROM customers')
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    if(cpfQuery){
        return res.send(query.rows.filter((el)=>el.cpf.startsWith(cpfQuery)));
    }

    return(res.send(query.rows));
}

function getCustomersById(req,res){
    const customer = res.locals.customer;
    return res.send(customer);
}

function postCustomers(req,res){
    return res.sendStatus(201);
}

export { getCustomers, getCustomersById, postCustomers };