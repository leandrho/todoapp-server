import { Router, Request, Response } from 'express';

import { UserController } from "../controllers";
import { UserService } from '../../../application/services/UserService';
import { CreateUser, UpdateUser, DeleteUser } from "../../../domain/usecases/user";
import { UserRepositoryImpl, TaskRepositoryImpl, TaskListRepositoryImpl } from "../../repositories";
import { PgUserDatasource, PgTaskDatasource, PgTaskListDatasource } from "../../datasources/postgres";


const userRouter = Router();

const pgUserDatasourceImpl = new PgUserDatasource();
const userRepository = new UserRepositoryImpl(pgUserDatasourceImpl);

const pgTaskDatasourceImpl = new PgTaskDatasource();
const taskRepository = new TaskRepositoryImpl(pgTaskDatasourceImpl);

const pgTaskListDatasourceImpl = new PgTaskListDatasource();
const taskListRepository = new TaskListRepositoryImpl(pgTaskListDatasourceImpl);

const createUserUC = new CreateUser(userRepository);
const updateUserUC = new UpdateUser(userRepository);
const deleteUserUC = new DeleteUser(userRepository, taskRepository, taskListRepository);

const userService = new UserService(createUserUC, updateUserUC, deleteUserUC);
const userController = new UserController(userService);

userRouter.post("/create", (req: Request, res: Response) => { userController.createUser(req, res)});
userRouter.put("/:id",(req: Request, res: Response)=>{ userController.updateUser(req, res) });
userRouter.delete("/:id", (req: Request, res: Response)=>{ userController.deleteUser(req, res) });

export { userRouter };