import { TaskList } from '../../domain/entities';
import { TaskListRepository } from '../../domain/repositories';
import { TaskListDatasource } from '../../domain/datasources';

export class TaskListRepositoryImpl implements TaskListRepository{

    private taskListDatasource: TaskListDatasource;

    constructor(taskListaDatasource: TaskListDatasource) {
        this.taskListDatasource = taskListaDatasource;
    }

    public async create(name: string, userId: string): Promise<TaskList | null> {
        return await this.taskListDatasource.create(name, userId);
    }

    public async update(list: TaskList): Promise<void> {
        return await this.taskListDatasource.update(list);
    }

    public async delete(taskListId: string): Promise<boolean> {
        return await this.taskListDatasource.delete(taskListId);
    }

    public async findById(id: string): Promise<TaskList | null> {
        return await this.taskListDatasource.findById(id);
    }

    public async findByUserId(userId: string): Promise<TaskList[]> {
        return await this.taskListDatasource.findByUserId(userId);
    }

    public async deleteAllByUserId(userId: string): Promise<boolean> {
        return await this.taskListDatasource.deleteAllByUserId(userId);
    }



}