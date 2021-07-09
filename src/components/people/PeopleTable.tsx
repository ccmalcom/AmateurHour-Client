import React from "react";
import Person from './Person'

type AcceptedProps={
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
const PeopleTable =(props: AcceptedProps)=>{

    const peopleMapper = () => {
        return props.userData.map((user, index) => {
            return <Person user={user} />
        })
    }
        return (
            <div>
                {peopleMapper()}
            </div>
        )
    
}


export default PeopleTable;