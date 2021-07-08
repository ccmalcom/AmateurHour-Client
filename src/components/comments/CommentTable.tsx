import React from "react";
import styled from 'styled-components';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import PostComment from "../comments/PostComment";
import CommentEdit from "./CommentEdit";

const DropdownDiv = styled.div`
    display: flex;
    justify-content: flex-end
`

type AcceptedProps={
    comments: [
        {
            id: number,
            content: string,
            userId: number,
            gigId: number,
            posterName: string,
            createdAt: string
        }],
    gigFetch: ()=> void,
    gigId: number
}

type TableState={
    editOn: boolean
}

class CommentTable extends React.Component <AcceptedProps, TableState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            editOn: false
        }
        this.editDisplay = this.editDisplay.bind(this)
    }
    
    editDisplay(){
        this.setState((state)=>{return{editOn: !state.editOn}})
    }

    deleteComment = (commentId: number) =>{
        fetch(`https://ccm-amateurhour.herokuapp.com/comment/delete/${commentId}`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then(res=>console.log(res))
        .then(()=>{this.props.gigFetch()})
    }
    commentMapper = () =>{
        return this.props.comments.map((comment, index) => {
            return (
                <div>
                    <hr />
                    {localStorage.userId == comment.userId ? <DropdownDiv>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Options</DropdownItem>
                                <DropdownItem onClick={()=>{this.editDisplay()}} >Edit</DropdownItem>
                                <DropdownItem onClick={()=>{this.deleteComment(comment.id)}} >Delete </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </DropdownDiv> : null}
                    
                    {this.state.editOn ? <CommentEdit gigFetch={this.props.gigFetch}comment={comment} editDisplay={this.editDisplay}/> : null}
                    <p>{comment.posterName}</p>
                    <p>{comment.createdAt}</p>
                    <p>{comment.content}</p>
                </div>
            )
        })
    }
    
    render(){
        
        return(
            <div>
                {this.commentMapper()}
                <PostComment gigId={this.props.gigId} gigFetch={this.props.gigFetch} />
            </div>
        )
    }
    }


export default CommentTable;