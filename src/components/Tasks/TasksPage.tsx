import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {AppContext} from "../../state/context";
import {Link, useParams} from "react-router-dom";
import TasksColumn from "./TasksColumn";
import {setState} from "../../state/reducer";


const TasksPage: FC = () => {
    const {state, dispatch} = useContext(AppContext);
    let id = useParams().id
    let project = state.projects.find(p => p.id.toString() === id)
    let [searchInputValue, setSearchInputValue] = useState('')
    let [searchValue, setSearchValue] = useState('')


    useEffect(() => {
        let store = localStorage.getItem("state")
        if (store) dispatch(setState(store))
    }, [])

    return (
        <div className="tasks-page">
            <div className="header">
                <Link className="project" to={`/`}>Projects</Link>

                <div className="search">
                    <input type="text"
                           value={searchInputValue}
                           onChange={el => setSearchInputValue(el.target.value)}/>
                    <div className="btn" onClick={() => setSearchValue(searchInputValue)}>search</div>
                </div>
            </div>

            <div className="columns">
                {project.columns.map(column => <TasksColumn searchValue={searchValue} project={project} column={column}
                                                            key={column.id}/>)}
            </div>
        </div>
    );
};

export default TasksPage;
