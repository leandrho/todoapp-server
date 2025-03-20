import { TaskList } from "../../entities";
import { TaskListRepository, TaskRepository } from "../../repositories";

export class DeleteAllTaskListByUserId{

    constructor(private repo: TaskListRepository, private repoTask: TaskRepository){}

    public async execute(userId: string):Promise<void>{
       try {
            const taskList: TaskList[] = await this.repo.findByUserId(userId);

            if(!taskList.length)
                throw new Error('There are no Tasklists for that user');

            await this.repoTask.deleteAllByUserId(userId);
            await this.repo.deleteAllByUserId(userId);

       } catch (error) {
            throw new Error('Error deleting tasklists');
       }
    }
}