import React from "react";
import styled from 'styled-components';
// import gravatarUrl from "gravatar-url";
import defaultPic from '../../assets/default-profile.png';
import LocData from "./LocData";



const ProfileBox = styled.div`
    margin-right: 10px;
    height: 20%;
    border: 1px solid black;
    width: 80vw;
    background-color: #FDFFFC;
    display: flex;
    justify-content: space-evenly;
    align-items: center
    `
const ProfileImg = styled.img`
    height: calc(75px + 5vw);
    width: calc(75px + 5vw)
`
const Button = styled.button`
    background-color: #FF9F1C;
    color: #FDFFFC;
    border: none;
    padding: 20px 10px;
    border-radius: 20px;
    transition: .25s ease-out;
    &:hover{
        transform: scale(1.1);
        transition: .25s ease
    }
`
type AcceptedProps = {
    user: {
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
        createdAt: string
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
    showProfile: ()=> void,
    setUserId: (userId: number)=> void
}

type PersonState = {
    dataFetched: boolean
}
export default class Person extends React.Component<AcceptedProps, PersonState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            dataFetched: false,
        }
        this.instrumentMap = this.instrumentMap.bind(this)
        this.genreMap = this.genreMap.bind(this)
    }

    // componentDidUpdate() {
    //     if (this.state.dataFetched === false) {
    //         this.zipToLocation()
    //     }
    // }
    
    instrumentMap(){
        if(this.props.user.instrument !== null){
            return this.props.user.instrument.map((i)=>{
                return i + ' '
            })
        } else {
            return null
        }
    }
    genreMap(){
        if(this.props.user.genre !== null){
            return this.props.user.genre.map((i)=>{
                return i + ' '
            })
        } else {
            return null
        }
    }

    render() {
        return (
            <ProfileBox>
                <div>
                    <ProfileImg src={defaultPic} alt="" />
                    <h5>{this.props.user.fullName}</h5>
                </div>
                <div>
                    <p><strong>Location:</strong></p>
                    <LocData zip={this.props.user.zipCode}/>       
                    <p><strong>Gigs Posted:</strong></p>
                    <p>{this.props.user.gigs.length}</p>
                </div>
                <div>
                    <p><strong>Instrument(s):</strong></p>
                    <p>{this.instrumentMap()}</p>
                    <p><strong>Genre(s):</strong></p>
                    <p>{this.genreMap()}</p>
                </div>
                <Button onClick={()=>{this.props.showProfile();
                this.props.setUserId(this.props.user.id)}}>View Profile</Button>
            </ProfileBox>

        )
    }
}