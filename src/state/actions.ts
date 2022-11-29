import {Priority, Status} from "./state";

export enum ActionType {
    AddProject,
    ToggleTaskCompleted,
    AddTask,
    UpdateTask,
    DropTask,
    TaskDragStart,
    AddComment,
    SetState,
    DeleteTask
}

export interface IAddProject {
    type: ActionType.AddProject;
    payload: { name: string, color: string }
}

export interface ITaskDragStart {
    type: ActionType.TaskDragStart;
    payload: { taskId: number, columnId: number }
}


export interface IAddTask {
    type: ActionType.AddTask;
    payload: {
        projectId: number,
        columnId: number,
        title: string,
        body: string,
        dateDeadline: number,
        priority: Priority,
        status: Status,
        files: string[]
    }
}

export interface IDropTask {
    type: ActionType.DropTask;
    payload: { projectId: number, startColumnId: number, finishColumnId: number, id: number, }
}

export interface IUpdateTask {
    type: ActionType.UpdateTask;
    payload: {
        projectId: number,
        columnId: number,
        taskId: number,
        title: string,
        body: string,
        dateDeadline: number,
        priority: Priority,
        status: Status,
        files: string[]
    }
}

export interface IToggleTaskCompleted {
    type: ActionType.ToggleTaskCompleted;
    payload: { projectId: number, taskId: number }
}

export interface IAddComment {
    type: ActionType.AddComment;
    payload: { projectId: number, columnId: number, taskId: number, commentId: number, comment: string }
}

export interface ISetState {
    type: ActionType.SetState;
    payload: { state_: string }
}

export interface IDeleteTask {
    type: ActionType.DeleteTask;
    payload: { projectId: number, columnId: number, taskId: number }
}

export type AppActions =
    ITaskDragStart
    | IAddComment
    | IDropTask
    | IAddTask
    | IUpdateTask
    | IAddProject
    | IToggleTaskCompleted
    | ISetState
    | IDeleteTask;
