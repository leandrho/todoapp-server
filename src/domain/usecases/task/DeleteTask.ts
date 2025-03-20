import { Task } from "../../entities";
import { TaskRepository } from "../../repositories";

export class DeleteTask{

    constructor(private repo: TaskRepository){}

    public async execute(taskId: string, userId: string): Promise<void>{

        const task: Task | null = await this.repo.findById(taskId);
        if(!task)
            throw new Error('Cannot delete task, it doesnt exist');

        if(task.userId !== userId)
            throw new Error('Cannot delete task, permission denied')
        await this.repo.delete(taskId);
    
    }

}