import express from 'express';
import { launchRouter } from './launch.routes';

export const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send('OK'));

router.use('/launches', launchRouter);
