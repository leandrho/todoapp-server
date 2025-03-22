import { Router } from "express";

import { userRouter } from "./routes/user.routes";
import { taskRouter } from "./routes/task.routes";
import { taskListRouter } from "./routes/tasklist.routes";

const appRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/tasks', taskRouter);
appRouter.use('/tasklists', taskListRouter);

export default appRouter;