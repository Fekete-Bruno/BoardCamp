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

export { getCustomers, getCustomersById, postCustomers };