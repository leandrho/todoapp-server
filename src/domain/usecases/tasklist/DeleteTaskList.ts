
import { TaskListRepository, TaskRepository } from "../../repositories";

export class DeleteTaskList{

    constructor(private repo: TaskListRepository, private repoTask: TaskRepository){}

    public async execute(userId:string, taskListId: string):Promise<void>{
        const taskList = await this.repo.findById(taskListId);
        if(!taskList)
            throw new Error('Tasklist not exist');

        if(taskList.id !== userId)
            throw new Error('Cannot delete task list, permission denied')

        await this.repoTask.deleteByTaskListId(taskList.id);
        await this.repo.delete(taskList.id)
    }
}