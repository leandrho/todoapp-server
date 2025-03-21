import { envs } from "../../../../config/envs";
import { Pool } from "pg";

export const pgPool = new Pool({
    host: envs.PG_DB_HOST,
    port: envs.PG_DB_PORT,
    database: envs.PG_DB_NAME,
    user: envs.PG_DB_USER,
    password: envs.PG_DB_PASS,
    max: 30,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 4000,
});

/* 
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE task_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    priority VARCHAR(10) NOT NULL DEFAULT 'low',
    finished_at TIMESTAMPTZ,
    deadline TIMESTAMPTZ,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_list_id UUID NOT NULL REFERENCES task_lists(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);



*/