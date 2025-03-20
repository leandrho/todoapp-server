import { TaskRepository } from "../../repositories";
import { Task } from '../../entities/Task';

export class DeleteAllByUserId{

    constructor(private repo: TaskRepository){}

    public async execute( userId: string ): Promise<void>{
        await this.repo.deleteAllByUserId(userId);
    }

}