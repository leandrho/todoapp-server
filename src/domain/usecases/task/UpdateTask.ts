import { Task, TaskState } from "../../entities";
import { TaskRepository } from "../../repositories";

export class UpdateTask{

    constructor(private repo: TaskRepository){}

    public async execute(userId:string, taskId: string, updateData: {title?:string, description?:string, priority?: 'low'|'medium'|'high', state?: TaskState}): Promise<Task | null>{

        const origTask = await this.repo.findById(taskId);
        if(!origTask)
            throw new Error("Cannot update task: it doesn't exist");

        if(origTask.userId !== userId)
            throw new Error("Cannot update task: permission denied");

        origTask.title = updateData.title || origTask.title;
        origTask.description = updateData.description || origTask.description;
        origTask.priority = updateData.priority || origTask.priority;

        if(updateData.state)
            origTask.updateState(updateData.state);

        return await this.repo.update(origTask);
    }

}