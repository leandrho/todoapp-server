import { TaskState } from "../../../domain/entities";

export enum TaskStateDto {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed",
    Canceled = "Canceled",
}

export function taskStateToTaskStateDto(taskstate: TaskState): TaskStateDto{
    switch(taskstate){
        case TaskState.Pending:
            return TaskStateDto.Pending;
        case TaskState.InProgress:
            return TaskStateDto.InProgress;
        case TaskState.Completed:
            return TaskStateDto.Completed;
            case TaskState.Canceled:
            return TaskStateDto.Canceled;
    }
}

export function taskStateDtoToTaskState(taskstate: TaskStateDto): TaskState{
    switch(taskstate){
        case TaskStateDto.Pending:
            return TaskState.Pending;
        case TaskStateDto.InProgress:
            return TaskState.InProgress;
        case TaskStateDto.Completed:
            return TaskState.Completed;
        case TaskStateDto.Canceled:
            return TaskState.Canceled;
    }
}