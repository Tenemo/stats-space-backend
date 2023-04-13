import { Sequelize } from 'sequelize';
import { config } from './config';
import { initLaunchModel, insertLaunches } from 'models/launch.model';
import { initGDPModel, insertGDPData } from 'models/gdp.model';

export const sequelize = new Sequelize(
    config.postgres.database,
    config.postgres.user,
    config.postgres.password,
    {
        logging: () => {
            if (config.env === 'development') return true;
            else return false;
        },
        dialect: 'postgres',
        dialectOptions: {
            ssl:
                config.env === 'development'
                    ? false
                    : {
                          require: true,
                          rejectUnauthorized: false,
                      },
        },
        port: config.postgres.port,
        host: config.postgres.host,
        pool: {
            max: 10,
            idle: 30000,
            acquire: 3600 * 1000 * 6,
        },
    },
);
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export const launch = initLaunchModel(sequelize);
export const gdp = initGDPModel(sequelize);

sequelize
    .sync({ force: true }) // Dropping the table each time
    .then(() => {
        console.log('Database synchronized');
    })
    .then(async () => {
        await insertLaunches(sequelize, launch);
        await insertGDPData(sequelize, gdp);
    })
    .catch((err) => {
        console.log('Rolled back, an error occurred:');
        console.log(err);
    });
