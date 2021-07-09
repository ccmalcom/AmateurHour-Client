import React from "react";

import UGig from "./UGig";


type AcceptedProps = {
    userGigs: [
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
                    createdAt: string
                }]
        }
    ],
    gigFetch: () => void,
    gigToEdit: (gig: {
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
    }) => void,
    editModal: () => void
}

const UGigTable =(props: AcceptedProps)=>{

    const gigMapper = () => {
        if(props.userGigs.length > 0){
            return props.userGigs.map((gig, index) => {
                return <UGig gig={gig} index={index} gigToEdit={props.gigToEdit} gigFetch={props.gigFetch} editModal={props.editModal}/>
            }) 
        } else {
            return 'No Gigs Posted Yet'
        }
    
    }
        return (
            <div>
                {gigMapper()}
            </div>
        )
    
}


export default UGigTable;