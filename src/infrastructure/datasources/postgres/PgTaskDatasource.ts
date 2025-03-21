import { TaskDatasource } from "../../../domain/datasources";
import { Task, User } from "../../../domain/entities";
import { pgPool } from "./config/pgPool";
import { QueryResult } from 'pg';

export class PgTaskDatasource implements TaskDatasource{
    
    constructor(){}
    public async create(title: string, description: string, tasklistId: string, userId: string, priority: "low" | "medium" | "high"): Promise<Task | null> {
        try {
            const res: QueryResult<{id: string}> = await pgPool.query("INSERT INTO tasks (title, description, task_list_id, user_id, priority, status) VALUES ($1, $2, $3, $4, $5, 'pending') RETURNING id",[title, description, tasklistId, userId, priority]);
            if(res.rowCount === 0)
                throw new Error("Task not created");

            const task: Task | null = await this.findById(res.rows[0].id);
            
            if(!task)
                throw new Error("Task not found");

            return task;

        } catch (error) {
            console.log(error)
            return null;
        }


    }
    public async update(task: Task): Promise<Task | null> {
        try {
            await pgPool.query("UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, finished_at = $5 WHERE id = $6",[task.title, task.description, task.priority, task.state, task.finishedAt, task.id]);
            const task2: Task | null = await this.findById(task.id);

            if(!task2)
                throw new Error("Task not found");

            return task2;

        } catch (error) {
            console.log(error)
            return null;
        }
    }
    public async delete(id: Task["id"]): Promise<boolean> {
        try {
            const res = await pgPool.query("DELETE FROM tasks WHERE id = $1",[id]);
            if(res.rowCount === 0)
                throw new Error("Task not found")
            return true;
            
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    public async findByUserId(userId: string): Promise<Task[]> {
        try {
            const res = await pgPool.query("SELECT * FROM tasks WHERE user_id = $1",[userId]);
            const tasks: Task[] = [];
            res.rows.forEach((task)=>{
                tasks.push(new Task(
                    task.id,
                    task.title,
                    task.description,
                    task.priority,
                    task.task_list_id,
                    task.user_id,
                    task.state,
                    task.created_at,
                    task?.finished,
                    task?.deadline,
                ));
            });

            return tasks;

        } catch (error) {
            console.log(error);
            return [];
        }
    }
    public async findById(id: Task["id"]): Promise<Task | null> {
        try {
            const res = await pgPool.query("SELECT * FROM tasks WHERE id = $1",[id]);
            if(res.rowCount === 0){
                console.log('Task not found')
                return null;
            }
            const task: Task = new Task(
                res.rows[0].id,
                res.rows[0].title,
                res.rows[0].description,
                res.rows[0].priority,
                res.rows[0].task_list_id,
                res.rows[0].user_id,
                res.rows[0].state,
                res.rows[0].created_at,
                res.rows[0]?.finished,
                res.rows[0]?.deadline,
            );
            return task;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    public async deleteByTaskListId(listId: string): Promise<boolean> {
        try {
            await pgPool.query("DELETE FROM tasks where id = $1",[listId]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    public async deleteAllByUserId(userId: string): Promise<boolean> {
        try {
            const res = await pgPool.query("SELECT * FROM tasks WHERE user_id  = $1", [userId]);
            if(res.rowCount === 0)
                throw new Error("User not found");
            res.rows.forEach((user)=>{
                this.delete(user.id);
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    


}