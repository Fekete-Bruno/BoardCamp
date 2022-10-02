import express from 'express';
import { getCustomers, getCustomersById } from '../controllers/customers.controller.js';
import { validateCustomerId } from '../middlewares/customers.validation.middleware.js';

const customersRouter = express.Router();

customersRouter.get('/customers',getCustomers);
customersRouter.get('/customers/:id',validateCustomerId,getCustomersById);

export default customersRouter;