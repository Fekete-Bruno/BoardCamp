import express from 'express';
import { getCustomers, getCustomersById, postCustomers } from '../controllers/customers.controller.js';
import { validateCustomer, validateCustomerId } from '../middlewares/customers.validation.middleware.js';

const customersRouter = express.Router();

customersRouter.get('/customers',getCustomers);
customersRouter.get('/customers/:id',validateCustomerId,getCustomersById);
customersRouter.post('/customers',validateCustomer,postCustomers)

export default customersRouter;