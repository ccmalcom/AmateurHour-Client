import React from "react";
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import { Label, Input } from "reactstrap";

const Logo = styled.img`
    width: 20vw
`
const Wrapper = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly
`

type AcceptedProps={
    updateToken: (newToken: string, newUserId: number, newRole: string) => void,
    changeView: () => void,
    isLoading: () => void
}

type LoginState={
    email: string,
    password: string,
}

export default class Login extends React.Component<AcceptedProps, LoginState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state={
            email: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: any){
        e.preventDefault()
        this.props.isLoading()
        fetch('https://ccm-amateurhour.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({
                user:{
                    emailAddress: this.state.email,
                    password: this.state.password,
                }}),
                headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        // .then(console.log)
        .then(data => this.props.updateToken(data.sessionToken, data.user.id, data.user.admin))
        .then(this.props.isLoading)
        .catch(err => console.log(err))
    }

    render(){
        return(
            <Wrapper className='register'>
                <Logo src={logo} alt="" />
            <form onSubmit={this.handleSubmit}>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input name='email' type='email' value={this.state.email} required onChange={(e) => this.setState({email: e.target.value})} />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input name='password' type='password' value={this.state.password} required onChange={(e) => this.setState({password: e.target.value})} />
                </div>
                <button type='submit'>Login</button>
                <br />
            </form>
                <p>No account?</p>
                <button onClick={this.props.changeView}>Register</button>
            </Wrapper>
        )
    }

}