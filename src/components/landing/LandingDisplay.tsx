import React from 'react';
import Register from '../auth/Register'
import Login from '../auth/Login'
import styled from 'styled-components';
import regImg from '../../assets/landing-1.jpg';
import logImg from '../../assets/landing-2.jpg'
import logo from '../../assets/logo.png';

const LandingDiv = styled.div`
    display: flex;
    justify-content: space-evenly
`

const RegLeft = styled.div`
    height: 100vh;
    width: 50vw;
    background: linear-gradient( rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${regImg});
    background-size: cover;
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
    width: 50vw
`

const Logo = styled.img`
    margin-top: 10%;
    width: 30vw
`

const Text = styled.p`
    color: #E2DBCA;
    width: 50%;
    margin: 10% auto;
    font-size: calc(12px + 0.5vw)
`

const Heading = styled.h1`
    color: #E2DBCA;
    font-size: calc(36px + 1vw)
`

type AcceptedProps = {
    updateToken: (newToken: string) => void
}

type LandingState = {
    registerView: boolean
}

class Landing extends React.Component<AcceptedProps, LandingState>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            registerView: true
        }
        this.changeView = this.changeView.bind(this)
    }

    changeView() {
        this.setState((state) => {
            return { registerView: !state.registerView }
        })
        console.log(this.state.registerView);
    }


    render() {

        return (
            <div>
                {this.state.registerView ?
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
                                <br /> <br /> <br />
                                Sign up today, and keep playing.
                                </Text>
                                
                        </RegLeft>
                        <Form>
                            <Register updateToken={this.props.updateToken} changeView={this.changeView} />
                        </Form>
                    </LandingDiv>
                    :
                    <LandingDiv>
                        <LoginLeft>
                            <Heading>Good to see you again.</Heading>
                        </LoginLeft>
                        <Form>
                            <Login updateToken={this.props.updateToken} changeView={this.changeView} />
                        </Form>
                    </LandingDiv>}
            </div>
        )
    }
}

export default Landing;