import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    Sequelize,
} from 'sequelize';

import wdiDataJSON from 'data/wdi_data.json';
import { WDIRow } from 'typings/wdi';

export class GDPModel extends Model<
    InferAttributes<GDPModel>,
    InferCreationAttributes<GDPModel>
> {
    declare country_name: string;
    declare country_code: string;
    declare indicator_name: string;
    declare indicator_code: string;
}

const years = Array.from({ length: 2022 - 1960 + 1 }, (_, i) => 1960 + i).map(
    String,
);

const yearColumns = years.reduce(
    (columns, year) => ({
        ...columns,
        [year]: DataTypes.STRING,
    }),
    {},
);

export const initGDPModel = (sequelize: Sequelize): typeof GDPModel => {
    GDPModel.init(
        {
            country_name: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            country_code: DataTypes.STRING,
            indicator_name: DataTypes.STRING,
            indicator_code: DataTypes.STRING,
            ...yearColumns,
        },
        {
            sequelize,
            tableName: 'gdp',
            freezeTableName: true,
            timestamps: false,
        },
    );

    return GDPModel;
};

export const insertGDPData = async (
    sequelize: Sequelize,
    gdpData: typeof GDPModel,
): Promise<void> => {
    try {
        console.log('Inserting GDP data...');
        const startTime = performance.now();

        await sequelize.transaction(async (transaction) => {
            await gdpData.bulkCreate(
                (wdiDataJSON.gdp as WDIRow[]).map((row) => ({
                    country_name: row['Country Name'],
                    country_code: row['Country Code'],
                    indicator_name: row['Indicator Name'],
                    indicator_code: row['Indicator Code'],
                    ...row,
                })),
                { transaction },
            );
        });

        const endTime = performance.now();
        console.log(
            `GDP data inserted successfully. Insertion took ${(
                (endTime - startTime) /
                1000
            ).toFixed(2)} seconds. Inserted ${
                (wdiDataJSON.gdp as WDIRow[]).length
            } records.`,
        );
    } catch (error) {
        console.error('Error while inserting GDP data: ', error);
        throw error;
    }
};
