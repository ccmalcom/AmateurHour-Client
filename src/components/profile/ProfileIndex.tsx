import React from "react";
import UserProfile from "./UserProfile";

type AcceptedProps={

}

type IndexState={
    user: {
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

export default class ProfileIndex extends React.Component<AcceptedProps, IndexState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            user:{
                id: 0,
                fullName: '',
                zipCode: 0,
                instrument: [],
                genre: [],
                bio: '',
                socialLinks: [],
                createdAt: ''
            }
        }
    }
    componentDidMount(){
        this.getUserInfo()
    }
    getUserInfo(){
        console.log('getting user info');
        fetch(`https://ccm-amateurhour.herokuapp.com/user/view/${localStorage.userId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then(res=>res.json())
        .then((userData)=>{this.setState({user: userData})})
        .catch(err=>console.log(err))
    }
    render(){
        return(
            <UserProfile userData={this.state.user}/>
        )
    }
}