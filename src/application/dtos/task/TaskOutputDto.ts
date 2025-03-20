import { TaskStateDto } from "./TaskStateDto"


export type TaskOutputDto = {
    id: string,
    title :string, 
    description: string, 
    priority: 'low' | 'medium' | 'high',
    tasklistId: string,
    userId: string,
    createdAt: Date,
    state: TaskStateDto,
    deadline?: Date,
    finishedAt?: Date
}