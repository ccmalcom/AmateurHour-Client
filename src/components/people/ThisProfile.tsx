import React from "react";
import styled from 'styled-components';
// import gravatarUrl from "gravatar-url";
import defaultPic from '../../assets/default-profile.png'


const ProfileBox = styled.div`
    margin-right: 10px;
    height: 80vh;
    border: 1px solid black;
    width: 30vw;
    background-color: #FDFFFC;
    overflow-y: auto
    `

const ProfileImg = styled.img`
    height: calc(75px + 5vw);
    width: calc(75px + 5vw)
`
const Button1 = styled.div`
    background-color: #FF9f1c;
    padding: 10px;
    border-radius: 30px;
    border: 1px solid black;
`
const Button2 = styled.div`
    background-color: #891A1C;
    padding: 10px;
    border-radius: 30px;
    border: 1px solid black;
    color: white
`
const ButtonDiv = styled.div`
    display: flex;
    width: 55%;
    margin: 20px auto 0;
    justify-content: space-between    
`
type AcceptedProps={
    userData:{
        id:  number,
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
    editModal: ()=>void,
    deleteModal: ()=>void
}

type ProfileState={
    locData: {
        places:[
            {'place name': string
            'state abbreviation': string
            }
        ]
    },
    dataFetched: boolean,
}

export default class ThisProfile extends React.Component<AcceptedProps, ProfileState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            locData: {
                places:[
                    {
                        'place name': '',
                        'state abbreviation': ''
                    }
                ]
            },
            dataFetched: false,
        }
    }
    componentDidUpdate(){
        if(this.state.dataFetched === false){
            this.zipToLocation()
        }
    }
    zipToLocation(){
        this.setState({dataFetched: true})
        fetch(`https://api.zippopotam.us/us/${this.props.userData.zipCode}`)
        .then(res=> res.json())
        .then( data => this.setState({locData: data}))
        .then(()=>{console.log(this.state.locData)})
    }

    linkMapper(){
    return this.props.userData.socialLinks.map((link) => {
        return(
            <div>
                <a href={link} target='_blank' rel='noreferrer'>{link}</a>
            </div>
        )
    })
}

    render(){
        return(
            <ProfileBox>
                <ProfileImg src={defaultPic} alt="" />
                <h5>{this.props.userData.fullName}</h5>
                <p><strong>Location:</strong></p>
                <p>{this.state.locData.places[0]["place name"]},{this.state.locData.places[0]["state abbreviation"]}</p>
                <p><strong>Email:</strong></p>
                {/* <p>{this.props.userData.emailAddress}</p> */}
                {/* <img src={gravatarUrl(`${this.props.userData.emailAddress}`, {size: 200, default: `${defaultPic}`})} alt="" /> */}
                <p><strong>Instrument(s):</strong></p>
                <p>{this.props.userData.instrument}</p>
                <p><strong>Genre(s):</strong></p>
                <p>{this.props.userData.genre}</p>
                <p><strong>Bio:</strong></p>
                <p>{this.props.userData.bio}</p>
                <p><strong>Social Links:</strong></p>
                {this.props.userData.socialLinks !== null?
                <div>{this.linkMapper()}</div>    
                : null}
                <ButtonDiv>

                {localStorage.role === 'Admin' ?  
                <Button1 onClick={this.props.editModal}>Edit Profile</Button1>
                : null}
                {localStorage.role === 'Admin' ?  
                <Button2 onClick={this.props.deleteModal}>Delete Profile</Button2>
                : null}
                </ButtonDiv>
            </ProfileBox>

        )
    }
}