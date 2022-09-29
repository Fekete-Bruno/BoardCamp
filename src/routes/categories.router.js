import express from 'express';
import { getCategories } from '../controllers/categories.controller.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories',getCategories);

export default categoriesRouter;