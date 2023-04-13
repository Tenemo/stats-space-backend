import express from 'express';
import { launchRouter } from './launch.routes';
import { wdiRouter } from './wdi.routes';

export const router = express.Router();

router.get('/health-check', (_req, res) => res.send('OK'));

router.use('/launches', launchRouter);
router.use('/wdi', wdiRouter);
