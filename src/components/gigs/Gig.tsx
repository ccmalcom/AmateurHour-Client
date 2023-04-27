import React from "react";
import styled from 'styled-components';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import CommentTable from "../comments/CommentTable";

const ThisGig = styled.div`
    border: 1px solid black;
    margin: 0 0 20px 0;
    background-color: white;
    height: fit-content;
    padding: 5px 0
`
const PostData = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: fit-content;
`

const DropdownDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Constraints = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly
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
        this.instrumentMap = this.instrumentMap.bind(this)
        this.genreMap = this.genreMap.bind(this)
    }

    deleteGig = (gig: number) => {
        fetch(`http://localhost:8080/gig/delete/${gig}`, {
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
        fetch(`http://localhost:8080/gig/delete/${gig}/admin`, {
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

    dateConvert(timestamp: string){
        const d = new Date( timestamp );
        let date = d.toDateString() + ', ' + d.getHours() + ":" + d.getMinutes() ;
        return date ;
    }

    instrumentMap(){
        if(this.props.gig.instrument !== null){
            return this.props.gig.instrument.map((i)=>{
                return i + ' '
            })
        } else {
            return null
        }
    }
    genreMap(){
        if(this.props.gig.genre !== null){
            return this.props.gig.genre.map((i)=>{
                return i + ' '
            })
        } else {
            return null
        }
    }
    render(){
        return (
            <ThisGig key={this.props.index}>
                { localStorage.userId == this.props.gig.userId && localStorage.role === 'User'|| localStorage.role === 'Admin' ?
                <DropdownDiv>
                    <UncontrolledDropdown>
                        <DropdownToggle style={{backgroundColor: '#891A1C', border: 'none', marginRight: '5px'}} caret>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Options</DropdownItem>
                            {localStorage.userId == this.props.gig.userId && localStorage.role === 'User' ? <DropdownItem onClick={() => { this.props.gigToEdit(this.props.gig); this.props.editModal() }}>Edit Gig</DropdownItem> : null}
                            {localStorage.userId == this.props.gig.userId && localStorage.role === 'User' ? <DropdownItem onClick={() => { this.deleteGig(this.props.gig.id) }}>Delete Gig</DropdownItem> : null}

                            {/* ADMIN */}
                            {localStorage.role === 'Admin' ? <DropdownItem onClick={() => { this.props.gigToEdit(this.props.gig); this.props.editModal() }}>Edit Gig</DropdownItem> : null}
                            {localStorage.role === 'Admin' ? <DropdownItem onClick={() => { this.adminDeleteGig(this.props.gig.id) }}>Delete Gig</DropdownItem> : null}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </DropdownDiv>
                : null}
                <PostData>
                    <div>
                        <H>{this.props.gig.title}</H>
                        <FlexDiv>

                        <p>{this.props.gig.posterName}</p>
                        <p><strong>{this.props.gig.location}</strong></p>
                        <p>{this.dateConvert(this.props.gig.createdAt)}</p>
                        </FlexDiv>
                    </div>
                    <Constraints>
                        <p><strong>Number of players:</strong> {this.props.gig.size}</p>
                        <p><strong>Instrument(s): </strong>{this.instrumentMap()}</p>
                        <p><strong>Genre(s): </strong>{this.genreMap()}</p>
                    </Constraints>
                    <Details>
                        <NoMarginText>{this.props.gig.content}</NoMarginText>
                    </Details>
                </PostData>
                <footer>
                    <div>
                        <p >Comments: {this.props.gig.comments.length}</p>
                    </div>
                    <div>
                        <Button onClick={this.viewCommentToggle}>Show Comments</Button>
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