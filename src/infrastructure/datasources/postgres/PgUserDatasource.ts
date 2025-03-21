
import { QueryResult } from "pg";
import { UserDatasource } from "../../../domain/datasources";
import { User } from "../../../domain/entities";

import { pgPool } from "./config/pgPool";

export class PgUserDatasource implements UserDatasource{

    constructor(){}

    public async create(name: string, email: string, password: string): Promise<User | null> {
        try {
            await pgPool.query("INSERT INTO users (name, email, password_hash, created_at) VALUES ($1, $2, $3, $4)",[name, email, password, new Date().toLocaleDateString()]);

            const user: User | null = await this.findByEmail(email);
            return user;
            
        } catch (error) {
            console.log(error + 'PGUSERDATASOURCE ---- CREATE')
            return null;
        }
    }
    public async findById(id: User["id"]): Promise<User | null> {
        try {
            const res = await pgPool.query('SELECT * FROM users WHERE id = $1', [id]);
            if(res.rowCount === 0)
                return null;

            const user: User = new User(
                res.rows[0].id,
                res.rows[0].name,
                res.rows[0].email,
                res.rows[0].password_hash,
                res.rows[0].created_at
            );

            return user;

        } catch (error) {
            console.log(error);
            return null; 
        }
    }
    public async findByEmail(email: string): Promise<User | null> {
        try {
            const res = await pgPool.query('SELECT * FROM users WHERE email = $1', [email]);
            if(res.rowCount === 0)
                return null;

            const user: User = new User(
                res.rows[0].id,
                res.rows[0].name,
                res.rows[0].email,
                res.rows[0].password_hash,
                res.rows[0].created_at
            );
            return user;

        } catch (error) {
            console.log(error);
            return null; 
        }
    }
    public async update(user: User): Promise<void> {
        try {
           const res = await pgPool.query("UPDATE users SET name = $1, email = $2, password_hash = $3 WHERE id = $4",[user.name, user.email, user.password, user.id])
           if(res.rowCount === 0)
                throw new Error("User not found")

        } catch (error) {
            console.log(error);
        }
    }
    public async delete(id: User["id"]): Promise<boolean> {
        try {
            const res = await pgPool.query("DELETE FROM users WHERE id = $1",[id]);
            if(res.rowCount === 0)
                throw new Error("User not found")
            
            return true;
         } catch (error) {
             console.log(error);
             return false;
         }
    }


}