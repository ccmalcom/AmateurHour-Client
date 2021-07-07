import React from 'react';
import GigTable from './GigTable';
import PostGig from './PostGig';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const GigsView = styled.div`
    height: 75vh;
    overflow: auto;
    width: 70vw;
    margin: auto
`
const ButtonDiv = styled.div`
    width: 70vw;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end
`

type AcceptedProps={

}

type GigState ={
    allGigs:[
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
            comments: Array<object>
        }
    ],
    createModalActive: boolean,
    loading: boolean
}

export default class GigIndex extends React.Component<AcceptedProps, GigState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            allGigs:[
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
                    comments: [{}]
                }
            ],
            createModalActive: false,
            loading: false,
        }
        this.modalPopup = this.modalPopup.bind(this)
        this.gigFetch = this.gigFetch.bind(this)
    }

    componentDidMount(){
        // console.log();
        this.gigFetch()
    }
    gigFetch(){
        this.setState({loading: true})
        fetch('https://ccm-amateurhour.herokuapp.com/gig/view', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
        }),
    })
    .then(res => res.json())
    .then((gigData) =>{
        this.setState({allGigs: gigData.allGigs}); console.log(gigData)
    })
    .then(()=>{console.log('logging state:', this.state.allGigs)})
    .then(()=>{this.setState({loading: false})})
}
    
    modalPopup(){
        this.setState((state)=>{
            return {createModalActive: !state.createModalActive}
        })
        console.log(this.state.createModalActive);
    }


    render(){
        return(
            <div>
                {/* <Filter /> */}
                <h2>Gigs</h2>
                <br />
                <ButtonDiv>
                <button onClick={this.modalPopup}>+</button>
                </ButtonDiv>
                {this.state.createModalActive ? <PostGig gigFetch={this.gigFetch} modalPopup={this.modalPopup}/> : null}
                {this.state.loading ? 
                <div>
                    <Loader type='Audio' color='#FF9F1C'/>
                    <p>Loading...</p>
                </div>
                :
                <GigsView>
                    <GigTable allGigs={this.state.allGigs}/>
                </GigsView> }
            </div>
        )
    }

}

