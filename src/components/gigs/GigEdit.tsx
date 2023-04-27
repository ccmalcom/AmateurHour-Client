import React, { FormEvent } from 'react';
import { Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";
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
    width: 250%;
`

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

    gigUpdate(e: FormEvent){
        e.preventDefault()
        this.props.editModal()
        fetch(`http://localhost:8080/gig/edit/${this.props.gigToEdit.id}`,{
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
                    <HeaderDiv>
                <BackButton onClick={this.props.editModal}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x"/></BackButton>
                <h3>Edit Gig</h3>
                    </HeaderDiv>
                </ModalHeader>
            <ModalBody>
            <Form onSubmit={this.gigUpdate}>
                <FlexDiv>

            <Item>
                    <Label>Title</Label>
                    <Input type='text' value={this.state.title} placeholder="let's make a ska band" onChange={(e) => this.setState({title: e.target.value})}/>
                </Item>
                <Item>
                    <Label>Location</Label>
                    <Input type='text' value={this.state.location} placeholder='Indianapolis, IN' onChange={(e) => this.setState({location: e.target.value})} />
                </Item>               
                <Item>
                    <Label>Size</Label>
                    <Input type='number' value={this.state.size} placeholder='3' min='1' onChange={(e) => this.setState({size: Number(e.target.value)})} />
                </Item>               
                <Item>
                    <Label>Instruments</Label>
                    <Input type='text' value={this.state.instruments} placeholder='Trumpet, Tuba' onChange={(e) => this.setState({instruments: Array(e.target.value)})} />
                </Item>               
                <Item>
                    <Label>Genre</Label>
                    <Input type='text' value={this.state.genre} placeholder='Rock, Jazz' onChange={(e) => this.setState({genre: Array(e.target.value)})} />
                </Item>               
                <Item>
                    <Label>Details</Label>
                    <TextArea name="details" id="details" onChange={(e) =>this.setState({content: e.target.value})}>{this.props.gigToEdit.content}</TextArea>
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