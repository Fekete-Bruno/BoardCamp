import express from 'express';
import { getCustomers } from '../controllers/customers.controller.js';

const customersRouter = express.Router();

customersRouter.get('/customers',getCustomers);

export default customersRouter;