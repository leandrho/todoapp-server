import { Router, Request, Response } from "express";

import { TaskListRepositoryImpl, TaskRepositoryImpl, UserRepositoryImpl } from "../../repositories";
import { CreateTaskList,DeleteTaskList, DeleteAllTaskListByUserId, FindTaskListById, FindTaskListByUserId } from '../../../domain/usecases/tasklist';
import { PgTaskDatasource, PgUserDatasource, PgTaskListDatasource } from "../../datasources/postgres";
import { TaskListService } from "../../../application/services";
import { TaskListController } from "../controllers";

const taskListRouter: Router = Router();

const pgTaskListDatasource = new PgTaskListDatasource();
const taskListRepository = new TaskListRepositoryImpl(pgTaskListDatasource);

const pgUserDatasource = new PgUserDatasource();
const userRepository = new UserRepositoryImpl(pgUserDatasource);

const pgTaskDatasource = new PgTaskDatasource();
const taskRepository = new TaskRepositoryImpl(pgTaskDatasource);

const createTaskListUC = new CreateTaskList(taskListRepository, userRepository);
const deleteAllTaskListByUserIdUC = new DeleteAllTaskListByUserId(taskListRepository, taskRepository);
const deleteTaskListUC = new DeleteTaskList(taskListRepository, taskRepository);
const findTaskListByIdUC = new FindTaskListById(taskListRepository);
const findTaskListByUserIdUC = new FindTaskListByUserId(taskListRepository);

const taskListService = new TaskListService(createTaskListUC,deleteTaskListUC,deleteAllTaskListByUserIdUC,findTaskListByIdUC,findTaskListByUserIdUC);
const taskListController = new TaskListController(taskListService);

taskListRouter.get('/:id',(req: Request, res: Response)=>{ taskListController.findTaskListById(req, res)});
taskListRouter.get('/users/:userId',(req: Request, res: Response)=>{ taskListController.findTaskListByUserId(req, res)});
taskListRouter.post("/create",( req: Request, res: Response )=>{ taskListController.createTaskList(req, res)});
taskListRouter.delete("/delete/:id",(req: Request, res: Response )=>{ taskListController.deleteTaskList(req, res)});
taskListRouter.delete("/delete/users/:userId", (req: Request, res: Response)=>{ taskListController.deleteAllTaskListByUserId(req, res)});


export { taskListRouter };