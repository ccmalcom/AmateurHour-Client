import React from "react";
import styled from 'styled-components';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import PostComment from "../comments/PostComment";

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
    gigFetch: ()=> void
}


const CommentTable = (props: AcceptedProps) => {

    const deleteComment = (commentId: number) =>{
        fetch(`https://ccm-amateurhour.herokuapp.com/comment/delete/${commentId}`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then(res=>console.log(res))
        .then(()=>{props.gigFetch()})
    }
    const commentMapper = () =>{
        return props.comments.map((comment, index) => {
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
                                <DropdownItem >Edit</DropdownItem>
                                <DropdownItem onClick={()=>{deleteComment(comment.id)}} >Delete </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </DropdownDiv> : null}
                    <p>{comment.posterName}</p>
                    <p>{comment.createdAt}</p>
                    <p>{comment.content}</p>
                </div>
            )
        })
    }
    
        return(
            <div>
                {commentMapper()}
            </div>
        )
    }


export default CommentTable;