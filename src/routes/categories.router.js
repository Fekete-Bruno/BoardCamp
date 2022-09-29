import express from 'express';
import { getCategories, postCategories } from '../controllers/categories.controller.js';
import validateCategories from '../middlewares/categories.validation.middleware.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories',getCategories);
categoriesRouter.post('/categories',validateCategories,postCategories);

export default categoriesRouter;