export interface IAppState {
    lastIds: ILastId[]
    taskDragStart: { columnId: number, taskId: number }
    projects: IProject[]
}

export enum ObjectName {
    Projects = "Projects",
    Comments = "Comments",
    TaskNumber = "TaskNumber"
}

export interface ILastId {
    name: ObjectName;
    lastId: number;
}

export interface IProject {
    id: number;
    name: string;
    color: string;
    columns: IColumn[]
}

export enum ColumnName {
    Queue = "Queue",
    Development = "Development",
    Done = "Done"
}

export interface IColumn {
    id: number;
    name: ColumnName;
    tasks: ITask[];
}

export interface IComment {
    id: number;
    text: string;
    comments: IComment[];
}

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export enum Status {
    NotStarted = 'Not Started',
    InProgress = 'In Progress',
    Finished = 'Finished',
}

export interface ISubTask {
    id: number;
    title: string;
    body: string;
    dateCreated: number;
    dateDeadline: number;
    timeAtWork: number;
    status: Status;
}

export interface ITask {
    id: number;
    taskNumber: number;
    title: string;
    body: string;
    dateCreated: number;
    dateDeadline: number;
    timeAtWork: number;
    priority: Priority;
    files: string[];
    status: Status;
    subTasks: ISubTask[]
    comments: IComment[],
    completed: boolean
}

export const initialAppState: IAppState = {
    lastIds: [{name: ObjectName.Projects, lastId: 2},
        {name: ObjectName.Comments, lastId: 10},
        {name: ObjectName.TaskNumber, lastId: 6},
    ],
    taskDragStart: {columnId: -1, taskId: -1},
    projects: [
        {
            id: 1, name: "zxc", color: "#999999", columns: [
                {
                    id: 1, name: ColumnName.Queue, tasks: [
                        {
                            id: 1,
                            taskNumber: 1,
                            title: "zz",
                            body: "zzz",
                            dateCreated: 1669675735613,
                            dateDeadline: 1669675735613,
                            timeAtWork: 123,
                            priority: Priority.Low,
                            files: [],
                            status: Status.Finished,
                            subTasks: [{
                                id: 16,
                                title: "zz",
                                body: "zzz",
                                dateCreated: 1234,
                                dateDeadline: 12345,
                                timeAtWork: 123,
                                status: Status.Finished,
                            }, {
                                id: 17,
                                title: "zz",
                                body: "zzz",
                                dateCreated: 1669675735613,
                                dateDeadline: 1669675735613,
                                timeAtWork: 123,
                                status: Status.Finished,
                            },],
                            comments: [],
                            completed: true
                        },
                        {
                            id: 2,
                            taskNumber: 2,
                            title: "zz",
                            body: "zzz",
                            dateCreated: 1669675735613,
                            dateDeadline: 1669675735613,
                            timeAtWork: 123,
                            priority: Priority.Low,
                            files: [],
                            status: Status.Finished,
                            subTasks: [],
                            comments: [],
                            completed: true
                        },
                        {
                            id: 3,
                            taskNumber: 3,
                            title: "zz",
                            body: "zzz",
                            dateCreated: 1669675735613,
                            dateDeadline: 1669675735613,
                            timeAtWork: 123,
                            priority: Priority.Low,
                            files: [],
                            status: Status.Finished,
                            subTasks: [],
                            comments: [],
                            completed: true
                        },
                        {
                            id: 4,
                            taskNumber: 4,
                            title: "asdasdadsas",
                            body: "zzz",
                            dateCreated: 1669675735613,
                            dateDeadline: 1669675735613,
                            timeAtWork: 123,
                            priority: Priority.Low,
                            files: [],
                            status: Status.Finished,
                            subTasks: [],
                            comments: [],
                            completed: true
                        },
                        {
                            id: 5,
                            taskNumber: 5,
                            title: "qweqwe",
                            body: "zzz",
                            dateCreated: 1669675735613,
                            dateDeadline: 1669675735613,
                            timeAtWork: 123,
                            priority: Priority.Low,
                            files: [],
                            status: Status.Finished,
                            subTasks: [],
                            comments: [],
                            completed: false
                        },
                        {
                            id: 6,
                            taskNumber: 6,
                            title: "zzzz",
                            body: "zzzzz",
                            dateCreated: 1669675735613,
                            dateDeadline: 1669675735613,
                            timeAtWork: 123,
                            priority: Priority.Low,
                            files: [],
                            status: Status.Finished,
                            subTasks: [],
                            comments: [
                                {
                                    id: 1, text: "comment)", comments: [
                                        {
                                            id: 3, text: "comment)", comments: [
                                                {
                                                    id: 4, text: "comment)", comments: [
                                                        {
                                                            id: 5, text: "comment)", comments: []
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: 7, text: "qweqwe", comments: [
                                                {
                                                    id: 8, text: "asdasd", comments: [
                                                        {
                                                            id: 9, text: "zzzzz", comments: []
                                                        }
                                                    ]
                                                },
                                                {id: 10, text: "zzzzz", comments: []}
                                            ]
                                        }
                                    ]
                                },
                                {id: 2, text: "zzzzz", comments: []},
                                {id: 6, text: "aaaa", comments: []},
                            ],
                            completed: false
                        }
                    ]
                },
                {id: 2, name: ColumnName.Development, tasks: []},
                {id: 3, name: ColumnName.Done, tasks: []}
            ]
        },
    ]
};



