import { Request, Response, NextFunction } from 'express';
import { WhereOptions } from 'sequelize';
import { gdp } from 'database';

import { WDIRowResponse } from 'typings/wdi';

type GDPWhereConditions = WhereOptions & {
    countryCode?: string;
};

export const getGDP = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void | Response> => {
    try {
        const countryCode = req.query.countryCode as string | undefined;

        const whereConditions: GDPWhereConditions = {};

        if (countryCode) {
            whereConditions.countryCode = countryCode;
        }

        const gdpData = await gdp.findAll({
            where: whereConditions,
        });
        const gdpDataObject: Record<string, WDIRowResponse> = gdpData.reduce(
            (acc, row) => {
                const rowData: WDIRowResponse = {
                    countryName: row.country_name,
                    countryCode: row.country_code,
                    indicatorName: row.indicator_name,
                    indicatorCode: row.indicator_code,
                    ...row.dataValues,
                };
                return { ...acc, [row.country_code]: rowData };
            },
            {} as Record<string, WDIRowResponse>,
        );
        res.json(gdpDataObject);
    } catch (err) {
        next(err);
    }
};
