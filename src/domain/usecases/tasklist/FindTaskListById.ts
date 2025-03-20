import { TaskList } from "../../entities";
import { TaskListRepository } from "../../repositories";

export class FindTaskListById{

    constructor(private repo: TaskListRepository){}

    public async execute(id: string): Promise<TaskList>{
        
        const taskList: TaskList | null = await this.repo.findById(id);
        if(!taskList)
            throw new Error('Cannot get task list. Error: server error');
        
        return taskList
    }
}