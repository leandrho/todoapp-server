import { Task } from "../../entities";
import { TaskListRepository, TaskRepository, UserRepository } from '../../repositories';

export class CreateTask{
    constructor(private repoTask: TaskRepository, private repoTaskList: TaskListRepository, private repoUser: UserRepository){}

    public async execute(title: string, description: string, tasklistId: string, userId: string, priority: 'low'| 'medium'| 'high' = 'low'): Promise<Task | null>{
        
        if(!await this.repoUser.findById(userId))
            throw new Error("Cannot create task. User not found");

        if(!await this.repoTaskList.findById(tasklistId))
            throw new Error("Cannot create task. TaskList not found");

        
        const task: Task | null= await this.repoTask.create(title, description, tasklistId, userId, priority);
        
        return task;
    }
}