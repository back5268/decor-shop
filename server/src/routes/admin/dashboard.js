import { getSummary } from '@controller';
import express from 'express';

export const dashboardRouter = express.Router();

dashboardRouter.get('/getSummary', getSummary);
