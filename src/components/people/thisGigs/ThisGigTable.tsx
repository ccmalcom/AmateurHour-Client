import React from "react";
import styled from "styled-components";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import CommentTable from "../../comments/CommentTable";

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

const Constraints = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly
`

const DropdownDiv = styled.div`
    display: flex;
    justify-content: flex-end
`

const FlexDiv = styled.div`
    display: flex;
    width: 100%;
    margin: auto;
    justify-content: space-evenly;
    padding-left: 50px
`
const Details = styled.div`
    background-color: #C4C4C4;
    display: flex;
    align-items: center;
    height: fit-content;
    justify-content: center;
    padding: 20px
`
const NoMarginText = styled.p`
    margin: 0
`

const Button = styled.button`
    background-color: #FF9f1c;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    margin-bottom: 10px;
    color: white
`
const H = styled.h2`
    color: #891A1C
`
type AcceptedProps = {
    userGigs: [
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
class ThisGigTable extends React.Component<AcceptedProps, TableState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            viewComment: false,
        }
        this.viewCommentToggle = this.viewCommentToggle.bind(this)
    }
    viewCommentToggle() {
        this.setState((state) => { return { viewComment: !state.viewComment } })
    }
    dateConvert(timestamp: string) {
        const d = new Date(timestamp);
        let date = d.toDateString() + ', ' + d.getHours() + ":" + d.getMinutes();
        return date;
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
    gigMapper = () => {
        if (this.props.userGigs.length > 0) {
            return this.props.userGigs.map((gig, index) => {
                return (
                    <ThisGig key={index}>
                        {localStorage.role === 'Admin'?
                <DropdownDiv>
                    <UncontrolledDropdown>
                    <DropdownToggle style={{backgroundColor: '#891A1C', border: 'none'}} caret>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Options</DropdownItem>
                            {/* ADMIN */}
                            <DropdownItem onClick={() => { this.props.gigToEdit(gig); this.props.editModal() }}>Edit Gig</DropdownItem>
                            <DropdownItem onClick={() => { this.adminDeleteGig(gig.id) }}>Delete Gig</DropdownItem> 
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </DropdownDiv>
                : null }
                        <PostData>
                            <div>
                                <H>{gig.title}</H>
                                <FlexDiv>

                                    <p>{gig.posterName}</p>
                                    <p><strong>{gig.location}</strong></p>
                                    <p>{this.dateConvert(gig.createdAt)}</p>
                                </FlexDiv>
                            </div>
                            <Constraints>
                                <p><strong>Number of players:</strong> {gig.size}</p>
                                <p><strong>Instrument(s): </strong>{gig.instrument}</p>
                                <p><strong>Genre(s): </strong>{gig.genre}</p>
                            </Constraints>
                            <Details>
                                <NoMarginText>{gig.content}</NoMarginText>
                            </Details>
                        </PostData>
                        <footer>
                            <div>
                                <p >Comments: {gig.comments.length}</p>
                            </div>
                            <div>
                                <Button onClick={this.viewCommentToggle}>Comments</Button>
                            </div>
                        </footer>
                        <div>
                            {this.state.viewComment ?
                                <div>
                                    <CommentTable gigFetch={this.props.gigFetch} comments={gig.comments} gigId={gig.id} />
                                </div> : null}

                        </div>
                    </ThisGig>
                )
            }
            )
        } else {
            return 'No Gigs Posted Yet'
        }
    }
    render() {

        return (
            <div>
                {this.gigMapper()}
            </div >
        )
    }

}


export default ThisGigTable;