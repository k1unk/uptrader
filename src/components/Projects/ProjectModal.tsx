import React, {FC, useState} from 'react';
import Modal from "../Modal";

interface ProjectModalProps {
    editMode: boolean
    inputValue: string
    selectedColor: string
    onSubmit: Function
    toggleModal: Function
}
const ProjectModal: FC<ProjectModalProps> = ({
                          editMode,
                          inputValue,
                          selectedColor,
                          onSubmit,
                          toggleModal
                      }) => {
    const [inputName, setInputName] = useState(inputValue);

    let [selectedColor2, setSelectedColor] = useState(selectedColor)

    let colors = ["#afffee", "#5ad6ff", "#f8ffa1", "#ffb8de", "white"]
    let getColorClassName = (color) => {
        if (color === selectedColor2) return "color color_selected"
        return "color"
    }

    let submit = () => {
        onSubmit(inputName, selectedColor2)
        toggleModal(false)
        setInputName('')
        setSelectedColor("#afffee")
    }
    return (
        <Modal closeModal={() => toggleModal(false)}>
            <div className="profile-modal">
                <form>
                    <label htmlFor="profile-name">Name: </label>
                    <input
                        id="profile-name"
                        type="text"
                        value={inputName}
                        onChange={el => setInputName(el.target.value)}
                    />
                </form>
                <div className="colorSelect">
                    <div className="text">Select color:</div>
                    {colors.map(color =>
                        <div
                            style={{backgroundColor: color}}
                            className={getColorClassName(color)}
                            key={color}
                            onClick={() => setSelectedColor(color)}
                        >
                        </div>
                    )}
                </div>
                <div className="modal__button" onClick={() => submit()}>{editMode ? "Edit" : "Create"}</div>
            </div>
        </Modal>
    );
};

export default ProjectModal;
