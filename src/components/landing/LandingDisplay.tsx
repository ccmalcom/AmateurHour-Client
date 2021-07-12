import React from 'react';
import Register from '../auth/Register'
import Login from '../auth/Login'
import styled from 'styled-components';
import regImg from '../../assets/landing-1.jpg';
import logImg from '../../assets/landing-2.jpg'
import logo from '../../assets/logo.png';
import Loader from 'react-loader-spinner';

const LandingDiv = styled.div`
    display: flex;
    justify-content: space-evenly
`

const RegLeft = styled.div`
    height: 100vh;
    width: 50vw;
    background: linear-gradient( rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${regImg});
    background-size: cover;
    padding: 5%
`

const LoginLeft = styled.div`
    height: 100vh;
    width: 50vw;
    background: linear-gradient( rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${logImg});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E2DBCA

`
const Form = styled.div`
    height: 100vh;
    width: 50vw;
    padding: 5% 5%;
`

const Logo = styled.img`
    width: 30vw
`

const Text = styled.p`
    color: #E2DBCA;
    width: 50%;
    margin: 10% auto 5% auto;
    font-size: calc(12px + 0.5vw)
`


const Heading = styled.h1`
    color: #E2DBCA;
    font-size: calc(36px + 1vw)
`

const LoaderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh
`



type AcceptedProps = {
    updateToken: (newToken: string, newUserId: number, newRole: string) => void
}

type LandingState = {
    registerView: boolean,
    loading: boolean
}

class Landing extends React.Component<AcceptedProps, LandingState>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            registerView: true,
            loading: false
        }
        this.changeView = this.changeView.bind(this);
        this.isLoading = this.isLoading.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeView() {
        this.setState((state) => {
            return { registerView: !state.registerView }
        })
        console.log(this.state.registerView);
    }

    isLoading() {
        this.setState((state) => { return { loading: !state.loading } })
    }

    handleSubmit(){
        this.isLoading()
        fetch('https://ccm-amateurhour.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({
                user:{
                    emailAddress: 'jdoe@gmail.com',
                    password: 'password',
                }}),
                headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        // .then(console.log)
        .then(data => this.props.updateToken(data.sessionToken, data.user.id, data.user.admin))
        .then(this.isLoading)
        .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div>
                {this.state.registerView ?
                    <div>
                        {this.state.loading ? 
                        <LoaderDiv>
                            <Loader type='Audio' color='#FF9F1C' />
                        </LoaderDiv> 
                        : 
                        <LandingDiv>
                            <RegLeft>
                                <Logo src={logo} alt="" />
                                <Text>40% of people participate in music in
                                    high school, but most of us don't continue
                                    afterwards. In modern American culture,
                                    unless you are a career musician, there are
                                    limited opportunities for continued musical
                                    performance outside of school. AmateurHour
                                    seeks to change that by connecting those of us
                                    who still love to play, but aren't in an orchestra.
                                    <br /> <br />
                                    Sign up today, and keep playing.
                                </Text>
                            </RegLeft>
                            <Form>
                                <Register updateToken={this.props.updateToken} changeView={this.changeView} isLoading={this.isLoading} handleSubmit={this.handleSubmit}/>
                            </Form>
                        </LandingDiv>}
                    </div>
                    :
                    <div>
                        {this.state.loading ? 
                        <LoaderDiv>
                            <Loader type='Audio' color='#FF9F1C' />
                        </LoaderDiv>                         
                        :
                            <LandingDiv>
                                <LoginLeft>
                                    <Heading>Good to see you again.</Heading>
                                </LoginLeft>
                                <Form>
                                    <Login updateToken={this.props.updateToken} changeView={this.changeView} isLoading={this.isLoading} />
                                </Form>
                            </LandingDiv>}
                    </div>
                }
            </div>
        )
    }
}

export default Landing;