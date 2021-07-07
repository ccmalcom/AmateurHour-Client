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
    background-color: white
`
const PostData = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: 500px;
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
    commentOpen: boolean
}


class GigTable extends React.Component<AcceptedProps, TableState>{

    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            commentOpen: false,
        }
        this.commentToggle = this.commentToggle.bind(this)
    }

    commentToggle() {
        this.setState((state) => {
            return { commentOpen: !state.commentOpen }
        })
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
                            <p>Comments: {gig.comments.length}</p>
                        </div>
                        <div>
                            <button>Like</button>
                            <button onClick={this.commentToggle}>Comment</button>
                            <button>Share</button>
                        </div>
                        {this.state.commentOpen ? <PostComment gigId={gig.id} gigFetch={this.props.gigFetch} /> : null}
                    </footer>
                    <div>
                        {gig.comments.length > 0 ?
                            <CommentTable gigFetch={this.props.gigFetch} comments={gig.comments}/> : null}

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