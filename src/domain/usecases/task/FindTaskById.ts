import { Task } from "../../entities";
import { TaskRepository } from '../../repositories';

export class FindTaskById{
    
    constructor(private repoTask: TaskRepository){}

    public async execute(id: string): Promise<Task | null>{
        
        const task: Task | null= await this.repoTask.findById(id);
        return task;
    }
}