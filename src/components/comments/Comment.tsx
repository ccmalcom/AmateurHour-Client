import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import CommentEdit from "./CommentEdit";


const DropdownDiv = styled.div`
    display: flex;
    justify-content: flex-end
`

type AcceptedProps = {
    comment: {
        id: number,
        content: string,
        userId: number,
        gigId: number,
        posterName: string,
        createdAt: string

    },
    deleteComment: (commentId: number) => void,
    deleteCommentAdmin: (commentId: number) => void,
    gigFetch: () => void,
    gigId: number
}

type CommentState = {
    editOn: boolean
}

export default class Comment extends React.Component<AcceptedProps, CommentState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            editOn: false
        }
        this.editDisplay = this.editDisplay.bind(this)
    }
    editDisplay() {
        this.setState((state) => { return { editOn: !state.editOn } })
    }
    dateConvert(timestamp: string) {
        const d = new Date(timestamp);
        let date = d.toDateString() + ', ' + d.getHours() + ":" + d.getMinutes();
        return date;
    }
    render() {
        return (
            <div>
                <hr />
                {localStorage.userId == this.props.comment.userId && localStorage.role !== 'Test' || localStorage.userId == this.props.gigId && localStorage.role !== 'Test' || localStorage.role === 'Admin' ? <DropdownDiv>
                    <UncontrolledDropdown>
                        <DropdownToggle style={{ backgroundColor: '#891A1C', border: 'none', marginRight: '5px' }} caret>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </DropdownToggle>
                        {localStorage.role === 'User' ? <DropdownMenu>
                            <DropdownItem header>Options</DropdownItem>
                            {localStorage.userId == this.props.comment.userId ?
                                <DropdownItem onClick={() => { this.editDisplay() }} >Edit</DropdownItem>
                                : null}
                            <DropdownItem onClick={() => { this.props.deleteComment(this.props.comment.id) }} >Delete </DropdownItem>
                        </DropdownMenu> : null}
                        {localStorage.role === 'Admin' ?
                            <DropdownMenu>
                                <DropdownItem header>Options</DropdownItem>
                                <DropdownItem onClick={() => { this.props.deleteCommentAdmin(this.props.comment.id) }} >Delete </DropdownItem>
                            </DropdownMenu> : null}
                    </UncontrolledDropdown>
                </DropdownDiv> : null}
                <p>{this.props.comment.posterName}</p>
                <p>{this.dateConvert(this.props.comment.createdAt)}</p>
                {this.state.editOn ? <CommentEdit gigFetch={this.props.gigFetch} comment={this.props.comment} editDisplay={this.editDisplay} /> : <p>{this.props.comment.content}</p>}

            </div>
        )
    }

}