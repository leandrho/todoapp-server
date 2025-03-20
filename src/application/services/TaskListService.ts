
import { TaskList } from '../../domain/entities/TaskList';
import { CreateTaskListOutputDto } from '../dtos/tasklist/CreateTaskListOutputDto';
import { FindTaskListById, FindTaskListByUserId, DeleteAllTaskListByUserId, CreateTaskList, DeleteTaskList } from '../../domain/usecases/tasklist';
import { TaskListOutputDto } from '../dtos/tasklist/TaskListOutputDto';

export class TaskListService{

    constructor(
        private createTaskListUC: CreateTaskList, 
        private deleteTaskListUC: DeleteTaskList,
        private deleteAllTaskListByUserIdUC: DeleteAllTaskListByUserId,
        private findTaskListByIdUC: FindTaskListById,
        private findTaskListByUserIdUC: FindTaskListByUserId
    ){}

    public async createTaskList( name: string, userId: string ):Promise<CreateTaskListOutputDto | null>{
        try {
            
            const newTaskList: TaskList = await this.createTaskListUC.execute( name, userId);
            return {
                ...newTaskList
            }

        } catch (error) {
            console.log("TaskListService -- createTaskList: "+error)
            return null;
        }
    }

    public async deleteTaskList(userId: string, taskListId: string): Promise<boolean>{
        try {
            
            await this.deleteTaskListUC.execute(userId, taskListId);
            return true;

        } catch (error) {
            console.log(error)
            return false;
        }
    }
    public async deleteAllTaskListByUserId(userId: string): Promise<boolean>{
        try {
            
            await this.deleteAllTaskListByUserIdUC.execute(userId);
            return true;

        } catch (error) {
            console.log(error)
            return false;
        }
    }

    public async findTaskListById(taskListId: string): Promise<TaskListOutputDto | null>{
        try {
            const taskList: TaskList = await this.findTaskListByIdUC.execute(taskListId);
            return {
                ...taskList
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    public async findTaskListByUserId(taskListId: string): Promise<TaskListOutputDto[]>{
        try {
            const taskList: TaskList[] = await this.findTaskListByUserIdUC.execute(taskListId);
            const ret: TaskListOutputDto[] = [];
            taskList.forEach((tl)=>{
                ret.push({
                    ...tl
                })
            });
            return ret;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}