import { Request, Response } from 'express';
import { TaskService } from "../../../application/services";
import { CreateTaskInputDto, CreateTaskOutputDto, UpdateTaskInputDto,TaskOutputDto } from '../../../application/dtos/task';


export class TaskController{
    
    constructor(private taskService: TaskService){}

    public async createTask(req: Request, res: Response): Promise<Response>{

        try {
            const {title, description, tasklistId, userId} = req.body;
            
            const newTask: CreateTaskInputDto = { title, description, priority: req.body.priority? req.body.priority : 'low', tasklistId, userId };
            const createdTask: CreateTaskOutputDto | null = await this.taskService.createTask(newTask);
            if(!createdTask)
                return res.status(404).json({error: 'User not found - u another'});

            return res.status(201).json(createdTask);

        } catch (err) {
            if(err instanceof Error)
                return res.status(400).json({error: err.message});
            
            return res.status(400).json({error: 'An unknown error has occured'});
        }

    }

    public async updateTask(req: Request, res: Response): Promise<Response>{
        try {
            const {id} = req.params;
            const { userId, title, description, priority, state }: UpdateTaskInputDto & {userId: string} = req.body;
            const updatedTask = await this.taskService.updateTask( id, userId, { title, description, priority, state } );
            if(!updatedTask)
                return res.status(404).json({error: 'Task not found'});
            
            return res.status(200).json(updatedTask);


        } catch (error) {
            return res.status(400).json({error: 'Invalid task data'});
        }

    }

    public async deleteTask(req: Request, res: Response): Promise<Response>{
        try {
            const {id} = req.params;
            const {userId} = req.body;
            const deletedTask = await this.taskService.deleteTask(id, userId);
            if(!deletedTask)
                throw new Error('Task not found');
            
            return res.status(200).json({messege: 'Task deleted successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Invalid task or permission denied'});
        }
    }

    public async getTaskById(req: Request, res: Response): Promise<Response>{
        try {
            const {id} = req.params
            const task: TaskOutputDto | null = await this.taskService.findTaskById(id);
            if(!task)
                return res.status(404).json({error: 'Task not found'});
            
            return res.status(200).json(task);

        } catch (error) {
            return res.status(400).json({error: 'Invalid task'});
        }
    }

    public async getTasksByUserId(req: Request, res: Response): Promise<Response>{
        try {
            const {userId} = req.params
            const tasks: TaskOutputDto[] = await this.taskService.findTaskByUserId(userId);
            if(!tasks.length)
                return res.status(404).json({error: 'Tasks not found'});
            
            return res.status(200).json(tasks);

        } catch (error) {
            return res.status(400).json({error: 'Invalid user u another error'});
        }
    }

    public async deleteTasksByTaskListId(req: Request, res: Response): Promise<Response>{
        try {
            await this.taskService.deleteAllByTasklistId(req.params.taskListId);
            return res.status(200).json({messege: 'Tasks deleted successfully'});
        
        } catch (error) {
            return res.status(400).json({error: 'Invalid task list'});    
        }
    }
    public async deleteAllByUserId(req: Request, res: Response): Promise<Response>{
        try {
            await this.taskService.deleteAllByUserId(req.params.userId);
            return res.status(200).json({messege: 'Tasks deleted successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Invalid user'});    
        }
    }
}