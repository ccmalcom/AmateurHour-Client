import React from "react";
import styled from "styled-components";
import ThisProfile from "./ThisProfile";
import ThisGigIndex from "./thisGigs/ThisGigIndex";

const FullPage = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px
`
const PostsBox = styled.div`
    margin-left: 10px;
    height: 80vh;
    border: 1px solid black;
    width: 50vw;
    background-color: #FDFFFC
`
type AcceptedProps = {
    userId: number
}

type IndexState = {
    userData: {
        id: number,
        firstName: string,
        lastName: string,
        fullName: string,
        emailAddress: string,
        zipCode: number,
        instrument: Array<string>,
        genre: Array<string>,
        bio: string,
        socialLinks: Array<string>,
        createdAt: string,
        gigs: [
            {
                id: number,
                location: string,
                title: string,
                instrument: Array<string>,
                genre: Array<string>,
                size: number,
                content: string,
                createdAt: string
            }
        ]
    },
    editModalActive: boolean,
    deleteModalActive: boolean,
}

export default class ThisIndex extends React.Component<AcceptedProps, IndexState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            userData: {
                id: 0,
                firstName: '',
                lastName: '',
                fullName: '',
                emailAddress: '',
                zipCode: 0,
                instrument: [],
                genre: [],
                bio: '',
                socialLinks: [],
                createdAt: '',
                gigs: [
                    {
                        id: 0,
                        location: "",
                        title: "",
                        instrument: [],
                        genre: [],
                        size: 5,
                        content: "",
                        createdAt: "",
                    }
                ]
            },
            editModalActive: false,
            deleteModalActive: false,
        }
        this.getUserInfo = this.getUserInfo.bind(this)
    }
    componentDidMount() {
        this.getUserInfo()
    }


    getUserInfo() {
        console.log('getting user info');
        fetch(`https://ccm-amateurhour.herokuapp.com/user/view/${this.props.userId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
            .then(res => res.json())
            .then(userData =>  this.setState({ userData: userData }))
            .then(()=>{console.log(this.state.userData)})
            .catch(err => console.log(err))
    }

    componentWillUnmount(){
        this.setState({ userData: {
            id: 0,
            firstName: '',
            lastName: '',
            fullName: '',
            emailAddress: '',
            zipCode: 0,
            instrument: [],
            genre: [],
            bio: '',
            socialLinks: [],
            createdAt: '',
            gigs: [
                {
                    id: 0,
                    location: "",
                    title: "",
                    instrument: [],
                    genre: [],
                    size: 5,
                    content: "",
                    createdAt: "",
                }
            ]
        }
    })
}
    render() {
        return (
            <FullPage id='ProfileAndGigs'>
                <ThisProfile userData={this.state.userData} />
                <PostsBox id='GigsDiv'>
                    <ThisGigIndex userId={this.props.userId}/>
                </PostsBox>
            </FullPage>
        )
    }
}