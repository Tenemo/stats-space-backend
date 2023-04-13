/* TODO: remove */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { validate } from 'express-validation';
import { getLaunches } from 'controllers/launch.controller';
import Joi from 'joi';

const paramValidation = {
    getLaunches: {
        query: Joi.object({
            status_abbrev: Joi.string().max(32).trim().allow('').optional(),
            start_date: Joi.string()
                .pattern(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/,
                )
                .message('start_date must be in ISO 8601 format')
                .optional(),
            end_date: Joi.string()
                .pattern(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/,
                )
                .message('end_date must be in ISO 8601 format')
                .optional(),
        }),
    },
};

export const launchRouter = express.Router();

launchRouter.route('/').get(validate(paramValidation.getLaunches), getLaunches);
