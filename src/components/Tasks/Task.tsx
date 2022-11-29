import React, {FC, useContext, useState} from 'react';
import {AppContext} from "../../state/context";
import {IColumn, IProject, ITask, Priority, Status} from "../../state/state";
import {addComment, deleteTask, toggleTaskCompleted, updateTask} from "../../state/reducer";
import TaskModal from "./TaskModal";
import Comments from "./Comments";

interface TaskProps {
    project: IProject
    column: IColumn
    task: ITask,
    onDragStart: Function
}

function dhm(ms) {
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    return "days: " + days + ", time: " + hours + ":" + minutes + ":" + sec;
}

const Task: FC<TaskProps> = ({project, column, task, onDragStart}) => {

    let [creatingModal, setCreatingModal] = useState<boolean>(false)

    let [taskIsOpened, setTaskIsOpened] = useState<boolean>(false)
    let changeChecked = () => {
        dispatch(toggleTaskCompleted(project.id, task.taskNumber))
    }
    let [updatingModal, setUpdatingModal] = useState<boolean>(false)

    let onSubmit = (title, body, dateDeadline, priority, status, files) => {
        dispatch(updateTask(project.id, column.id, task.id, title, body, dateDeadline, priority, status, files))
    }

    let createSubTask = (title, body, dateDeadline, priority, status, files) => {
        // dispatch(addTask(project.id, column.id, title, body, dateDeadline, priority, status, files))
    }
    let [commentOpened, setCommentOpened] = useState(false)
    let [text, setText] = useState('')

    let sendComment = () => {
        dispatch(addComment(project.id, column.id, task.id, -1, text))
    }
    let dateCreated = new Date(task.dateCreated).toString()
    let dateDeadline = new Date(task.dateDeadline).toString()
    let timeAtWork = dhm(Date.now() - task.dateCreated)
    const {state, dispatch} = useContext(AppContext);
    return (
        <div className={task.completed ? "task task_completed" : "task"}
             onDragStart={() => onDragStart(column.id, task.id)}
             draggable
        >
            {creatingModal && <TaskModal
                editMode={false}
                title=''
                body=''
                dateDeadline={0}
                files={[]}
                priority={Priority.Low}
                status={Status.NotStarted}
                onSubmit={createSubTask}
                toggleModal={() => setCreatingModal(false)}
            />}
            {updatingModal && <TaskModal
                editMode={true}
                title={task.title}
                body={task.body}
                dateDeadline={task.dateDeadline}
                files={task.files}
                priority={task.priority}
                status={task.status}
                onSubmit={onSubmit}
                toggleModal={() => setUpdatingModal(false)}
            />}
            <div className="main">
                <div className="main-left">
                    <input type="checkbox" checked={task.completed} onChange={changeChecked}/>
                    <div className="priority">
                        {task.priority === Priority.Low &&
                            <img src={require("../../images/priorityLow.png")} alt=""/>}
                        {task.priority === Priority.Medium &&
                            <img src={require("../../images/priorityMedium.png")} alt=""/>}
                        {task.priority === Priority.High &&
                            <img src={require("../../images/priorityHigh.png")} alt=""/>}
                    </div>
                    <div className="task-number">{task.taskNumber}</div>
                    <div className="task-title">{task.title}</div>
                </div>
                <div className="arrow" onClick={() => setTaskIsOpened(!taskIsOpened)}>
                    <i className={taskIsOpened ? 'buttonArrow buttonArrowDown' : 'buttonArrow'}/>
                </div>
            </div>
            {taskIsOpened && <div className="extra">
                <div className="body">Notes: {task.body}</div>
                <div className="date-created">Created: {dateCreated}</div>
                <div className="date-deadline">Deadline: {dateDeadline}</div>
                <div className="time-at-work">Time at work: {timeAtWork}</div>
                <div className="status">Status: {task.status}</div>
                <div className="comments">
                    <hr/>

                    <div>
                        <div className={"button"} onClick={() => {
                            setCommentOpened(!commentOpened)
                        }}>
                            reply
                        </div>
                        {commentOpened && <div><input
                            type="text"
                            value={text}
                            onChange={el => setText(el.target.value)}/>
                            <div className={"button"} onClick={() => sendComment()}>send</div>
                        </div>}
                    </div>
                    {task.comments.map(comment => {
                        return <Comments key={comment.id} project={project} column={column} task={task} comment={comment}/>
                    })}
                </div>
                <hr/>
                <div className="btn" onClick={() => setUpdatingModal(true)}>update</div>
                <div className="btn" onClick={()=>dispatch(deleteTask(project.id, column.id, task.id))}>delete</div>
            </div>
            }
        </div>
    );
};

export default Task;
