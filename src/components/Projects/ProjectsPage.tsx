import React, {FC, useContext, useEffect, useState} from 'react';
import {addProject, setState} from "../../state/reducer";
import Project from "./Project";
import ProjectModal from "./ProjectModal";
import {AppContext} from "../../state/context";

const ProjectsPage: FC = () => {
    const {state, dispatch} = useContext(AppContext);
    useEffect(()=>{
        let store = localStorage.getItem("state")
        if (store) dispatch(setState(store))
    },[])
    let createProject = (name: string, color: string): void => {
        dispatch(addProject(name, color))
    }

    let [creatingModal, setCreatingModal] = useState<boolean>(false)

    return (
        <div className="projects-page">
            <div className="projects-wrapper">
                {creatingModal && <ProjectModal
                    editMode={false}
                    inputValue=''
                    selectedColor=''
                    onSubmit={createProject}
                    toggleModal={() => setCreatingModal(false)}
                />}
                <div className="create-button" onClick={() => setCreatingModal(true)}>Create project</div>
                {!state.projects.length && <div className="no-projects">You have no projects yet</div>}
                {state.projects.length && <div className="projects">
                    {state.projects.map(project => {
                            return <  Project project={project} key={project.id}/>
                        }
                    )}
                </div>}
            </div>

        </div>
    );
};

export default ProjectsPage;
