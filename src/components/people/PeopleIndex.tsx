import React from "react";
import PeopleTable from "./PeopleTable";
import styled from 'styled-components'
import background from '../../assets/people-background.jpg'
import ThisIndex from "./ThisIndex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const FullPage = styled.div`
    height: 100%;
    width: 100vw;
    background-image: url(${background});
    background-position: center;
    background-size: cover;
    padding: 2.5% 0

`
const PeopleView = styled.div`
    height: 80vh;
    overflow: auto;
    width: 82vw;
    margin: 30px auto 0
`
const H = styled.h1`
    color: #FF9F1C;
`
const Button = styled.button`
    background-color: #FF9f1c;
    color: white;
    font-size: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    transition: .25s ease-out;
    &:hover{
        transform: scale(1.1);
        transition: .25s ease;
    }   
`

const ButtonDiv = styled.div`
    width: 44%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 0 10%
`

type AcceptedProps={
}

type PeopleState = {
    userData: [{
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
    }],
    userId: number,
    profileView: boolean
}

export default class PeopleIndex extends React.Component<AcceptedProps, PeopleState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            userData: [{
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
            }],
            userId: 0,
            profileView: false
        }
        this.showProfile = this.showProfile.bind(this)
        this.setUserId = this.setUserId.bind(this)
    }

    componentDidMount() {
        this.fetchPeople()
    }

    showProfile(){
        this.setState((state)=>{return{profileView: !state.profileView}})
    }
    setUserId(userId: number){
        this.setState({userId: userId})
    }
    

    fetchPeople() {
        fetch(`http://localhost:8080/user/view`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
            .then(res => res.json())
            .then((userData) => { this.setState({ userData: userData }) })
            .then(() => { console.log(this.state.userData) })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <FullPage>
                
                {this.state.profileView ? 
                <div>
                    <ButtonDiv>
                    <Button onClick={()=>{this.showProfile()}}><FontAwesomeIcon icon={faArrowLeft}/></Button>
                <H>People</H>
                    </ButtonDiv>
                <ThisIndex showProfile={this.showProfile}userId={this.state.userId} fetchPeople={this.fetchPeople}/> 
                </div>
                :
                <div>
                    <H>People</H>
                <PeopleView>
                    <PeopleTable userData={this.state.userData} showProfile={this.showProfile} setUserId={this.setUserId}/>
                </PeopleView>
                </div>
                }
            </FullPage>
        )
    }
}