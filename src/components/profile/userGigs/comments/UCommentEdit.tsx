import React from 'react';


type AcceptedProps ={
    comment: {
        content: string,
        id: number
    },
    editDisplay: ()=> void,
    gigFetch: ()=> void
}

type EditState={
    content: string
}

export default class UCommentEdit extends React.Component<AcceptedProps, EditState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            content: ''
        }
    }


    commentUpdate(e: any){
        e.preventDefault()
        fetch(`https://ccm-amateurhour.herokuapp.com/comment/edit/${this.props.comment.id}`,{
            method: 'PUT',
            body: JSON.stringify({
                content: this.state.content
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then(res=> console.log(res))
        .then(this.props.gigFetch)
        .then(this.props.editDisplay)
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <label htmlFor="edit">Edit Comment:</label>
                <textarea name='edit'  onChange={(e)=>{this.setState({content: e.target.value})}}>{this.props.comment.content}</textarea>
                <button onClick={(e)=>{this.commentUpdate(e)}}>Submit</button>
                <button onClick={this.props.editDisplay}>Cancel</button>
            </div>
        )
    }


}