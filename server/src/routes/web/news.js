import { getListNewsWeb } from '@controller';
import express from 'express';

export const newsRouter = express.Router();

newsRouter.get('/getListNews', getListNewsWeb);
