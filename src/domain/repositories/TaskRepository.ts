import { Task } from "../entities/Task";

export interface TaskRepository{
    create(title: string, description: string, tasklistId: string, userId: string, priority: 'low'| 'medium'| 'high'): Promise<Task | null>;
    update(task: Task): Promise<Task | null>;
    delete(id: Task["id"]): Promise<boolean>;
    findByUserId(userId: string): Promise<Task[]>;
    findById(id: Task["id"]): Promise<Task | null>;
    deleteByTaskListId(listId: string): Promise<boolean>;
    deleteAllByUserId(userId: string): Promise<boolean>;
}
