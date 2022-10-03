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
    const customerId = res.locals.customerId;
    return res.send(customerId);
}

async function postCustomers(req,res){
    const customer = res.locals.customer;

    try {
        await connection.query(
            'INSERT INTO customers ("name","phone","cpf","birthday") VALUES ($1,$2,$3,$4);',
            [customer.name,customer.phone,customer.cpf,customer.birthday]
        );
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    return res.sendStatus(201);
}

async function putCustomers(req,res){
    const customer = res.locals.customer;
    const id = res.locals.customerId.id;
    try {
        await connection.query(
            'UPDATE customers SET name=$1, cpf=$2, phone=$3, birthday=$4 WHERE id=$5;',
            [customer.name,customer.cpf,customer.phone,customer.birthday,id]
        );
    } catch (error) {
        
    }

    return res.sendStatus(200);
}

export { getCustomers, getCustomersById, postCustomers, putCustomers };