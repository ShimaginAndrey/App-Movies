import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoginModalAction } from "../../../redux/auth/auth.actions";
import { Modal, ModalBody} from 'reactstrap';
import { LocalStorage } from "../../../utils/LocalStorage";

import LoginForm from "./LoginForm";

const Login = (props) => {
    const {showModal} = props;
    const dispath = useDispatch();
    const session_id = LocalStorage.getItem('session_id');

    useEffect(() => {
        if(!session_id) dispath(toggleLoginModalAction());
    }, []);

    const toggleModal = () => {
        dispath(toggleLoginModalAction());
    };

    return (
        <div>
            <button
                className="btn btn-success"
                type="button"
                onClick={toggleModal}
            >
            Login
            </button>
            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalBody> 
                    <LoginForm />
                </ModalBody>
            </Modal>
        </div>
    )
};

export default Login;