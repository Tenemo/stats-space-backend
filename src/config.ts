import Joi from 'joi';
import parseDbUrl from 'parse-database-url';
import dotenv from 'dotenv';

dotenv.config();

type DatabaseConfig = {
    database: string;
    port: number;
    host: string;
    user: string;
    password: string;
};
let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || databaseUrl === '' || databaseUrl === 'undefined') {
    databaseUrl = 'postgres://postgres:postgres@localhost:5432/stats-space-db';
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const databaseConfig: DatabaseConfig = parseDbUrl(
    databaseUrl,
) as DatabaseConfig;

const configSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'production')
        .default('production'),
    PORT: Joi.number().default(4000),
    driver: Joi.string(),
    database: Joi.string()
        .default('stats-space-db')
        .description('Postgres database name'),
    port: Joi.number().default(5432),
    host: Joi.string().default('localhost'),
    user: Joi.string().default('postgres').description('Postgres username'),
    password: Joi.string()
        .default('postgres')
        .allow('')
        .description('Postgres password'),
})
    .unknown()
    .required();

Joi.assert(databaseConfig, configSchema);

export const config: {
    env: string;
    port: number;
    postgres: DatabaseConfig;
} = {
    env: process.env.NODE_ENV as string, // Joi sets defaults
    port: parseInt(process.env.PORT ?? '4000', 10),
    postgres: {
        database: databaseConfig.database,
        port: databaseConfig.port,
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
    },
};
