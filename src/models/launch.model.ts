import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    Sequelize,
} from 'sequelize';

import { Launch, LaunchServiceProvider } from 'typings/space';
import spaceDataJSON from 'data/space_data.json';
export class LaunchModel extends Model<
    InferAttributes<LaunchModel>,
    InferCreationAttributes<LaunchModel>
> {
    declare id: string;
    declare url: string;
    declare slug: string;
    declare name: string;
    declare status_id: number;
    declare status_name: string;
    declare status_abbrev: string;
    declare status_description: string;
    declare last_updated: string;
    declare net: string;
    declare window_end: string;
    declare window_start: string;
    declare probability: number;
    declare holdreason: string;
    declare failreason: string;
    declare hashtag: string;
    declare launch_service_provider_id: number;
    declare launch_service_provider_url: string;
    declare launch_service_provider_name: string;
    declare launch_service_provider_type: string;
    declare launch_service_provider_country_code: string;
    declare rocket_id: number;
    declare rocket_configuration_id: number;
    declare rocket_configuration_url: string;
    declare rocket_configuration_name: string;
    declare rocket_configuration_family: string;
    declare rocket_configuration_full_name: string;
    declare rocket_configuration_variant: string;
    declare mission_id: number;
    declare mission_name: string;
    declare mission_description: string;
    declare mission_launch_designator: string;
    declare mission_type: string;
    declare mission_orbit_id: number;
    declare mission_orbit_name: string;
    declare mission_orbit_abbrev: string;
    declare pad_id: number;
    declare pad_url: string;
    declare pad_agency_id: number;
    declare pad_name: string;
    declare pad_info_url: string;
    declare pad_wiki_url: string;
    declare pad_map_url: string;
    declare pad_latitude: string;
    declare pad_longitude: string;
    declare pad_location_id: number;
    declare pad_location_url: string;
    declare pad_location_name: string;
    declare pad_location_country_code: string;
    declare pad_location_map_image: string;
    declare pad_location_total_launch_count: number;
    declare pad_location_total_landing_count: number;
    declare pad_map_image: string;
    declare pad_total_launch_count: number;
    declare pad_orbital_launch_attempt_count: number;
    declare webcast_live: boolean;
    declare image: string;
    declare infographic: string;
    declare program: string;
    declare orbital_launch_attempt_count: number;
    declare location_launch_attempt_count: number;
    declare pad_launch_attempt_count: number;
    declare agency_launch_attempt_count: number;
    declare orbital_launch_attempt_count_year: number;
    declare location_launch_attempt_count_year: number;
    declare pad_launch_attempt_count_year: number;
    declare agency_launch_attempt_count_year: number;
}

export const initLaunchModel = (sequelize: Sequelize): typeof LaunchModel => {
    LaunchModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            url: DataTypes.TEXT,
            slug: DataTypes.TEXT,
            name: DataTypes.TEXT,
            status_id: DataTypes.INTEGER,
            status_name: DataTypes.TEXT,
            status_abbrev: DataTypes.TEXT,
            status_description: DataTypes.TEXT,
            last_updated: DataTypes.TEXT,
            net: DataTypes.TEXT,
            window_end: DataTypes.TEXT,
            window_start: DataTypes.TEXT,
            probability: DataTypes.INTEGER,
            holdreason: DataTypes.TEXT,
            failreason: DataTypes.TEXT,
            hashtag: DataTypes.TEXT,
            launch_service_provider_id: DataTypes.INTEGER,
            launch_service_provider_url: DataTypes.TEXT,
            launch_service_provider_name: DataTypes.TEXT,
            launch_service_provider_type: DataTypes.TEXT,
            launch_service_provider_country_code: DataTypes.TEXT,
            rocket_id: DataTypes.INTEGER,
            rocket_configuration_id: DataTypes.INTEGER,
            rocket_configuration_url: DataTypes.TEXT,
            rocket_configuration_name: DataTypes.TEXT,
            rocket_configuration_family: DataTypes.TEXT,
            rocket_configuration_full_name: DataTypes.TEXT,
            rocket_configuration_variant: DataTypes.TEXT,
            mission_id: DataTypes.INTEGER,
            mission_name: DataTypes.TEXT,
            mission_description: DataTypes.TEXT,
            mission_launch_designator: DataTypes.TEXT,
            mission_type: DataTypes.TEXT,
            mission_orbit_id: DataTypes.INTEGER,
            mission_orbit_name: DataTypes.TEXT,
            mission_orbit_abbrev: DataTypes.TEXT,
            pad_id: DataTypes.INTEGER,
            pad_url: DataTypes.TEXT,
            pad_agency_id: DataTypes.INTEGER,
            pad_name: DataTypes.TEXT,
            pad_info_url: DataTypes.TEXT,
            pad_wiki_url: DataTypes.TEXT,
            pad_map_url: DataTypes.TEXT,
            pad_latitude: DataTypes.TEXT,
            pad_longitude: DataTypes.TEXT,
            pad_location_id: DataTypes.INTEGER,
            pad_location_url: DataTypes.TEXT,
            pad_location_name: DataTypes.TEXT,
            pad_location_country_code: DataTypes.TEXT,
            pad_location_map_image: DataTypes.TEXT,
            pad_location_total_launch_count: DataTypes.INTEGER,
            pad_location_total_landing_count: DataTypes.INTEGER,
            pad_map_image: DataTypes.TEXT,
            pad_total_launch_count: DataTypes.INTEGER,
            pad_orbital_launch_attempt_count: DataTypes.INTEGER,
            webcast_live: DataTypes.BOOLEAN,
            image: DataTypes.TEXT,
            infographic: DataTypes.TEXT,
            program: DataTypes.JSON,
            orbital_launch_attempt_count: DataTypes.INTEGER,
            location_launch_attempt_count: DataTypes.INTEGER,
            pad_launch_attempt_count: DataTypes.INTEGER,
            agency_launch_attempt_count: DataTypes.INTEGER,
            orbital_launch_attempt_count_year: DataTypes.INTEGER,
            location_launch_attempt_count_year: DataTypes.INTEGER,
            pad_launch_attempt_count_year: DataTypes.INTEGER,
            agency_launch_attempt_count_year: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'launch',
            freezeTableName: true,
            timestamps: true,
        },
    );

    return LaunchModel;
};

