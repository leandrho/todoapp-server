import { TaskStateDto } from "./TaskStateDto"

export type CreateTaskInputDto = {
    title :string, 
    description: string, 
    priority: 'low' | 'medium' | 'high',
    tasklistId: string,
    userId: string,
    deadline?: Date
}
export type CreateTaskOutputDto = {
    id: string,
    title :string, 
    description: string, 
    priority: 'low' | 'medium' | 'high',
    tasklistId: string,
    userId: string,
    createdAt: Date,
    state: TaskStateDto,
    deadline?: Date
}