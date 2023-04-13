/* TODO: remove */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { getGDP } from 'controllers/wdi.controller';

export const wdiRouter = express.Router();

wdiRouter.route('/gdp').get(getGDP);
