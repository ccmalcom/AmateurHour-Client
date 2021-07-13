import React, { MouseEvent } from "react";
import styled from 'styled-components';

const MainDiv = styled.div`
    height: fit-content;
    padding: 10px
`

const InputDiv = styled.div`
    height: 54px;
    width: 100%;
    display: flex;
    justify-content: center
`
const Button = styled.button`
    background-color: #891A1C;
    color: white
`

type AcceptedProps ={
    gigId: number,
    gigFetch: ()=> void
}

type IndexState={
    content: string,
}

export default class PostComment extends React.Component<AcceptedProps, IndexState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            content: '',
        }
    }

    CommentPost(e: MouseEvent){
        e.preventDefault()
        fetch(`https://ccm-amateurhour.herokuapp.com/comment/new`, {
            method: 'POST',
            body: JSON.stringify({
                content: this.state.content,
                gigId: this.props.gigId
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
            <MainDiv>
                <hr />
                <label htmlFor="comment">New Comment:</label>
                <InputDiv>
                <textarea name="comment" id="comment" onChange={(e)=>{this.setState({content: e.target.value})}}></textarea>
                <Button onClick={(e) =>{this.CommentPost(e)}}>Send</Button>
                </InputDiv>
            </MainDiv>
        )
    }
}