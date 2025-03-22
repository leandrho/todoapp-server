import { Router, Request, Response } from "express";
import { PgTaskDatasource, PgTaskListDatasource, PgUserDatasource } from "../../datasources/postgres";
import { TaskListRepositoryImpl, TaskRepositoryImpl, UserRepositoryImpl } from "../../repositories";
import { CreateTask, DeleteTask, UpdateTask } from "../../../domain/usecases/task";
import { DeleteAllByUserId } from '../../../domain/usecases/task/DeleteAllByUserId';
import { DeleteByTaskListId } from '../../../domain/usecases/task/DeleteByTaskListId';
import { FindTaskById } from '../../../domain/usecases/task/FindTaskById';
import { FindTaskByUserId } from '../../../domain/usecases/task/FindByUserId';
import { TaskService } from "../../../application/services";
import { TaskController } from '../controllers/TaskController';


const taskRouter: Router = Router();

const taskDS = new PgTaskDatasource();
const taskRepo = new TaskRepositoryImpl(taskDS);

const taskListDS = new PgTaskListDatasource();
const taskListRepo = new TaskListRepositoryImpl(taskListDS);

const userDS = new PgUserDatasource();
const userRepo = new UserRepositoryImpl(userDS);

const createTaskUC = new CreateTask(taskRepo, taskListRepo, userRepo);
const updateTaskUC = new UpdateTask(taskRepo);
const deleteTaskUC = new DeleteTask(taskRepo);
const deleteAllByUserIdUC = new DeleteAllByUserId(taskRepo);
const deleteByTaskListIdUC = new DeleteByTaskListId(taskRepo);
const findTaskByIdUC = new FindTaskById(taskRepo);
const findTaskByUserIdUC = new FindTaskByUserId(taskRepo);

const taskService = new TaskService(createTaskUC, updateTaskUC, deleteTaskUC, findTaskByIdUC, findTaskByUserIdUC, deleteAllByUserIdUC, deleteByTaskListIdUC);
const taskController = new TaskController(taskService);


taskRouter.get("/:id",(req: Request, res: Response)=>{taskController.getTaskById(req, res)});
taskRouter.get("/users/:userId",(req: Request, res: Response)=>{taskController.getTasksByUserId(req, res)});
taskRouter.post("/create",( req: Request, res: Response )=>{ taskController.createTask( req, res ) });
taskRouter.put('/update/:id', ( req: Request, res: Response )=>{ taskController.updateTask( req, res )} );
taskRouter.delete('/delete/:id', ( req: Request, res: Response )=>{ taskController.deleteTask( req, res )});
taskRouter.delete('/delete/all/:userId', ( req: Request, res: Response )=>{ taskController.deleteAllByUserId( req, res )});
taskRouter.delete('/delete/category/:taskListId', ( req: Request, res: Response )=>{ taskController.deleteTasksByTaskListId(req, res) });


export { taskRouter };










