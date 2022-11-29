import React, {FC, useContext, useState} from 'react';
import {IColumn, IComment, IProject, ITask} from "../../state/state";
import {AppContext} from "../../state/context";
import {addComment} from "../../state/reducer";

interface CommentsProps {
    project: IProject
    column: IColumn
    task: ITask
    comment: IComment,
}

const Comments: FC<CommentsProps> = ({project, column, task, comment}) => {
    let [commentOpened, setCommentOpened] = useState(false)
    let [text, setText] = useState('')
    const {state, dispatch} = useContext(AppContext);

    let sendComment = () => {
        dispatch(addComment(project.id, column.id, task.id, comment.id, text))
    }
    return (
        <div>
            <div style={{display: "flex"}}>
                <div className="text">{comment.id} {comment.text}</div>
                <div className={"button"} onClick={() => {
                    setCommentOpened(!commentOpened)
                }}>
                    reply
                </div>
            </div>
            {commentOpened && <div><input
                type="text"
                value={text}
                onChange={el => setText(el.target.value)}/>
                <div className={"button"} onClick={() => sendComment()}>send</div>
            </div>}
            <SubComments project={project} column={column} task={task} comment={comment} comments={comment.comments}/>
            <hr/>
        </div>
    )

};


interface SubCommentsProps {
    project: IProject
    column: IColumn
    task: ITask
    comment: IComment
    comments: IComment[],
}

const SubComments: FC<SubCommentsProps> = ({project, column, task, comment, comments}) => {
    return (
        <div>
            {comments.map(c => {
                return <SubComment key={c.id} project={project} column={column} task={task} comment={c} comments={c.comments}/>
            })}
        </div>
    );
};

interface SubCommentProps {
    project: IProject
    column: IColumn
    task: ITask
    comment: IComment
    comments: IComment[],
}

const SubComment: FC<SubCommentProps> = ({project, column, task, comment, comments}) => {
    let [commentOpened, setCommentOpened] = useState(false)
    let [text, setText] = useState('')
    const {state, dispatch} = useContext(AppContext);

    let sendComment = () => {
        dispatch(addComment(project.id, column.id, task.id, comment.id, text))
    }

    return <div style={{border: "1px solid black", marginLeft: `10px`}}>

        <div style={{display: "flex"}}>{comment.id} {comment.text}
            <div  className={"button"} onClick={() => {
                setCommentOpened(!commentOpened)
            }}>
                reply
            </div>
        </div>
        {commentOpened && <div><input
            type="text"
            value={text}
            onChange={el => setText(el.target.value)}/>
            <div className={"button"} onClick={() => sendComment()}>send</div>
        </div>}
        {
            comment.comments.length ? <div>
                <SubComments project={project} column={column} task={task} comment={comment}
                             comments={comment.comments} />
            </div> : null
        }
    </div>
}
export default Comments;
