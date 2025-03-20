import { TaskList } from "../../entities";
import { TaskListRepository } from "../../repositories";

export class FindTaskListByUserId{
    
    constructor(private repo: TaskListRepository){}

    public async execute(id: string): Promise<TaskList[]>{
        
        const taskList: TaskList[] = await this.repo.findByUserId(id);
        if(!taskList.length)
            throw new Error('Cannot get task list. Error: server error');
        
        return taskList
    }
}