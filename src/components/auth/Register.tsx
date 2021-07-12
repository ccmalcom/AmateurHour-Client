import React from "react";
import { Tooltip, Form, FormGroup, Input, Label } from 'reactstrap';
import styled from 'styled-components';

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
    height: 100%
`
type AcceptedProps={
    updateToken: (newToken: string, newUserId: number, newRole: string) => void,
    changeView: () => void,
    isLoading: () => void,
    handleSubmit: ()=>void
}

type RegisterState={
    firstName: string,
    lastName: string,
    email: string,
    zipcode: number, //!should be num
    password: string,
    instrumentString: string,
    instrument: Array<string>, //!should be array of strings
    genre: Array<string>, //! should be array of strings
    admin: string,
    tooltipOpen: boolean
}

export default class Register extends React.Component<AcceptedProps, RegisterState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state={
            firstName: '',
            lastName: '',
            zipcode: 12345, //!should be num
            email: '',
            password: '',
            instrumentString: '',
            instrument: [], //! should be array of strings
            genre: [], //! should be array of strings
            admin: 'User',
            tooltipOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState((state)=>{
            return {tooltipOpen: !state.tooltipOpen}
        })
    }
    handleSubmit(e: any){
        e.preventDefault()
        this.props.isLoading()
        console.log('handling submit');
        // this.toArray()
        fetch('https://ccm-amateurhour.herokuapp.com/user/register', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ //!stringify wont work for instrument/genre, how do fix?
                user:{
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    zipCode: this.state.zipcode,
                    emailAddress: this.state.email,
                    password: this.state.password,
                    instrument: this.state.instrument,
                    genre: this.state.genre,
                    admin: this.state.admin
                }})
        })
        .then(res => res.json())
        // .then(console.log)
        .then(data => this.props.updateToken(data.sessionToken, data.user.id, data.user.admin))
        .then(this.props.isLoading)
        .catch(err => console.log(err))
    }

    toArray(){
        this.setState({instrument: this.state.instrumentString.split(',')})
        console.log(this.state.instrument);
    }

    // handleChange = (e) => {
    //     let value = Array.from(e.target.selectedOptions, option => option.value);
    //     this.setState({instrument: value});
    // }

    render(){
        return(
            <RegisterDiv className='register'>
            <FormContainer onSubmit={this.handleSubmit}>
                <FlexDiv>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input name='firstName' value={this.state.firstName} required onChange={(e) => this.setState({firstName: e.target.value})} />
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input name='lastName' value={this.state.lastName} required onChange={(e) => this.setState({lastName: e.target.value})} />
                    <Label htmlFor="zipCode">Zipcode</Label>
                    <Input name='zipCode' type='number' value={this.state.zipcode} required onChange={(e) => this.setState({zipcode: Number(e.target.value)})} />
                </FlexDiv>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input name='email' type='email' value={this.state.email} required onChange={(e) => this.setState({email: e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input name='password' id='password' type='password' pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'value={this.state.password} required onChange={(e) => this.setState({password: e.target.value})} />
                    <Tooltip placement='right' isOpen={this.state.tooltipOpen} target='password' toggle={this.toggle}>Password must: <ul>
                        <li>Be at least 8 characters</li>
                        <li>Contain at least 1 Uppercase letter</li>
                        <li>Contain at least 1 Number</li>
                        <li>May contain special characters (not required)</li>
                        </ul></Tooltip>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="instrument">Instrument(s)</Label>
                    <Input name='instrument' value={this.state.instrument} placeholder='Trumpet, Guitar'required onChange={(e) => this.setState({instrument: Array(e.target.value)})} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="genre">Genre(s)</Label>
                    <Input name='genre' value={this.state.genre} required onChange={(e) => this.setState({genre: Array(e.target.value)})} />
                </FormGroup>
                <button type='submit'>Get Started</button>
                <br />
            </FormContainer>
                <p>Already have an account?</p>
                <button onClick={this.props.changeView}>Login</button>
                <p>Not ready to sign up? Click below for a sample view</p>
                                <button onClick={this.props.handleSubmit}>Try it</button>
            </RegisterDiv>
        )
    }

}