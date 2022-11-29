import {ColumnName, IAppState, IColumn, IComment, IProject, ITask, ObjectName, Priority, Status} from "./state";
import {
    ActionType,
    AppActions,
    IAddComment,
    IAddProject,
    IAddTask, IDeleteTask,
    IDropTask,
    ISetState,
    ITaskDragStart,
    IToggleTaskCompleted,
    IUpdateTask,
} from "./actions";

let addLastId = (state: IAppState, objectName: ObjectName): number => {
    let object = state.lastIds.find(o => o.name === objectName)
    object.lastId += 1
    return object.lastId;
}

export function appReducer(state: IAppState, action: AppActions): IAppState {
    let project: IProject
    let columnStart: IColumn
    let columnFinish: IColumn
    let task: ITask
    let column: IColumn
    let comment: IComment
    let newComment: IComment
    let id: number
    switch (action.type) {
        case ActionType.SetState:
            state = JSON.parse(action.payload.state_)
            return {...state};
        case ActionType.DropTask:
            project = state.projects.find(p => p.id === action.payload.projectId)
            columnStart = project.columns.find(c => c.id === action.payload.startColumnId)
            columnFinish = project.columns.find(c => c.id === action.payload.finishColumnId)
            if (columnStart.id === columnFinish.id) return {...state}

            const indexOfObject = columnStart.tasks.findIndex(e => {
                if (e.id === action.payload.id) {
                    task = e;
                    return true
                }
                return false
            });
            columnStart.tasks.splice(indexOfObject, 1);
            columnFinish.tasks.push(task)
            localStorage.setItem("state", JSON.stringify({...state}))
            return {...state};

        case ActionType.AddTask:
            project = state.projects.find(p => p.id === action.payload.projectId)
            column = project.columns.find(c => c.id === action.payload.columnId)
            id = addLastId(state, ObjectName.TaskNumber)
            task = {
                id: id,
                taskNumber: id,
                title: action.payload.title,
                body: action.payload.body,
                dateCreated: Date.now(),
                dateDeadline: action.payload.dateDeadline,
                timeAtWork: 0,
                priority: action.payload.priority,
                status: action.payload.status,
                files: action.payload.files,
                completed: false,
                comments: [],
                subTasks: []
            };
            column.tasks.push(task)
            localStorage.setItem("state", JSON.stringify({...state}))
            return {...state};
        case ActionType.UpdateTask:
            project = state.projects.find(p => p.id === action.payload.projectId)
            column = project.columns.find(p => p.id === action.payload.columnId)
            task = column.tasks.find(p => p.id === action.payload.taskId)

            task.title = action.payload.title;
            task.body = action.payload.body;
            task.dateDeadline = action.payload.dateDeadline;
            task.priority = action.payload.priority;
            task.status = action.payload.status;
            task.files = action.payload.files;

            localStorage.setItem("state", JSON.stringify({...state}))
            return {...state};
        case ActionType.ToggleTaskCompleted:
            project = state.projects.find(p => p.id === action.payload.projectId)

            project.columns.map(c => {
                let res = c.tasks.find(t => t.id === action.payload.taskId)
                if (res) task = res
            })
            task.completed = !task.completed
            localStorage.setItem("state", JSON.stringify({...state}))
            return {...state};
        case ActionType.AddProject:
            project = {
                id: addLastId(state, ObjectName.Projects),
                name: action.payload.name,
                color: action.payload.color,
                columns: [
                    {id: 1, name: ColumnName.Queue, tasks: []},
                    {id: 2, name: ColumnName.Development, tasks: []},
                    {id: 3, name: ColumnName.Done, tasks: []}
                ]
            }
            localStorage.setItem("state", JSON.stringify({...state, projects: [...state.projects, project]}))
            return {...state, projects: [...state.projects, project]};
        case ActionType.TaskDragStart:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                taskDragStart: {columnId: action.payload.columnId, taskId: action.payload.taskId}
            }))
            return {...state, taskDragStart: {columnId: action.payload.columnId, taskId: action.payload.taskId}};

        case ActionType.AddComment:
            project = state.projects.find(p => p.id === action.payload.projectId)
            column = project.columns.find(p => p.id === action.payload.columnId)
            task = column.tasks.find(p => p.id === action.payload.taskId)
            if (action.payload.commentId === -1) {
                newComment = {
                    id: addLastId(state, ObjectName.Comments),
                    text: action.payload.comment,
                    comments: []
                }
                task.comments = [...task.comments, newComment]
            } else {
                comment = getComment(task.comments, action.payload.commentId)
                newComment = {
                    id: addLastId(state, ObjectName.Comments),
                    text: action.payload.comment,
                    comments: []
                }
                comment.comments = [...comment.comments, newComment]
            }

            localStorage.setItem("state", JSON.stringify({...state}))
            return {...state};
        case ActionType.DeleteTask:
            project = state.projects.find(p => p.id === action.payload.projectId)
            column = project.columns.find(p => p.id === action.payload.columnId)
            column.tasks = column.tasks.filter(e => {
                return e.id !== action.payload.taskId
            })

            localStorage.setItem("state", JSON.stringify({...state}))
            return {...state};
        default:
            return state;
    }
}

let getComment = (comments, id): IComment => {
    let comment: IComment
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === id) {
            comment = comments[i]
            break
        } else {
            let res = getComment(comments[i].comments, id)
            if (res !== undefined) {
                comment = res
                break
            }
        }
    }
    return comment
}
export const addProject = (name: string, color: string): IAddProject => ({
    type: ActionType.AddProject,
    payload: {name, color}
});

export const toggleTaskCompleted = (projectId, taskId): IToggleTaskCompleted => ({
    type: ActionType.ToggleTaskCompleted,
    payload: {projectId, taskId}
});

export const addTask = (projectId: number,
                        columnId: number,
                        title: string,
                        body: string,
                        dateDeadline: number,
                        priority: Priority,
                        status: Status,
                        files: string[]): IAddTask => ({
    type: ActionType.AddTask,
    payload: {projectId, columnId, title, body, dateDeadline, priority, status, files}
});

export const dropTask = (projectId: number, startColumnId: number, finishColumnId: number, id: number): IDropTask => ({
    type: ActionType.DropTask,
    payload: {projectId, startColumnId, finishColumnId, id}
});
export const taskDragStart = (columnId: number, taskId: number): ITaskDragStart => ({
    type: ActionType.TaskDragStart,
    payload: {columnId, taskId}
});
export const addComment = (projectId: number, columnId: number, taskId: number, commentId: number, comment: string): IAddComment => ({
    type: ActionType.AddComment,
    payload: {projectId, columnId, taskId, commentId, comment}
});

export const updateTask = (projectId: number,
                           columnId: number,
                           taskId: number,
                           title: string,
                           body: string,
                           dateDeadline: number,
                           priority: Priority,
                           status: Status,
                           files: string[]): IUpdateTask => ({
    type: ActionType.UpdateTask,
    payload: {projectId, columnId, taskId, title, body, dateDeadline, priority, status, files}

});


export const setState = (state_: string): ISetState => ({
    type: ActionType.SetState,
    payload: {state_}
});

export const deleteTask = (projectId: number, columnId: number, taskId: number): IDeleteTask => ({
    type: ActionType.DeleteTask,
    payload: {projectId, columnId, taskId}
});
