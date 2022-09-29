import cors from 'cors';
import express from 'express';
import categoriesRouter from './routes/categories.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);

export default app;