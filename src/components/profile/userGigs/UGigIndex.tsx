import React from 'react';
import UGigTable from './UGigTable';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import UGigEdit from './UGigEdit';

const GigsView = styled.div`
    height: 75vh;
    overflow: auto;
    width: 100%;
    margin: auto;
`
const H = styled.h1`
    color: #FF9F1C;
    padding-top: 30px
`

type AcceptedProps={

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

export default class UGigIndex extends React.Component<AcceptedProps, GigState>{
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
        this.modalPopup = this.modalPopup.bind(this)
        this.gigFetch = this.gigFetch.bind(this)
        this.gigToEdit = this.gigToEdit.bind(this)
        this.editModal = this.editModal.bind(this)
    }

    componentDidMount(){
        // console.log();
        this.gigFetch()
    }
    gigFetch(){
        this.setState({loading: true})
        fetch(`https://ccm-amateurhour.herokuapp.com/gig/view/user/${localStorage.userId}`, {
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
    
    modalPopup(){
        this.setState((state)=>{
            return {createModalActive: !state.createModalActive}
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
    }){
        this.setState(()=>{ return {gigToEdit: gig}})
        console.log(this.state.gigToEdit);
    }

    editModal(){
        this.setState((state)=>{return{editModalActive: !state.editModalActive}})
    }


    render(){
        return(
            <div>
                <H>Gigs</H>
                {this.state.loading ? 
                <div>
                    <Loader type='Audio' color='#FF9F1C'/>
                    <p>Loading...</p>
                </div>
                :
                <GigsView>
                    <UGigTable userGigs={this.state.userGigs} gigFetch={this.gigFetch} gigToEdit={this.gigToEdit} editModal={this.editModal}/>
                </GigsView> }
                {this.state.editModalActive ? <UGigEdit editModal={this.editModal} gigToEdit={this.state.gigToEdit} gigFetch={this.gigFetch}/> : null}

            </div>
        )
    }

}

