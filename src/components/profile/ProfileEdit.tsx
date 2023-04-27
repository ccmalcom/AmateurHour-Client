import React, { FormEvent } from 'react';
import { Form, Label, Input, Modal, ModalHeader, ModalBody, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto
`
const Item = styled.div`
    width: 100%
`
const TextArea = styled.textarea`
    width: 100%
`
const Button = styled.button`
    background-color: #FF9f1c;
    padding: 10px 20px;
    width: 100%;
    border-radius: 30px;
    border: none;
    margin: 10px;
    color: white
`

const BackButton = styled.button`
    border: none;
    color: #891A1C
`
const HeaderDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 220%;
`

type EditState = {
    firstName: string,
    lastName: string,
    emailAddress: string,
    zipCode: number,
    instrument: Array<string>,
    genre: Array<string>,
    bio: string,
    socialLinks: Array<string>
}

type AcceptedProps = {
    editModal: () => void,
    userData: {
        id: number,
        firstName: string,
        lastName: string,
        emailAddress: string,
        zipCode: number,
        instrument: Array<string>,
        genre: Array<string>,
        bio: string,
        socialLinks: Array<string>,
    }
    userFetch: () => void
}

export default class ProfileEdit extends React.Component<AcceptedProps, EditState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            firstName: props.userData.firstName,
            lastName: props.userData.lastName,
            emailAddress: props.userData.emailAddress,
            zipCode: props.userData.zipCode,
            genre: props.userData.genre,
            instrument: props.userData.instrument,
            bio: props.userData.bio,
            socialLinks: props.userData.socialLinks
        }
        this.profileUpdate = this.profileUpdate.bind(this)
    }

    profileUpdate(e: FormEvent) {
        e.preventDefault()
        this.props.editModal()
        fetch(`http://localhost:8080/user/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                zipCode: this.state.zipCode,
                genre: this.state.genre,
                instrument: this.state.instrument,
                bio: this.state.bio,
                socialLinks: this.state.socialLinks
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
            .then(res => console.log(res))
            .then(() => { this.props.userFetch() })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Modal isOpen={true}
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader>
                        <HeaderDiv>
                        <BackButton onClick={this.props.editModal}><FontAwesomeIcon icon={faArrowAltCircleLeft} 
                        size="3x" /></BackButton>
                        <h3>Edit Profile</h3>
                        </HeaderDiv>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.profileUpdate}>
                            <FlexDiv>

                            <Item>
                                <Label>First Name</Label>
                                <Input type='text' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                            </Item>
                            <Item>
                                <Label>Last Name</Label>
                                <Input type='text' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                            </Item>
                            <Item>
                                <Label>Email</Label>
                                <Input type='email' value={this.state.emailAddress} onChange={(e) => this.setState({ emailAddress: e.target.value })} />
                            </Item>
                            <Item>
                                <Label>Zipcode</Label>
                                <Input type='text' value={this.state.zipCode} onChange={(e) => this.setState({ zipCode: Number(e.target.value) })} />
                            </Item>
                            <Item>
                                <Label>Instrument(s)</Label>
                                <Input type='text' value={this.state.instrument} placeholder='Trumpet, Tuba' onChange={(e) => this.setState({ instrument: Array(e.target.value) })} />
                            </Item>
                            <Item>
                                <Label>Genre(s)</Label>
                                <Input type='text' value={this.state.genre} placeholder='Trumpet, Tuba' onChange={(e) => this.setState({ genre: Array(e.target.value) })} />
                            </Item>
                            <Item>
                                <Label>Social Links</Label>
                                <Input type='text' value={this.state.socialLinks} placeholder='https://twitter.com/johndoe' onChange={(e) => this.setState({ socialLinks: Array(e.target.value) })} />
                            </Item>
                            <Item>
                                <Label>Bio</Label>
                                <TextArea name="bio" id="bio" onChange={(e) => this.setState({ bio: e.target.value })}>{this.props.userData.bio}</TextArea>
                            </Item>

                            <Button type='submit'>Update</Button>
                            </FlexDiv>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}