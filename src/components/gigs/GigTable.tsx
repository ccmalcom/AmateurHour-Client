import React from "react";
// import GigDisplay from './GigDisplay'


type AcceptedProps ={
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
    ]
}

const GigTable = (props: AcceptedProps) =>{

    const gigMapper = ()=>{
        return props.allGigs.map((gig, index) =>{
            return(
            <div>
                <div>
                    <h3>{gig.title}</h3>
                    <h3>{gig.location}</h3>
                    <h3>{gig.size}</h3>
                    <h3>{gig.instrument}</h3>
                    <h3>{gig.genre}</h3>
                    <h3>{gig.content}</h3>
                </div>
            </div>
            )
        })
    }

        return(
            <div>
                {gigMapper()}
            </div>
        )

}

export default GigTable;