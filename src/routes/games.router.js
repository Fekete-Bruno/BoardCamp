import express from 'express';
import { getGames } from '../controllers/games.controller.js';

const gamesRouter =  express.Router();

gamesRouter.get('/games',getGames);

export default gamesRouter;