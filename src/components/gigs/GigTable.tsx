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

type AcceptedProps = {
    allGigs: [
        {
            id: number,
            location: string,
            title: string,
            instrument: Array<string>,
            genre: Array<string>,
            size: number,
            content: string,
            createdAt: string,
            updatedAt: string,
            userId: number,
            posterName: string,
            comments: [
                {
                    id: number,
                    content: string,
                    userId: number,
                    gigId: number,
                    posterName: string,
                    createdAt: string
                }]
        }
    ],
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

type TableState = {
    viewComment: boolean
}


class GigTable extends React.Component<AcceptedProps, TableState>{

    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            viewComment: false,
        }
        this.viewCommentToggle = this.viewCommentToggle.bind(this)
    }

    viewCommentToggle(){
        this.setState((state)=>{return{viewComment: !state.viewComment}})
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

    gigMapper = () => {
        return this.props.allGigs.map((gig, index) => {
            return (
                <ThisGig key={index}>
                    <DropdownDiv>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Options</DropdownItem>
                                {localStorage.userId == gig.userId ? <DropdownItem onClick={() => { this.props.gigToEdit(gig); this.props.editModal() }}>Edit Gig</DropdownItem> : null}
                                {localStorage.userId == gig.userId ? <DropdownItem onClick={() => { this.deleteGig(gig.id) }}>Delete Gig</DropdownItem> : null}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </DropdownDiv>
                    <PostData>
                        <div>
                            <h3>{gig.posterName}</h3>
                            <h3>{gig.title}</h3>
                            <h5>{gig.location}</h5>
                        </div>
                        <div>
                            <h5>{gig.size}</h5>
                            <h5>{gig.instrument}</h5>
                            <h5>{gig.genre}</h5>
                        </div>
                        <div>
                            <p>{gig.content}</p>
                        </div>
                    </PostData>
                    <footer>
                        <div>
                            <p>Likes</p>
                            <p >Comments: {gig.comments.length}</p>
                        </div>
                        <div>
                            <button>Like</button>
                            <button onClick={this.viewCommentToggle}>Comments</button>
                            <button>Share</button>
                        </div>
                    </footer>
                    <div>
                        {this.state.viewComment ? 
                        <div>
                        {gig.comments.length > 0 ?
                            <CommentTable gigFetch={this.props.gigFetch} comments={gig.comments} gigId={gig.id}/> : 'No comments'}
                        </div> : null }

                    </div>
                </ThisGig>
            )
        })
    }
    render() {

        return (
            <div>
                {this.gigMapper()}
            </div>
        )
    }
}


export default GigTable;