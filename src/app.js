import cors from 'cors';
import express from 'express';
import categoriesRouter from './routes/categories.router.js';
import customersRouter from './routes/customers.router.js';
import gamesRouter from './routes/games.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

export default app;