import { Task, TaskList } from "../../entities";
import { TaskRepository, TaskListRepository, UserRepository } from "../../repositories";

export class DeleteUser{
    constructor(
        private repoUser: UserRepository,
        private repoTask: TaskRepository,
        private repoTaskList: TaskListRepository,
    ){}

    public async execute(userId: string): Promise<void>{

        if(!await this.repoUser.findById(userId)) 
            throw new Error('User not found');

        await this.repoTask.deleteAllByUserId(userId);
        await this.repoTaskList.deleteAllByUserId(userId);
        await this.repoUser.delete(userId);
    }
}