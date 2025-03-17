
export enum TaskState {
    Pending = 0,
    InProgress,
    Completed,
    Canceled,
}

export class Task {

    constructor( 
        public readonly id: string, 
        public title :string, 
        public description: string, 
        public priority: 'low' | 'medium' | 'high',
        public readonly tasklistId: string,
        public readonly userId: string,
        public state: TaskState = TaskState.Pending,
        public readonly createdAt: Date = new Date(),
        public finishedAt?: Date,
        public deadline?: Date
    ){}

    public updateState( newState :TaskState){
        //! TODO ¿need checks?
        this.state = newState;
        if(newState === TaskState.Completed){
            this.finishedAt = new Date();
        }
    }

}