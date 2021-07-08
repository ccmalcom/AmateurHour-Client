import React from "react";

type AcceptedProps={
    userData:{
        id:  number,
        fullName: string,
        zipCode: number,
        instrument: Array<string>,
        genre: Array<string>,
        bio: string,
        socialLinks: Array<string>,
        createdAt: string
    }
}

type ProfileState={

}

export default class UserProfile extends React.Component<AcceptedProps, ProfileState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div>
                <p>{this.props.userData.fullName}</p>
            </div>
        )
    }
}