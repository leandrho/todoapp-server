import { Response, Request } from "express";
import { TaskListService } from "../../../application/services";
import { CreateTaskListOutputDto } from "../../../application/dtos/tasklist/CreateTaskListOutputDto";


export class TaskListController{

    constructor(private taskListService: TaskListService){}

    public async createTaskList(req: Request, res: Response): Promise<Response>{
        try {
            const {name, userId} = req.body;
            console.log("TASKLIST: ", req.body)
            const taskList: CreateTaskListOutputDto | null = await this.taskListService.createTaskList(name, userId);
            if(!taskList)
                throw new Error('Error creating task list')
            
            return res.status(201).json(taskList);

        } catch (error) {
            return res.status(400).json({error: 'Error creating task list'});
        }
    }

    public async deleteTaskList(req: Request, res: Response): Promise<Response>{
        try {
            const {userId} = req.body;
            const d = await this.taskListService.deleteTaskList(req.params.id, userId);
            if(!d)
                res.status(404).json({messege: "Tasklist doesn't exist or you don't have permission to delete it"});
            
            return res.status(200).json({messege: 'Task list deleted successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Error deleting task list'});
        }
    }

    public async deleteAllTaskListByUserId(req: Request, res: Response): Promise<Response>{
        try {
            const {userId} = req.params;
            const d = await this.taskListService.deleteAllTaskListByUserId(userId);
            if(!d)
                res.status(404).json({messege: "Tasklists don't exist or you don't have permission to delete it"});
            
            return res.status(200).json({messege: 'Tasklists deleted successfully'});

        } catch (error) {
            return res.status(400).json({error: 'Error deleting tasklists for user'});
        }
    }
    public async findTaskListById(req: Request, res: Response): Promise<Response>{
        try {
            const {id} = req.params;
            const d = await this.taskListService.findTaskListById(id);
            if(!d)
                res.status(404).json({messege: "Tasklists don't exist or you don't have permission to delete it"});
            
            return res.status(200).json(d);

        } catch (error) {
            return res.status(400).json({error: 'Error deleting tasklists for user'});
        }
    }
    public async findTaskListByUserId(req: Request, res: Response): Promise<Response>{
        try {
            const {userId} = req.params;
            const ds = await this.taskListService.findTaskListByUserId(userId);
            if(!ds.length)
                res.status(404).json({messege: "Tasklists don't exist for the user"});
            
            return res.status(200).json(ds);

        } catch (error) {
            return res.status(400).json({error: 'Error finding tasklists for user'});
        }
    }

}