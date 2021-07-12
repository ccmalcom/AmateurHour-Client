import React, { FormEvent } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

type PostState={
    title: string,
    location: string,
    size: number,
    instruments: Array<string>,
    genre: Array<string>,
    content: string
}

type AcceptedProps={
    modalPopup:()=> void,
    gigFetch: ()=> void
}

export default class PostGig extends React.Component<AcceptedProps, PostState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            title: '',
            location: '',
            size: 0,
            instruments: [''],
            genre: [''],
            content: ''
        }
        this.postGig = this.postGig.bind(this)
    }

    postGig(e: FormEvent){
        e.preventDefault()
        this.props.modalPopup()
        fetch('https://ccm-amateurhour.herokuapp.com/gig/new', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                location: this.state.location,
                size: this.state.size,
                instrument: this.state.instruments,
                genre: this.state.genre,
                content: this.state.content
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .then(this.props.gigFetch)
    }

    render(){
        return(
                <Modal isOpen={true}
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <ModalHeader>
                <button onClick={this.props.modalPopup}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x"/></button>
                <h3>Details</h3>
                </ModalHeader>
            <ModalBody>
            <Form onSubmit={this.postGig}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type='text' value={this.state.title} placeholder="let's make a ska band" onChange={(e) => this.setState({title: e.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <Label>Location</Label>
                    <Input type='text' value={this.state.location} placeholder='Indianapolis, IN' onChange={(e) => this.setState({location: e.target.value})} />
                </FormGroup>               
                <FormGroup>
                    <Label>Size</Label>
                    <Input type='number' value={this.state.size} placeholder='3' min='1' onChange={(e) => this.setState({size: Number(e.target.value)})} />
                </FormGroup>               
                <FormGroup>
                    <Label>Instruments</Label>
                    <Input type='text' value={this.state.instruments} placeholder='Trumpet, Tuba' onChange={(e) => this.setState({instruments: Array(e.target.value)})} />
                </FormGroup>               
                <FormGroup>
                    <Label>Genre</Label>
                    <Input type='text' value={this.state.genre} placeholder='Classical, Jazz, Rock' onChange={(e) => this.setState({genre: Array(e.target.value)})} />
                </FormGroup>               
                <FormGroup>
                    <Label>Details</Label>
                    <textarea name="details" id="details" onChange={(e) =>this.setState({content: e.target.value})}/>
                </FormGroup>
                <Button type='submit'>Post gig!</Button>
            </Form>
            </ModalBody>
            </Modal>
        )
    }

}