import express from 'express';
import { getRentals } from '../controllers/rentals.controller.js';

const rentalsRouter = express.Router();

rentalsRouter.get('/rentals',getRentals);

export default rentalsRouter;