import express, { Response ,Request, NextFunction } from "express";
import appRouter from "./router";

const app = express();

//Middlewares
app.use(express.json());

//Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Error interno' });
});

app.use('/api', appRouter);

export default app;
