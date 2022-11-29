import React, {FC, useState} from 'react';
import {IProject} from "../../state/state";
import {Link} from "react-router-dom";

function hexToRGBDarker(hex) {
    let kf = 0.85
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)
    return "rgb(" + r * kf + ", " + g * kf + ", " + b * kf + ")";
}

interface ProjectProps {
    project: IProject
}

const Project: FC<ProjectProps> = ({project}) => {
    let [color, setColor] = useState(project.color)
    let mouseEntered = () => {
        setColor(hexToRGBDarker(project.color))
    }
    let mouseLeaved = () => {
        setColor(project.color)
    }

    return (
        <Link
            className="project"
            style={{backgroundColor: color}}
            onMouseEnter={() => mouseEntered()}
            onMouseLeave={() => mouseLeaved()}
            to={`/projects/${project.id}`}
        >
            <div className="name">{project.name}</div>
        </Link>
    );
};

export default Project;
