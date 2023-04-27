import React, { FormEvent } from "react";
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
    width: 250%;
`
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
        fetch('http://localhost:8080/gig/new', {
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
                    <HeaderDiv>
                <BackButton onClick={this.props.modalPopup}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x"/></BackButton>
                <h3>New Gig</h3>
                    </HeaderDiv>
                </ModalHeader>
            <ModalBody>
            <Form onSubmit={this.postGig}>
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
                    <Input type='text' value={this.state.genre} placeholder='Classical, Jazz, Rock' onChange={(e) => this.setState({genre: Array(e.target.value)})} />
                </Item>               
                <Item>
                    <Label>Details</Label>
                    <TextArea name="details" id="details" required onChange={(e) =>this.setState({content: e.target.value})}/>
                </Item>
                <Button type='submit'>Post gig!</Button>
                </FlexDiv>
            </Form>
            </ModalBody>
            </Modal>
        )
    }

}