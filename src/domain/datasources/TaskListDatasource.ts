import { TaskList } from '../entities/TaskList';


export interface TaskListDatasource{
    create(name: string, userId: string): Promise<TaskList | null>;
    update(list: TaskList): Promise<void>;
    delete(taskListId: string): Promise<boolean>;
    findById(id: string): Promise<TaskList | null>;
    findByUserId(userId: string): Promise<TaskList[]>;
    deleteAllByUserId(userId: string): Promise<boolean>;
}
