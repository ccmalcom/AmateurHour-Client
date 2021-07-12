import React from "react";

import Gig from "./Gig";


type AcceptedProps = {
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

const GigTable =(props: AcceptedProps)=>{

    const gigMapper = () => {
        return props.allGigs.map((gig, index) => {
            return <Gig gig={gig} index={index} gigToEdit={props.gigToEdit} gigFetch={props.gigFetch} editModal={props.editModal}/>
        })
    }

    
        return (
            <div>
                {gigMapper()}
            </div>
        )
    
}


export default GigTable;