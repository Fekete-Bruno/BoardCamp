import express from 'express';
import { getGames, postGames } from '../controllers/games.controller.js';
import validateGames from '../middlewares/games.validation.middleware.js';

const gamesRouter = express.Router();

gamesRouter.get('/games',getGames);
gamesRouter.post('/games', validateGames, postGames);

export default gamesRouter;