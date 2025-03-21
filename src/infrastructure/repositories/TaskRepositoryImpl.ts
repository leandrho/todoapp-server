import { TaskDatasource } from '../../domain/datasources';
import { Task } from '../../domain/entities';
import { TaskRepository } from '../../domain/repositories';


export class TaskRepositoryImpl implements TaskRepository{

    private taskDatasource: TaskDatasource;


    constructor(taskDatasource: TaskDatasource){
        this.taskDatasource = taskDatasource;
    }

    public async create(title: string, description: string, tasklistId: string, userId: string, priority: 'low' | 'medium' | 'high'): Promise<Task | null> {
        return await this.taskDatasource.create(title, description, tasklistId, userId, priority);
    }
    public async update(task: Task): Promise<Task | null> {
        return await this.taskDatasource.update(task);
    }
    public async delete(id: Task['id']): Promise<boolean> {
        return await this.taskDatasource.delete(id);
    }
    public async findByUserId(userId: string): Promise<Task[]> {
        return await this.taskDatasource.findByUserId(userId);
    }
    public async findById(id: Task['id']): Promise<Task | null> {
        return await this.taskDatasource.findById(id);
    }
    public async deleteByTaskListId(listId: string): Promise<boolean> {
        return await this.taskDatasource.deleteByTaskListId(listId);
    }
    public async deleteAllByUserId(userId: string): Promise<boolean> {
        return await this.taskDatasource.deleteAllByUserId(userId);
    }

}