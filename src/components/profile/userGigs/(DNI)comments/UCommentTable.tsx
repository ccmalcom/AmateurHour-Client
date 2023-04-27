import React from "react";
import styled from 'styled-components';
import UComment from "./UComment";
import UPostComment from "./UPostComment";

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


const CommentTable=(props: AcceptedProps)=>{
    

    const deleteComment = (commentId: number) =>{
        fetch(`http://localhost:8080/comment/delete/${commentId}`,{
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
            return <UComment comment={comment} deleteComment={deleteComment} gigFetch={props.gigFetch} gigId={props.gigId}/>
        })
    }
    
        
        return(
            <div>
                {props.comments.length > 0 ?
                <div>{commentMapper()}</div> : 'No Comments'
                }
                {localStorage.role !== 'Test' ?  
                <UPostComment gigId={props.gigId} gigFetch={props.gigFetch} />
                : null}
            </div>
        )
    }


export default CommentTable;