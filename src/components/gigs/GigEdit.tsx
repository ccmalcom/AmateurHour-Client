import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

type EditState ={
    title: string,
    location: string,
    size: number,
    instruments: Array<string>,
    genre: Array<string>,
    content: string
}

type AcceptedProps={
    editModal: () => void,
    gigToEdit: {
        id: number;
        location: string;
        title: string;
        instrument: Array<string>;
        genre: Array<string>;
        size: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        posterName: string,
        userId: number;}
    gigFetch: () => void
}

export default class GigEdit extends React.Component<AcceptedProps, EditState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            title: props.gigToEdit.title,
            location: props.gigToEdit.location,
            size: props.gigToEdit.size,
            instruments: props.gigToEdit.instrument,
            genre: props.gigToEdit.genre,
            content: props.gigToEdit.content
        }
        this.gigUpdate = this.gigUpdate.bind(this)
    }

    gigUpdate(e: any){
        e.preventDefault()
        this.props.editModal()
        fetch(`https://ccm-amateurhour.herokuapp.com/gig/edit/${this.props.gigToEdit.id}`,{
            method: 'PUT',
            body: JSON.stringify({
                title: this.state.title,
                location: this.state.location,
                size: this.state.size,
                instruments: this.state.instruments,
                genre: this.state.genre,
                content: this.state.content
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then(res => console.log(res))
        .then(()=>{this.props.gigFetch()})
        .catch(err => console.log(err))
    }

    onChangeMulti = (e: any) => {
        let opts = [], opt;
        for (let i = 0, len = e.target.options.length; i < len; i++) {
            opt = e.target.options[i];
            if (opt.selected) {
                opts.push(opt.value);
            }
        }
        this.setState({ genre: opts });
    }

    render(){
        return(
            <div>
            <Modal isOpen={true}
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <ModalHeader>
                <button onClick={this.props.editModal}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x"/></button>
                <h3>Edit Gig</h3>
                </ModalHeader>
            <ModalBody>
            <Form onSubmit={this.gigUpdate}>
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
                    <select multiple value={this.state.genre} onChange={(e) =>{this.onChangeMulti(e)}}>
                        <option value="Jazz">Jazz</option>
                        <option value="Classical">Classical</option>
                    </select>
                </FormGroup>               
                <FormGroup>
                    <Label>Details</Label>
                    <textarea name="details" id="details" onChange={(e) =>this.setState({content: e.target.value})}>{this.props.gigToEdit.content}</textarea>
                </FormGroup>
                <Button type='submit'>Post gig!</Button>
            </Form>
            </ModalBody>
            </Modal>
        </div>
        )
    }
}