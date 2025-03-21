import { Query, QueryResult } from "pg";
import { TaskListDatasource } from "../../../domain/datasources";
import { TaskList } from "../../../domain/entities";
import { pgPool } from "./config/pgPool";

export class PgTaskListDatasource implements TaskListDatasource{
    
    constructor(){} 
    public async create(name: string, userId: string): Promise<TaskList | null> {
        try {
            const res:QueryResult<{id: string}> = await pgPool.query("INSERT INTO task_lists ( name, user_id ) VALUES ($1, $2) RETURNING id",[name, userId]);
            if(res.rowCount === 0)
                throw new Error("Tasklist not created");

            const taskList: TaskList | null = await this.findById(res.rows[0].id);

            return taskList;

        } catch (error) {
            console.log(error)
            return null;
        }
    }
    public async update(list: TaskList): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async delete(taskListId: string): Promise<boolean> {
        try {
            await pgPool.query("DELETE FROM task_lists where id = $1",[taskListId]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    public async findById(id: string): Promise<TaskList | null> {
        try {
            
            const res = await pgPool.query("SELECT * FROM task_lists WHERE id = $1",[id]);
            if(res.rowCount === 0)
                throw new Error("Tasklist not found");

            const taskList = new TaskList(
                res.rows[0].id,
                res.rows[0].name,
                res.rows[0].user_id,
                res.rows[0].created_at
            );

            return taskList;

        } catch (error) {
            console.log(error);
            return null;

        }
    }
    public async findByUserId(userId: string): Promise<TaskList[]> {
        try {

            const res = await pgPool.query("SELECT * FROM task_lists WHERE user_id = $1",[userId]);
            if(res.rowCount === 0)
                throw new Error("Tasklist not found");

            const taskLists: TaskList[] = [];
            res.rows.forEach((tl)=>{
                const taskList = new TaskList(
                    tl.id,
                    tl.name,
                    tl.user_id,
                    tl.created_at
                );
                taskLists.push(taskList);
            });

            return taskLists;

        } catch (error) {
            console.log(error);
            return [];

        }
    }
    public async deleteAllByUserId(userId: string): Promise<boolean> {
        try {
            const res: QueryResult<TaskList> = await pgPool.query("SELECT * FROM task_lists WHERE user_id = $1",[userId]);
            if(res.rowCount === 0)
                throw new Error("Tasklist not found");
            res.rows.forEach((tl)=>{
                this.delete(tl.id);
            });
            return true;

        } catch (error) {
            console.log(error);
            return false;

        }
    }

    
}