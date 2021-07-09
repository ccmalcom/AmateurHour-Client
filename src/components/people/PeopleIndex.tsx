import React from "react";
import PeopleTable from "./PeopleTable";
import styled from 'styled-components'
import background from '../../assets/people-background.jpg'

const FullPage = styled.div`
    height: calc(100vh - 60px);
    width: 100vw;
    background-image: url(${background});
    background-position: center;
    background-size: cover;

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
}

export default class PeopleIndex extends React.Component<{}, PeopleState>{
    constructor(props: {}) {
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
            }]
        }
    }

    componentDidMount() {
        this.fetchPeople()
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

                <PeopleView>
                    <PeopleTable userData={this.state.userData} />
                </PeopleView>
            </FullPage>
        )
    }
}