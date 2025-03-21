import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
    PG_DB_NAME: get('PG_DB_NAME').required().asString(),
    PG_DB_HOST: get('PG_DB_HOST').required().asString(),
    PG_DB_PORT: get('PG_DB_PORT').required().asPortNumber(),
    PG_DB_USER: get('PG_DB_USER').required().asString(),
    PG_DB_PASS: get('PG_DB_PASS').required().asString(),
}