import React, { MouseEvent } from "react";

type AcceptedProps ={
    gigId: number,
    gigFetch: ()=> void
}

type IndexState={
    content: string,
}

export default class UPostComment extends React.Component<AcceptedProps, IndexState>{
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
            <div>
                <hr />
                <label htmlFor="comment">New Comment:</label>
                <textarea name="comment" id="comment" onChange={(e)=>{this.setState({content: e.target.value})}}></textarea>
                <button onClick={(e) =>{this.CommentPost(e)}}>Send</button>
            </div>
        )
    }
}