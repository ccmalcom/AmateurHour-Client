import React from "react";
import styled from "styled-components";
import ThisProfile from "./ThisProfile";
import ThisGigIndex from "./thisGigs/ThisGigIndex";
import AdminProfileEdit from "./AdminProfileEdit";
import AdminDeleteUser from "./AdminDeleteUser";

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 2.5%
`
const PostsBox = styled.div`
    margin-left: 10px;
    height: 80%;
    // border: 1px solid black;
    width: 50vw;
    background-color: transparent
`
type AcceptedProps = {
    userId: number,
    showProfile: ()=> void,
    fetchPeople: ()=>void
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
        ],
        admin: string
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
                ],
                admin: ''
            },
            editModalActive: false,
            deleteModalActive: false,
        }
        this.editModal = this.editModal.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.deleteModal = this.deleteModal.bind(this)
    }
    componentDidMount() {
        this.getUserInfo()
    }


    getUserInfo() {
        console.log('getting user info');
        fetch(`http://localhost:8080/user/view/${this.props.userId}`, {
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

    editModal(){
        this.setState((state)=>{return{editModalActive: !state.editModalActive}})
    }

    deleteModal(){
        this.setState((state) =>{return{deleteModalActive: !state.deleteModalActive}})
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
            ],
            admin: ''
        }
    })
}
    render() {
        return (
            <FullPage id='ProfileAndGigs'>
                <ThisProfile userData={this.state.userData} editModal={this.editModal} deleteModal={this.deleteModal} />
                <PostsBox id='GigsDiv'>
                    <ThisGigIndex userId={this.props.userId}/>
                </PostsBox>
                {this.state.editModalActive ? 
                <AdminProfileEdit userData={this.state.userData} editModal={this.editModal} userFetch={this.getUserInfo}/>
                : null }
                {this.state.deleteModalActive ? 
                <AdminDeleteUser showProfile={this.props.showProfile} deleteModal={this.deleteModal}  userId={this.state.userData.id} fetchPeople={this.props.fetchPeople}/>
                : null}
            </FullPage>
        )
    }
}