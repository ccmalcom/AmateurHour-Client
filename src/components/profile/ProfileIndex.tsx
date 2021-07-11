import React from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import UGigIndex from "./userGigs/UGigIndex";
import ProfileEdit from "./ProfileEdit";
import DeleteUser from "./DeleteUser";

const FullPage = styled.div`
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #707070
`
const PostsBox = styled.div`
    margin-left: 10px;
    height: 80vh;
    border: 1px solid black;
    width: 50vw;
    background-color: #FDFFFC
`
type AcceptedProps = {
    clearSession: ()=> void

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

export default class ProfileIndex extends React.Component<AcceptedProps, IndexState>{
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
        this.editModal = this.editModal.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.deleteModal = this.deleteModal.bind(this)
    }
    componentDidMount() {
        this.getUserInfo()
    }


    getUserInfo() {
        console.log('getting user info');
        fetch(`https://ccm-amateurhour.herokuapp.com/user/view/${localStorage.userId}`, {
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
    render() {
        return (
            <FullPage>
                <UserProfile userData={this.state.userData} editModal={this.editModal} deleteModal={this.deleteModal}/>
                <PostsBox>
                    <UGigIndex />
                </PostsBox>
                {this.state.editModalActive ? 
                <ProfileEdit userData={this.state.userData} editModal={this.editModal} userFetch={this.getUserInfo}/>
                : null }
                {this.state.deleteModalActive ? 
                <DeleteUser  deleteModal={this.deleteModal} clearSession={this.props.clearSession} />
                : null}
            </FullPage>
        )
    }
}