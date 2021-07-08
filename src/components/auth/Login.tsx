import React from "react";
import logo from '../../assets/logo.png';
import styled from 'styled-components';

const Logo = styled.img`
    width: 20vw
`

type AcceptedProps={
    updateToken: (newToken: string, newUserId: number) => void,
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
        .then(data => this.props.updateToken(data.sessionToken, data.user.id))
        .then(this.props.isLoading)
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div className='register'>
                <Logo src={logo} alt="" />
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name='email' type='email' value={this.state.email} required onChange={(e) => this.setState({email: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name='password' type='password' value={this.state.password} required onChange={(e) => this.setState({password: e.target.value})} />
                </div>
                <button type='submit'>Login</button>
                <br />
            </form>
                <p>No account?</p>
                <button onClick={this.props.changeView}>Register</button>
            </div>
        )
    }

}