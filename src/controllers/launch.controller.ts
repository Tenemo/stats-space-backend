import { Request, Response, NextFunction } from 'express';
import { Op, WhereOptions } from 'sequelize';

import { launch } from 'database';

type LaunchWhereConditions = WhereOptions & {
    status_abbrev?: string;
    window_start?: {
        [Op.between]: [string, string];
    };
};

export const getLaunches = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void | Response> => {
    try {
        const status_abbrev = req.query.status_abbrev as string | undefined;
        const start_date = req.query.start_date as string | undefined;
        const end_date = req.query.end_date as string | undefined;

        const whereConditions: LaunchWhereConditions = {};

        if ((start_date && !end_date) || (!start_date && end_date)) {
            return res.status(400).json({
                info: 'Both start_date and end_date must be provided for date filtering.',
            });
        }

        if (status_abbrev) {
            whereConditions.status_abbrev = status_abbrev;
        }
        if (start_date && end_date) {
            whereConditions.window_start = {
                [Op.between]: [start_date, end_date],
            };
        }

        const launches = await launch.findAll({
            where: whereConditions,
        });

        res.json({ count: launches.length, launches });
    } catch (err) {
        next(err);
    }
};