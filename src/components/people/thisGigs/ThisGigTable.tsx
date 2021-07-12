import React from "react";
import styled from "styled-components";

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
    gigMapper = () => {
        if (this.props.userGigs.length > 0) {
            return this.props.userGigs.map((gig, index) => {
                return (
                    <ThisGig key={index}>
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
                                <button onClick={this.viewCommentToggle}>Comments</button>
                            </div>
                        </footer>
                        <div>
                            {this.state.viewComment ?
                                <div>
                                    {/* <UCommentTable gigFetch={this.props.gigFetch} comments={this.props.gig.comments} gigId={this.props.gig.id} /> */}
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