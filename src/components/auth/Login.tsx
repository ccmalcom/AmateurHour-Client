import React from "react";
import logo from '../../assets/logo.png';
import styled from 'styled-components';

const Logo = styled.img`
    width: 20vw
`

type AcceptedProps={
    updateToken: (newToken: string) => void,
    changeView: () => void
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
    }

    handleSubmit(e: any){
        e.preventDefault()

        fetch('https://ccm-amateurhour.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({
                user:{
                    email: this.state.email,
                    password: this.state.password,
                }}),
                headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => this.props.updateToken(data.sessionToken))
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
                <p>No account?</p>
                <button onClick={this.props.changeView}>Register</button>

            </form>
            </div>
        )
    }

}