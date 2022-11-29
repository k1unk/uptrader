import React, {FC, useState} from 'react';
import Modal from "../Modal";
import Up from "../Up";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import {Priority, Status} from "../../state/state";

interface TaskModalProps {
    editMode: boolean
    title: string
    body: string
    dateDeadline: number
    priority: Priority
    files: string[] | []
    status: Status
    onSubmit: Function
    toggleModal: Function
}

const TaskModal: FC<TaskModalProps> = ({
                                           editMode,
                                           title,
                                           body,
                                           dateDeadline,
                                           priority,
                                           files,
                                           status,
                                           onSubmit,
                                           toggleModal
                                       }) => {
    const [inputTitle, setInputTitle] = useState(title);
    const [inputBody, setInputBody] = useState(body);
    const [inputDateDeadline, setInputDateDeadline] = useState(new Date().getTime());
    const [inputPriority, setInputPriority] = useState<Priority>(priority)
    let priorities = Object.values(Priority)
    const [inputStatus, setInputStatus] = useState<Status>(status)
    let [inputFiles, setInputFiles] = useState<string[]>([])
    let statuses = Object.values(Status)

    async function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            setInputFiles([...inputFiles, JSON.stringify(reader.result)])
            return reader.result
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        return reader.result
    }

    let submit = () => {
        onSubmit(inputTitle, inputBody, inputDateDeadline, inputPriority, inputStatus, inputFiles)
        toggleModal(false)
        setInputTitle('')
        setInputBody('')
        setInputDateDeadline(new Date().getTime())
        setInputPriority(Priority.Low)
        setInputStatus(Status.NotStarted)
        setInputFiles([])
    }


    return (
        <Modal closeModal={() => toggleModal(false)}>
            <div className="task-modal">
                <form>
                    <label htmlFor="title">Title: </label>
                    <input
                        id="title"
                        type="text"
                        value={inputTitle}
                        onChange={el => setInputTitle(el.target.value)}
                    />
                </form>
                <form>
                    <label htmlFor="body">Body: </label>
                    <input
                        id="body"
                        type="text"
                        value={inputBody}
                        onChange={el => setInputBody(el.target.value)}
                    />
                </form>
                <div className="date">
                    <div>Deadline:</div>
                    <DatePicker selected={inputDateDeadline} onChange={(date) => setInputDateDeadline(new Date(date).getTime())}/>
                </div>
                <div className="priority">
                    <div className="text">Priority:</div>
                    <div className="icons">
                        {priorities.map(p =>
                            <div
                                key={p}
                                className={inputPriority === p ? "icon icon_selected" : "icon"}
                                onClick={() => setInputPriority(p)}
                            >
                                <img src={require(`./../../images/priority${p}.png`)} alt=""/>
                            </div>)}
                    </div>
                </div>
                <div className="status">
                    <div className="text">Status</div>
                    <div className="status__values">
                        {statuses.map(s =>
                            <div
                                key={s}
                                className={inputStatus === s ? "status__value status__value_selected" : "status__value"}
                                onClick={() => setInputStatus(s)}
                            >
                                {s}
                            </div>)}
                    </div>
                </div>
                <Up f={getBase64}/>
                <div className="modal__button" onClick={() => submit()}>{editMode ? "Edit" : "Create"}</div>
            </div>
        </Modal>
    );
};

export default TaskModal;
