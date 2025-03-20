
import { Task } from "../../domain/entities";
import { CreateTask, DeleteTask, UpdateTask } from "../../domain/usecases/task";
import { CreateTaskInputDto, CreateTaskOutputDto } from "../dtos/task/CreateTaskDto";
import { taskStateDtoToTaskState, taskStateToTaskStateDto } from "../dtos/task/TaskStateDto";
import { UpdateTaskOutputDto, UpdateTaskInputDto } from "../dtos/task/UpdateTaskDto";
import { FindTaskById } from '../../domain/usecases/task/FindTaskById';
import { TaskOutputDto } from "../dtos/task/TaskOutputDto";
import { FindTaskByUserId } from '../../domain/usecases/task/FindByUserId';
import { DeleteAllByUserId } from '../../domain/usecases/task/DeleteAllByUserId';
import { DeleteByTaskListId } from '../../domain/usecases/task/DeleteByTaskListId';

export class TaskService{

    constructor(
                private createTaskUC: CreateTask, 
                private updateTaskUC: UpdateTask, 
                private deleteTaskUC: DeleteTask, 
                private findTaskByIdUC: FindTaskById, 
                private findTaskByUserIdUC: FindTaskByUserId,
                private deleteAllByUserIdUC: DeleteAllByUserId,
                private deleteByTaskListUC: DeleteByTaskListId
        ){
    }
    
    public async createTask(newTask: CreateTaskInputDto):Promise<CreateTaskOutputDto | null>{
        try {
            const task: Task | null = await this.createTaskUC.execute(newTask.title, newTask.description, newTask.tasklistId, newTask.userId, newTask.priority);
            if(!task)
                return null;

            return this.taskToCreateTaskOutputDto(task);

        } catch (error) {
            console.log(error);
            return null;
        }

    }

    public async updateTask(taskId: string, userId: string, updateTask: UpdateTaskInputDto): Promise<UpdateTaskOutputDto | null>{
        try {
            const task: Task | null = await this.updateTaskUC.execute(userId, taskId, {...updateTask, state: updateTask.state && taskStateDtoToTaskState(updateTask.state)});
            if(!task)
                return null;
            
            return {
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                state: taskStateToTaskStateDto(task.state),
                tasklistId: task.tasklistId,
                userId: task.userId,
                createdAt: task.createdAt,
                deadline: task.deadline,
                finishedAt: task.finishedAt
            }
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async deleteTask(taskId: string, userId: string):Promise<boolean>{
        try {
            
            await this.deleteTaskUC.execute(taskId, userId);
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async findTaskById(taskId: string):Promise<TaskOutputDto | null>{
        try {
            
            const task: Task | null = await this.findTaskByIdUC.execute(taskId);
            if(!task)
                return null;
            return {
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                tasklistId: task.tasklistId,
                userId: task.userId,
                createdAt: task.createdAt,
                state: taskStateToTaskStateDto(task.state),
                deadline: task.deadline,
                finishedAt: task.finishedAt
            };

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async findTaskByUserId(userId: string):Promise<TaskOutputDto[]>{
        try {
            
            const tasks: Task[]= await this.findTaskByUserIdUC.execute(userId);

            const tasksOut: TaskOutputDto[] = [];

            tasks.forEach(task=>{
                tasksOut.push({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    tasklistId: task.tasklistId,
                    userId: task.userId,
                    createdAt: task.createdAt,
                    state: taskStateToTaskStateDto(task.state),
                    deadline: task.deadline,
                    finishedAt: task.finishedAt}) });

            return tasksOut;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    private taskToCreateTaskOutputDto(task: Task): CreateTaskOutputDto{

        return{
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            tasklistId: task.tasklistId,
            userId: task.userId,
            createdAt: task.createdAt,
            state: taskStateToTaskStateDto(task.state),
            deadline: task.deadline
        };

    }
    public async deleteAllByUserId( userId: string ):Promise<boolean>{
        try {
            
            await this.deleteAllByUserIdUC.execute(userId);
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
    public async deleteAllByTasklistId( taskListId: string ):Promise<boolean>{
        try {
            
            await this.deleteByTaskListUC.execute(taskListId);
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }


}