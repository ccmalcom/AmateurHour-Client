import React from "react";
import PeopleTable from "./PeopleTable";
import styled from 'styled-components'
import background from '../../assets/people-background.jpg'
import ThisIndex from "./ThisIndex";

const FullPage = styled.div`
    height: 100%;
    width: 100vw;
    background-image: url(${background});
    background-position: center;
    background-size: cover;
    padding-bottom: 5%

`
const PeopleView = styled.div`
    height: 80vh;
    overflow: auto;
    width: 82vw;
    margin: auto
`
const H = styled.h1`
    color: #FF9F1C;
    padding: 30px 0
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
        fetch(`https://ccm-amateurhour.herokuapp.com/user/view`, {
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
                <H>People</H>
                
                {this.state.profileView ? 
                <div>
                    <button onClick={()=>{this.showProfile()}}>Go Back</button>
                <ThisIndex showProfile={this.showProfile}userId={this.state.userId} fetchPeople={this.fetchPeople}/> 
                </div>
                :
                <PeopleView>
                    <PeopleTable userData={this.state.userData} showProfile={this.showProfile} setUserId={this.setUserId}/>
                </PeopleView>
                }
            </FullPage>
        )
    }
}