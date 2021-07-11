import React from "react";
import styled from 'styled-components';
import Comment from "./Comment";
import PostComment from "../comments/PostComment";

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

const CommentTable=(props: AcceptedProps)=>{
    

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
            return <Comment gigId={props.gigId} comment={comment} deleteComment={deleteComment} gigFetch={props.gigFetch}/>
        })
    }
    
        
        return(
            <div>
                {props.comments.length > 0 ?
                <div>{commentMapper()}</div> : 'No Comments'
                }
                {localStorage.role !== 'Test' ?  
                <PostComment gigId={props.gigId} gigFetch={props.gigFetch} />
                : null}
            </div>
        )
    }


export default CommentTable;