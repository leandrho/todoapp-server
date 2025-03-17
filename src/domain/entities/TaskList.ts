
export class TaskList{

    constructor(
        public readonly id: string, 
        public name: string, 
        public readonly userId: string, 
        public readonly createdAt: Date = new Date()
    ){}
    
}