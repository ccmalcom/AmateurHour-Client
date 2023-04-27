import React from "react";
import { Modal, ModalHeader, ModalBody, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

type AcceptedProps = {
    deleteModal: ()=> void,
    showProfile: ()=> void,
    fetchPeople: ()=> void,
    userId: number
}
const AdminDeleteUser = (props: AcceptedProps) => {

    const deleteUser = () => {
        fetch(`http://localhost:8080/user/delete/${props.userId}/admin`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
            .then(res => console.log(res))
            .then(()=>{props.fetchPeople()})
            .then(()=>{props.showProfile()})
    }

    return (
        <div>
            <Modal isOpen={true}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader>
                    <button onClick={props.deleteModal}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" /></button>
                    <h3>Delete Profile</h3>
                </ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this user?</p>
                    <button onClick={deleteUser}>Yes</button>
                    <button onClick={props.deleteModal}>Cancel</button>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AdminDeleteUser;