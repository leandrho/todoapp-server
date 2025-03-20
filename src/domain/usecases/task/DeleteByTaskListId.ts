
import { TaskRepository } from "../../repositories";

export class DeleteByTaskListId{

    constructor(private repo: TaskRepository){}

    public async execute(taskListId: string): Promise<void>{

        await this.repo.deleteByTaskListId(taskListId);
    
    }

}