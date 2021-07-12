import React from 'react';
import GigTable from './GigTable';
import PostGig from './PostGig';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import background from '../../assets/gigs.jpg';
import GigEdit from './GigEdit';
import AdminGigEdit from './AdminGigEdit';

const GigsView = styled.div`
    height: 75vh;
    overflow: auto;
    width: 50vw;
`
const ButtonDiv = styled.div`
    width: 70vw;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end
`
const FullPage = styled.div`
    height: calc(100vh - 60px);
    width: 100vw;
    background-image: url(${background});
    background-position: center;
    background-size: cover;
`
const H = styled.h1`
    color: #FF9F1C;
    padding-top: 30px
`
const ContentDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 80vw;
    margin: auto
`

const FilterBox = styled.div`
    background-color: white;
    height: 75vh;
    width: 30%
`

type AcceptedProps = {

}

type GigState = {
    allGigs: [
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
                    createdAt: string,
                }
            ]
        }
    ],
    createModalActive: boolean,
    loading: boolean,
    gigToEdit: {
        id: number;
        location: string;
        title: string;
        instrument: Array<string>;
        genre: Array<string>;
        size: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        userId: number;
        posterName: string,
    },
    editModalActive: boolean
}

export default class GigIndex extends React.Component<AcceptedProps, GigState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            allGigs: [
                {
                    id: 0,
                    location: '',
                    title: '',
                    instrument: [''],
                    genre: [''],
                    size: 0,
                    content: '',
                    createdAt: '',
                    updatedAt: '',
                    userId: 0,
                    posterName: '',
                    comments: [{
                        id: 0,
                        content: '',
                        userId: 0,
                        gigId: 0,
                        posterName: '',
                        createdAt: ''
                    }]
                }
            ],
            createModalActive: false,
            loading: false,
            gigToEdit: {
                id: 0,
                location: '',
                title: '',
                instrument: [''],
                genre: [''],
                size: 0,
                content: '',
                createdAt: '',
                updatedAt: '',
                userId: 0,
                posterName: ''
            },
            editModalActive: false
        }
        this.modalPopup = this.modalPopup.bind(this)
        this.gigFetch = this.gigFetch.bind(this)
        this.gigToEdit = this.gigToEdit.bind(this)
        this.editModal = this.editModal.bind(this)
    }

    componentDidMount() {
        // console.log();
        this.gigFetch()
    }

    gigFetch() {
        this.setState({ loading: true })
        fetch('https://ccm-amateurhour.herokuapp.com/gig/view', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            }),
        })
            .then(res => res.json())
            .then((gigData) => {
                this.setState({ allGigs: gigData.allGigs }); console.log(gigData)
            })
            .then(() => { console.log('logging state:', this.state.allGigs) })
            .then(() => { this.setState({ loading: false }) })
    }

    modalPopup() {
        this.setState((state) => {
            return { createModalActive: !state.createModalActive }
        })
        console.log(this.state.createModalActive);
    }

    gigToEdit(gig: {
        id: number;
        location: string;
        title: string;
        instrument: Array<string>;
        genre: Array<string>;
        size: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        userId: number;
        posterName: string
    }) {
        this.setState(() => { return { gigToEdit: gig } })
        console.log(this.state.gigToEdit);
    }

    editModal() {
        this.setState((state) => { return { editModalActive: !state.editModalActive } })
    }


    render() {
        return (
            <FullPage>
                {/* <Filter /> */}
                <H>Gigs</H>
                {localStorage.role !== 'Test' ?
                    <ButtonDiv>
                        <button onClick={this.modalPopup}>+</button>
                    </ButtonDiv>
                    : null}
                {this.state.createModalActive ? <PostGig gigFetch={this.gigFetch} modalPopup={this.modalPopup} /> : null}
                <ContentDiv>
                    <FilterBox>
                        <p>Filter gigs here</p>
                    </FilterBox>
                    {this.state.loading ?
                        <div>
                            <Loader type='Audio' color='#FF9F1C' />
                            <p>Loading...</p>
                        </div>
                        :
                        <GigsView>
                            <GigTable allGigs={this.state.allGigs} gigFetch={this.gigFetch} gigToEdit={this.gigToEdit} editModal={this.editModal} />
                        </GigsView>}
                </ContentDiv>
                {this.state.editModalActive ? <GigEdit editModal={this.editModal} gigToEdit={this.state.gigToEdit} gigFetch={this.gigFetch} /> : null}
                {this.state.editModalActive && localStorage.role === 'Admin' ? <AdminGigEdit editModal={this.editModal} gigToEdit={this.state.gigToEdit} gigFetch={this.gigFetch} /> : null}

            </FullPage>
        )
    }

}

