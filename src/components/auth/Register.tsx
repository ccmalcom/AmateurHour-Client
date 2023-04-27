import React, { FormEvent } from "react";
import { Tooltip, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { getDatabase, ref, set } from "firebase/database";
import { Auth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../firebase.js";

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%
`
const FormContainer = styled.form`
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const RegisterDiv = styled.div`
    height: 100%;
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
    width: 50%;
    padding: 10px 0;
    margin: 0 auto 30px;
    background-color: #891A1C;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 20px
    `
const TryIt = styled.button`
    width: 75px;
    height: 75px;
    margin: 0 auto;
    background-color: #891A1C;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 50%

`

type AcceptedProps = {
    updateToken: () => void,
    changeView: () => void,
    handleTryIt: () => void
}

type RegisterState = {
    firstName: string,
    lastName: string,
    email: string,
    zipcode: number | undefined,
    password: string,
    instrumentString: string,
    instrument: Array<string>, //!should be array of strings
    genre: Array<string>, //! should be array of strings
    admin: string,
    tooltipOpen: boolean,
    loading: boolean
}

export default class Register extends React.Component<AcceptedProps, RegisterState>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            zipcode: undefined, //!should be num
            email: '',
            password: '',
            instrumentString: '',
            instrument: [], //! should be array of strings
            genre: [], //! should be array of strings
            admin: 'User',
            tooltipOpen: false,
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggle = this.toggle.bind(this)
    }


    toggle() {
        this.setState((state) => {
            return { tooltipOpen: !state.tooltipOpen }
        })
    }
    async handleSubmit(e: FormEvent) {
        e.preventDefault()
        this.isLoading()
        console.log('handling submit');
        await createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential: UserCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('user created: ', user);
            this.props.updateToken();
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error creating user: ', errorCode, errorMessage);
            // ..
        });
        this.isLoading()

        // const db = getDatabase();
        // set(ref(db, 'users/' + this.state.email), {
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     zipCode: this.state.zipcode,
        //     emailAddress: this.state.email,
        //     password: this.state.password,
        //     instrument: this.state.instrument,
        //     genre: this.state.genre,
        //     admin: this.state.admin
        // })

        // .catch(err => console.log(err))
    }
    isLoading() {
        this.setState((state) => { return { loading: !state.loading } })
    }

    render() {
        return (
            <>
                {this.state.loading ? <LoaderDiv>
                    <Loader type='Audio' color='#FF9F1C' />
                </LoaderDiv> :
                    <RegisterDiv className='register'>
                        <FormContainer onSubmit={this.handleSubmit}>
                            <FlexDiv>
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input name='firstName' placeholder='John' value={this.state.firstName} required onChange={(e) => this.setState({ firstName: e.target.value })} />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input name='lastName' placeholder='Doe' value={this.state.lastName} required onChange={(e) => this.setState({ lastName: e.target.value })} />
                                </div>
                                <div>
                                    <Label htmlFor="zipCode">Zipcode</Label>
                                    <Input name='zipCode' type='text' value={this.state.zipcode} placeholder='90210' required onChange={(e) => this.setState({ zipcode: Number(e.target.value) })} />
                                </div>
                            </FlexDiv>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input name='email' type='email' value={this.state.email} required placeholder='someone@email.com' onChange={(e) => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input name='password' id='password' type='password' pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' value={this.state.password} required onChange={(e) => this.setState({ password: e.target.value })} />
                                <Tooltip placement='right' isOpen={this.state.tooltipOpen} target='password' toggle={this.toggle}>Password must: <ul>
                                    <li>Be at least 8 characters</li>
                                    <li>Contain at least 1 Uppercase letter</li>
                                    <li>Contain at least 1 Number</li>
                                    <li>May contain special characters (not required)</li>
                                </ul></Tooltip>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="instrument">Instrument(s)</Label>
                                <Input name='instrument' value={this.state.instrument} placeholder='Trumpet, Guitar' onChange={(e) => this.setState({ instrument: Array(e.target.value) })} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="genre">Genre(s)</Label>
                                <Input name='genre' value={this.state.genre} placeholder='Rock, Jazz' onChange={(e) => this.setState({ genre: Array(e.target.value) })} />
                            </FormGroup>
                            <Button type='submit'>Get Started</Button>
                        </FormContainer>
                        <p>Already have an account?</p>
                        <Button2 onClick={this.props.changeView}>Login</Button2>
                        <p>Not ready to sign up? Click below for a sample view</p>
                        <TryIt onClick={() => { this.props.handleTryIt(); this.isLoading() }}>Try it</TryIt>
                    </RegisterDiv>
                }
            </>
        )
    }

}