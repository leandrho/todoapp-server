import app from "./app";
import { envs } from "../../config/envs";
export const startServer = ()=>{
    app.listen(envs.PORT,()=>{
        console.log(`Server running on http://localhost:${envs.PORT}`)
    });
}