import { TaskList } from "../../entities";
import { TaskListRepository, UserRepository } from "../../repositories";

export class CreateTaskList{
    constructor(private repo: TaskListRepository, private repoUser: UserRepository){}

    public async execute( name: string, userId: string ): Promise<TaskList>{

        if(! await this.repoUser.findById(userId))
            throw new Error('Cannot create task list. Error: user not exist');
        
        const taskList: TaskList | null = await this.repo.create(name, userId);
        if(!taskList)
            throw new Error('Cannot create task list. Error: server error');
        
        return taskList
    }
}