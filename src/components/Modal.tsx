import React, {FC} from 'react';
interface ModalProps {
    closeModal: Function
    children: React.ReactNode
}
const Modal: FC<ModalProps> = ({closeModal, children}) => {
    let close = (e): void => {
        if (e.target.className === "global" ||
            e.target.className === "modal-content__wrapper") {
            closeModal()
        }
    }
    return (
        <div className="modal">
            <div className="global" onClick={(e) => close(e)}></div>
            <div className="modal-content__wrapper" onClick={(e) => close(e)}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Modal;
