import React from "react";
import { Modal, ModalHeader, ModalBody, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Button1 = styled.div`
    background-color: #FF9f1c;
    padding: 10px;
    border-radius: 30px;
    border: 1px solid black;
    width: 100%;
    text-align: center
    `
    const Button2 = styled.div`
    background-color: #891A1C;
    padding: 10px;
    border-radius: 30px;
    border: 1px solid black;
    color: white;
    width: 100%;
    text-align: center
`

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center
`
const ButtonDiv = styled.div`
    display: flex;
    width: 55%;
    margin: 20px auto 0;
    justify-content: space-between    
`


type AcceptedProps = {
    deleteModal: ()=> void,
    clearSession: ()=>void
}
const DeleteUser = (props: AcceptedProps) => {

    const deleteUser = () => {
        fetch(`https://ccm-amateurhour.herokuapp.com/user/delete/`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
            .then(res => console.log(res))
            .then(()=>{props.clearSession()})
    }

    return (
        <div>
            <Modal isOpen={true}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader style={{display: 'flex', justifyContent: 'center'}}>
                    <h3>Delete Profile</h3>
                </ModalHeader>
                <ModalBody>
                    <FlexDiv>

                    <p>We're sad to see you go. This action is permanant and will delete your profile, gigs, and comments. Please verify below that you want to delete.</p>
                    <ButtonDiv>

                    <Button1 onClick={props.deleteModal}>Cancel</Button1>
                    <Button2 onClick={deleteUser}>Delete</Button2>
                    </ButtonDiv>
                    </FlexDiv>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default DeleteUser;