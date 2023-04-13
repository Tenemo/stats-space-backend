import { Request, Response, NextFunction } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { LaunchShort } from 'typings/space';
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

        const launchesByYear = launches.reduce((acc, launch) => {
            const year = new Date(launch.window_start).getFullYear();
            const launchData: LaunchShort = {
                id: launch.id,
                url: launch.url,
                slug: launch.slug,
                name: launch.name,
                status_abbrev: launch.status_abbrev,
                window_start: launch.window_start,
                launch_service_provider_name:
                    launch.launch_service_provider_name,
                launch_service_provider_type:
                    launch.launch_service_provider_type,
                launch_service_provider_country_code:
                    launch.launch_service_provider_country_code,
                rocket_configuration_family: launch.rocket_configuration_family,
                mission_name: launch.mission_name,
                mission_description: launch.mission_description,
                pad_url: launch.pad_url,
                pad_name: launch.pad_name,
                pad_wiki_url: launch.pad_wiki_url,
                pad_map_url: launch.pad_map_url,
                pad_location_name: launch.pad_location_name,
                pad_location_country_code: launch.pad_location_country_code,
            };

            if (acc[year]) {
                acc[year].push(launchData);
            } else {
                acc[year] = [launchData];
            }

            return acc;
        }, {} as Record<string, LaunchShort[]>);

        res.json({
            count: launches.length,
            launches: launchesByYear,
        });
    } catch (err) {
        next(err);
    }
};
