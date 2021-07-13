import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import ThisGigTable from './ThisGigTable';
import AdminGigEdit from '../../gigs/AdminGigEdit';

const GigsView = styled.div`
    height: 66.5vh;
    overflow: auto;
    width: 100%;
    margin: auto;
`
const H = styled.h1`
    color: #FF9F1C;
    padding-top: 30px
`

type AcceptedProps={
    userId: number
}

type GigState ={
    userGigs:[
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

export default class ThisGigIndex extends React.Component<AcceptedProps, GigState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            userGigs:[
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
        this.gigFetch = this.gigFetch.bind(this)
        this.gigToEdit = this.gigToEdit.bind(this)
        this.editModal = this.editModal.bind(this)
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
    componentDidMount(){
        // console.log();
        this.gigFetch()
    }
    gigFetch(){
        this.setState({loading: true})
        fetch(`https://ccm-amateurhour.herokuapp.com/gig/view/user/${this.props.userId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
        }),
    })
    .then(res => res.json())
    .then((gigData) =>{
        this.setState({userGigs: gigData.userGigs}); console.log(gigData)
    })
    .then(()=>{console.log('logging state:', this.state.userGigs)})
    .then(()=>{this.setState({loading: false})})
}
    

    render(){
        return(
            <div>
                <H>Gigs</H>
                <GigsView>
                {this.state.loading ? 
                <div>
                    <Loader type='Audio' color='#FF9F1C'/>
                    <p>Loading...</p>
                </div>
                :
                    <ThisGigTable userGigs={this.state.userGigs} gigFetch={this.gigFetch} gigToEdit={this.gigToEdit} editModal={this.editModal}/>
                }
                </GigsView> 
                {this.state.editModalActive && localStorage.role === 'Admin' ? <AdminGigEdit editModal={this.editModal} gigToEdit={this.state.gigToEdit} gigFetch={this.gigFetch} /> : null}
            </div>
        )
    }

}

