import React, {FC, useContext, useState} from 'react';
import {AppContext} from "../../state/context";
import {IColumn, IProject, ITask, Priority, Status} from "../../state/state";
import Task from "./Task";
import TaskModal from "./TaskModal";
import {addTask, dropTask, taskDragStart} from "../../state/reducer";

interface TasksColumnProps {
    project: IProject
    column: IColumn,
    searchValue: string
}

const TasksColumn: FC<TasksColumnProps> = ({project, column, searchValue}) => {
    const {state, dispatch} = useContext(AppContext);

    let [creatingModal, setCreatingModal] = useState<boolean>(false)

    let isAnyCompleted = !!column.tasks.find(e => e.completed)

    let onSubmit = (title, body, dateDeadline, priority, status, files) => {
        dispatch(addTask(project.id, column.id, title, body, dateDeadline, priority, status, files))
    }

    let onDragStart = (columnId, taskId) => {
        dispatch(taskDragStart(columnId, taskId))
        dispatch(taskDragStart(columnId, taskId))
    }

    let onDragOver = (ev) => {
        ev.preventDefault();
    }

    let onDrop = () => {
        dispatch(dropTask(project.id, state.taskDragStart.columnId, column.id, state.taskDragStart.taskId))
    }

    let isSearchTrue = (task: ITask) => {
        return !!(task.title.toLowerCase().includes(searchValue.toLowerCase()) || task.id.toString() === searchValue);

    }

    return (
        <div className="column"
             onDragOver={(e) => onDragOver(e)}
             onDrop={() => {
                 onDrop()
             }}
        >
            {creatingModal && <TaskModal
                editMode={false}
                title=''
                body=''
                dateDeadline={0}
                files={[]}
                priority={Priority.Low}
                status={Status.NotStarted}
                onSubmit={onSubmit}
                toggleModal={() => setCreatingModal(false)}
            />}
            <div className="column__title">{column.name}</div>
            <div className="create-task" onClick={() => setCreatingModal(true)}>
                create task
            </div>
            <div className="uncompleted">
                {column.tasks.map(task => <div key={task.id}>
                        {!task.completed && isSearchTrue(task) && <Task onDragStart={onDragStart} column={column} task={task} project={project}/>}
                    </div>
                )}
            </div>
            {isAnyCompleted && <div className="completed">
                <div className="completed__title">completed tasks</div>
                {column.tasks.map(task => <div key={task.id}>
                        {task.completed && isSearchTrue(task) && <Task onDragStart={onDragStart} column={column} task={task} project={project}/>}
                    </div>
                )}
            </div>}
        </div>
    );
};

export default TasksColumn;
