import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import UCommentEdit from "./UCommentEdit";


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
    gigFetch: () => void,
    gigId: number
}

type CommentState = {
    editOn: boolean
}

export default class UComment extends React.Component<AcceptedProps, CommentState>{
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

    render() {
        return (
            <div>
                <hr />
                {localStorage.role !== 'Test' ?
                    <div>
                        {localStorage.userId == this.props.comment.userId || this.props.gigId == localStorage.userId ? <DropdownDiv>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Options</DropdownItem>
                                    <DropdownItem onClick={() => { this.editDisplay() }} >Edit</DropdownItem>
                                    <DropdownItem onClick={() => { this.props.deleteComment(this.props.comment.id) }} >Delete </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </DropdownDiv> : null}
                    </div>
                    : null}
                <p>{this.props.comment.posterName}</p>
                <p>{this.props.comment.createdAt}</p>
                {this.state.editOn ? <UCommentEdit gigFetch={this.props.gigFetch} comment={this.props.comment} editDisplay={this.editDisplay} /> : <p>{this.props.comment.content}</p>}

            </div>
        )
    }

}