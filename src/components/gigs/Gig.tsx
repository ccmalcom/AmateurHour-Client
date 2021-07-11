import React from "react";
import styled from 'styled-components';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import PostComment from "../comments/PostComment";
import CommentTable from "../comments/CommentTable";

const ThisGig = styled.div`
    border: 1px solid black;
    margin: 20px 0;
    background-color: white;
    height: fit-content
`
const PostData = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: fit-content;
`

const DropdownDiv = styled.div`
    display: flex;
    justify-content: flex-end
`

type AcceptedProps={
    gig: {
        id: number;
        location: string;
        title: string;
        instrument: Array<string>;
        genre: Array<string>;
        size: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        userId: number;
        posterName: string;
        comments: [  {
            id: number,
            content: string,
            userId: number,
            gigId: number,
            posterName: string,
            createdAt: string
        }]
    },
    index: number,
    gigFetch: () => void,
    gigToEdit: (gig: {
        id: number;
        location: string;
        title: string;
        instrument: Array<string>;
        genre: Array<string>;
        size: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        userId: number;
        posterName: string
    }) => void,
    editModal: () => void
}

type GigState={
    viewComment: boolean

}


export default class Gig extends React.Component<AcceptedProps, GigState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            viewComment: false,
        }
        this.viewCommentToggle = this.viewCommentToggle.bind(this)
    }

    deleteGig = (gig: number) => {
        fetch(`https://ccm-amateurhour.herokuapp.com/gig/delete/${gig}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
            .then(res => console.log(res))
            .then(() => this.props.gigFetch())
    }
    adminDeleteGig = (gig: number) => {
        fetch(`https://ccm-amateurhour.herokuapp.com/gig/delete/${gig}/admin`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
            .then(res => console.log(res))
            .then(() => this.props.gigFetch())
    }

    viewCommentToggle(){
        this.setState((state)=>{return{viewComment: !state.viewComment}})
    }
    render(){
        return (
            <ThisGig key={this.props.index}>
                <DropdownDiv>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Options</DropdownItem>
                            {localStorage.userId == this.props.gig.userId ? <DropdownItem onClick={() => { this.props.gigToEdit(this.props.gig); this.props.editModal() }}>Edit Gig</DropdownItem> : null}
                            {localStorage.role === 'Admin' ? <DropdownItem onClick={() => { this.props.gigToEdit(this.props.gig); this.props.editModal() }}>Edit Gig</DropdownItem> : null}
                            {localStorage.userId == this.props.gig.userId ? <DropdownItem onClick={() => { this.deleteGig(this.props.gig.id) }}>Delete Gig</DropdownItem> : null}
                            {localStorage.role === 'Admin' ? <DropdownItem onClick={() => { this.adminDeleteGig(this.props.gig.id) }}>Delete Gig</DropdownItem> : null}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </DropdownDiv>
                <PostData>
                    <div>
                        <h3>{this.props.gig.posterName}</h3>
                        <h3>{this.props.gig.title}</h3>
                        <h5>{this.props.gig.location}</h5>
                    </div>
                    <div>
                        <h5>{this.props.gig.size}</h5>
                        <h5>{this.props.gig.instrument}</h5>
                        <h5>{this.props.gig.genre}</h5>
                    </div>
                    <div>
                        <p>{this.props.gig.content}</p>
                    </div>
                </PostData>
                <footer>
                    <div>
                        <p>Likes</p>
                        <p >Comments: {this.props.gig.comments.length}</p>
                    </div>
                    <div>
                        <button onClick={this.viewCommentToggle}>Comments</button>
                    </div>
                </footer>
                <div>
                    {this.state.viewComment ? 
                    <div>
                        <CommentTable gigFetch={this.props.gigFetch} comments={this.props.gig.comments} gigId={this.props.gig.id}/> 
                    </div> : null }

                </div>
            </ThisGig>
        )
    }
}