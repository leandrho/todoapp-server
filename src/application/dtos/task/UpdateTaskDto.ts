import { TaskStateDto } from "./TaskStateDto"

export type UpdateTaskInputDto = {
    title?: string,
    description?: string,
    priority?: 'low' | 'medium' | 'high',
    state?: TaskStateDto
}

export type UpdateTaskOutputDto = {
    id: string,
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    state: TaskStateDto,
    tasklistId: string,
    userId: string,
    createdAt: Date,
    deadline?: Date,
    finishedAt?: Date
}

