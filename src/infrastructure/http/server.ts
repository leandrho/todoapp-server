import app from "./app";

export const startServer = ()=>{
    app.listen(3000,()=>{
        console.log('Server running on http://localhost:3000')
    });
}