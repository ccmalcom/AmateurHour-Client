import React, { FormEvent } from "react";
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import { Label, Input, Form, FormGroup } from "reactstrap";
import Loader from 'react-loader-spinner';


const Logo = styled.img`
    width: 20vw
`
const Wrapper = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: #891A1C;
    font-weight: bold
`
const ErrorBox = styled.div`
    border: 1px solid #891A1C;
    padding: 20px;
    background-color: #F5CCCD;
    color: #891A1C;
    font-weight: bold
`

const LoaderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%
`
const Button = styled.button`
    width: 50%;
    padding: 10px 0;
    margin: 0 auto;
    background-color: #FF9F1C;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 20px
    `
    const Button2 = styled.button`
    width: 100%;
    padding: 10px 0;
    margin: 0 auto 30px;
    background-color: #891A1C;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 20px
    `

type AcceptedProps = {
    updateToken: (newToken: string, newUserId: number, newRole: string) => void,
    changeView: () => void,
}

type LoginState = {
    email: string,
    password: string,
    errorDisplay: boolean,
    loading: boolean
}

export default class Login extends React.Component<AcceptedProps, LoginState>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorDisplay: false,
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault()
        this.isLoading()
        fetch('https://ccm-amateurhour.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    emailAddress: this.state.email,
                    password: this.state.password,
                }
            }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
            .then((res) => { if (res.status === 200) { return res.json() } else { this.showErrorBox(); this.isLoading() } })
            // .then(console.log)
            .then(data => this.props.updateToken(data.sessionToken, data.user.id, data.user.admin))
            .then(this.isLoading)
            .catch(err => console.log(err))
    }

    showErrorBox() {
        this.setState({ errorDisplay: true })
    }
    isLoading() {
        this.setState((state) => { return { loading: !state.loading } })
    }

    render() {
        return (
            <Wrapper className='register'>
                <Logo src={logo} alt="" />
                {this.state.errorDisplay ?
                    <ErrorBox>
                        Incorrect Email or Password
                    </ErrorBox>
                    : null}
                {this.state.loading ?
                    <LoaderDiv>
                        <Loader type='Audio' color='#FF9F1C' />
                    </LoaderDiv> :
                    <>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input name='email' type='email' value={this.state.email} required onChange={(e) => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input name='password' type='password' value={this.state.password} required onChange={(e) => this.setState({ password: e.target.value })} />
                            </FormGroup>
                            <br />
                            <Button type='submit'>Login</Button>
                            <br />
                        </Form>
                        <div>
                        <p>No account?</p>
                        <Button2 onClick={this.props.changeView}>Register</Button2>
                        </div>
                    </>
                }
            </Wrapper>
        )
    }

}