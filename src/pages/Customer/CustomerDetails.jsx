import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import './CustomerDetails.css'


const CustomerDetails = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal de Adicionar Usuário"
                ariaHideApp={false}
                className="modal-content"
            >
                <h2>Adicionar novo usuário</h2>
                <button onClick={closeModal} className="close">
                    <FontAwesomeIcon icon={faSquareXmark} />
                </button>
                <div>Eu sou um modal</div>
            </Modal>
        </div>
    )
}

export default CustomerDetails