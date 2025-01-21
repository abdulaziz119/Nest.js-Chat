import * as dotenv from 'dotenv';

dotenv.config();
const DB_PORT = +process.env.DB_PORT || 5433;
const DB_HOST = process.env.DB_HOST || '';
const DB_USER = process.env.DB_USERNAME || '';
const DB_DB = process.env.DB_DATABASE || '';
const DB_PASS = process.env.DB_PASSWORD || '';
const PORT = process.env.PORT || 3000;

export { PORT, DB_PORT, DB_HOST, DB_USER, DB_DB, DB_PASS };
