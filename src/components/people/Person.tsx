import React from "react";
import styled from 'styled-components';
// import gravatarUrl from "gravatar-url";
import defaultPic from '../../assets/default-profile.png'


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
}

type PersonState = {
    locData: {
        places: [
            {
                'place name': string
                'state abbreviation': string
            }
        ]
    },
    dataFetched: boolean
}
export default class Person extends React.Component<AcceptedProps, PersonState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            locData: {
                places: [
                    {
                        'place name': '',
                        'state abbreviation': ''
                    }
                ]
            },
            dataFetched: false,
        }
    }

    componentDidUpdate() {
        if (this.state.dataFetched === false) {
            this.zipToLocation()
        }
    }
    zipToLocation() {
        this.setState({ dataFetched: true })
        fetch(`http://api.zippopotam.us/us/${this.props.user.zipCode}`)
            .then(res => res.json())
            .then(data => this.setState({ locData: data }))
            .then(() => { console.log(this.state.locData) })
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
                    <p>{this.state.locData.places[0]["place name"]},{this.state.locData.places[0]["state abbreviation"]}</p>
                    <p><strong>Email:</strong></p>
                    <p>{this.props.user.emailAddress}</p>
                </div>
                {/* <img src={gravatarUrl(`${this.props.user.emailAddress}`, {size: 200, default: `${defaultPic}`})} alt="" /> */}
                <div>
                    <p><strong>Instrument(s):</strong></p>
                    <p>{this.props.user.instrument}</p>
                    <p><strong>Genre(s):</strong></p>
                    <p>{this.props.user.genre}</p>
                </div>
                <button >View Profile</button>
            </ProfileBox>

        )
    }
}