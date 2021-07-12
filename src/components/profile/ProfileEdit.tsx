import React, { FormEvent } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

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
        fetch(`https://ccm-amateurhour.herokuapp.com/user/edit`, {
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
                        <button onClick={this.props.editModal}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" /></button>
                        <h3>Edit Profile</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.profileUpdate}>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type='text' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type='text' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type='email' value={this.state.emailAddress} onChange={(e) => this.setState({ emailAddress: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Zipcode</Label>
                                <Input type='text' value={this.state.zipCode} onChange={(e) => this.setState({ zipCode: Number(e.target.value) })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Instrument(s)</Label>
                                <Input type='text' value={this.state.instrument} placeholder='Trumpet, Tuba' onChange={(e) => this.setState({ instrument: Array(e.target.value) })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Genre(s)</Label>
                                <Input type='text' value={this.state.genre} placeholder='Trumpet, Tuba' onChange={(e) => this.setState({ genre: Array(e.target.value) })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Bio</Label>
                                <textarea name="bio" id="bio" onChange={(e) => this.setState({ bio: e.target.value })}>{this.props.userData.bio}</textarea>
                            </FormGroup>
                            <FormGroup>
                                <Label>Social Links</Label>
                                <Input type='text' value={this.state.socialLinks} placeholder='https://twitter.com/johndoe' onChange={(e) => this.setState({ socialLinks: Array(e.target.value) })} />
                            </FormGroup>

                            <Button type='submit'>Update</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}