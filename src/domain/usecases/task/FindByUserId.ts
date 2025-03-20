import { Task } from "../../entities";
import { TaskRepository } from '../../repositories';

export class FindTaskByUserId{
    
    constructor(private repoTask: TaskRepository){}

    public async execute(id: string): Promise<Task[]>{
        
        const tasks: Task[] = await this.repoTask.findByUserId(id);
        if(!tasks.length)
            throw new Error('there are not task for that user')

        return tasks;
    }
}