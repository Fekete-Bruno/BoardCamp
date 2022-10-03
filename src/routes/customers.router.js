import express from 'express';
import { getCustomers, getCustomersById, postCustomers, putCustomers } from '../controllers/customers.controller.js';
import { validateCustomer, validateCustomerId } from '../middlewares/customers.validation.middleware.js';

const customersRouter = express.Router();

customersRouter.get('/customers',getCustomers);
customersRouter.get('/customers/:id',validateCustomerId,getCustomersById);
customersRouter.post('/customers',validateCustomer,postCustomers);
customersRouter.put('/customers/:id',validateCustomerId,validateCustomer,putCustomers);

export default customersRouter;