type SpaceData = {
    launchData: Launch[];
    launchServiceProviders: LaunchServiceProvider[];
};

export const insertLaunches = async (
    sequelize: Sequelize,
    launch: typeof LaunchModel,
): Promise<void> => {
    try {
        console.log('Inserting launch data...');
        const startTime = performance.now();
        const spaceData: SpaceData = spaceDataJSON as SpaceData;
        const { launchData, launchServiceProviders } = spaceData;
        const launchServiceProvidersMap: Record<number, LaunchServiceProvider> =
            launchServiceProviders.reduce(
                (acc, current) => ({ ...acc, [current.id]: { ...current } }),
                {},
            );
        await sequelize.transaction(async (transaction) => {
            await launch.bulkCreate(
                launchData.map(
                    ({
                        id,
                        url,
                        slug,
                        name,
                        status,
                        last_updated,
                        net,
                        window_end,
                        window_start,
                        probability,
                        holdreason,
                        failreason,
                        hashtag,
                        launch_service_provider,
                        rocket,
                        mission,
                        pad,
                        webcast_live,
                        image,
                        infographic,
                        program,
                        orbital_launch_attempt_count,
                        location_launch_attempt_count,
                        pad_launch_attempt_count,
                        agency_launch_attempt_count,
                        orbital_launch_attempt_count_year,
                        location_launch_attempt_count_year,
                        pad_launch_attempt_count_year,
                        agency_launch_attempt_count_year,
                    }) => ({
                        id,
                        url,
                        slug,
                        name,
                        status_id: status.id,
                        status_name: status.name,
                        status_abbrev: status.abbrev,
                        status_description: status.description,
                        last_updated,
                        net,
                        window_end,
                        window_start,
                        probability,
                        holdreason,
                        failreason,
                        hashtag,
                        launch_service_provider_id: launch_service_provider.id,
                        launch_service_provider_url:
                            launch_service_provider.url,
                        launch_service_provider_name:
                            launch_service_provider.name,
                        launch_service_provider_type:
                            launch_service_provider.type,
                        launch_service_provider_country_code:
                            launchServiceProvidersMap[
                                launch_service_provider.id
                            ].country_code,
                        rocket_id: rocket.id,
                        rocket_configuration_id: rocket.configuration.id,
                        rocket_configuration_url: rocket.configuration.url,
                        rocket_configuration_name: rocket.configuration.name,
                        rocket_configuration_family:
                            rocket.configuration.family,
                        rocket_configuration_full_name:
                            rocket.configuration.full_name,
                        rocket_configuration_variant:
                            rocket.configuration.variant,
                        mission_id: mission?.id,
                        mission_name: mission?.name,
                        mission_description: mission?.description,
                        mission_launch_designator: mission?.launch_designator,
                        mission_type: mission?.type,
                        mission_orbit_id: mission?.orbit?.id,
                        mission_orbit_name: mission?.orbit?.name,
                        mission_orbit_abbrev: mission?.orbit?.abbrev,
                        pad_id: pad.id,
                        pad_url: pad.url,
                        pad_agency_id: pad.agency_id,
                        pad_name: pad.name,
                        pad_info_url: pad.info_url,
                        pad_wiki_url: pad.wiki_url,
                        pad_map_url: pad.map_url,
                        pad_latitude: pad.latitude,
                        pad_longitude: pad.longitude,
                        pad_location_id: pad.location.id,
                        pad_location_url: pad.location.url,
                        pad_location_name: pad.location.name,
                        pad_location_country_code: pad.location.country_code,
                        pad_location_map_image: pad.location.map_image,
                        pad_location_total_launch_count:
                            pad.location.total_launch_count,
                        pad_location_total_landing_count:
                            pad.location.total_landing_count,
                        pad_map_image: pad.map_image,
                        pad_total_launch_count: pad.total_launch_count,
                        pad_orbital_launch_attempt_count:
                            pad.orbital_launch_attempt_count,
                        webcast_live,
                        image,
                        infographic,
                        program: JSON.stringify(program),
                        orbital_launch_attempt_count,
                        location_launch_attempt_count,
                        pad_launch_attempt_count,
                        agency_launch_attempt_count,
                        orbital_launch_attempt_count_year,
                        location_launch_attempt_count_year,
                        pad_launch_attempt_count_year,
                        agency_launch_attempt_count_year,
                    }),
                ),
                { transaction },
            );
        });

        const endTime = performance.now();
        console.log(
            `Launch data inserted successfully. Insertion took ${(
                (endTime - startTime) /
                1000
            ).toFixed(2)} seconds. Inserted ${launchData.length} launches.`,
        );
    } catch (error) {
        console.error('Error while inserting launches: ', error);
        throw error;
    }
};
