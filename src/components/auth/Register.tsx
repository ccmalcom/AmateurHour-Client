import React from "react";

type AcceptedProps={
    updateToken: (newToken: string) => void,
    changeView: () => void
}

type RegisterState={
    firstName: string,
    lastName: string,
    email: string,
    zipcode: string, //!should be num
    password: string,
    instrument: string, //!should be array of strings
    genre: string, //! should be array of strings
    admin: string,

}

export default class Register extends React.Component<AcceptedProps, RegisterState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state={
            firstName: '',
            lastName: '',
            zipcode: '', //!should be num
            email: '',
            password: '',
            instrument: '', //! should be array of strings
            genre: '', //! should be array of strings
            admin: 'User'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: any){
        e.preventDefault()

        fetch('https://ccm-amateurhour.herokuapp.com/user/register', {
            method: 'POST',
            body: JSON.stringify({ //!stringify wont work for zipcode/instrument/genre, how do fix?
                user:{
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    zipCode: this.state.zipcode,
                    email: this.state.email,
                    password: this.state.password,
                    instrument: this.state.instrument,
                    genre: this.state.genre,
                    admin: this.state.admin
                }}),
                headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => this.props.updateToken(data.sessionToken))
    }

    render(){
        return(
            <div className='register'>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input name='firstName' value={this.state.firstName} required onChange={(e) => this.setState({firstName: e.target.value})} />
                    <label htmlFor="lastName">Last Name</label>
                    <input name='lastName' value={this.state.lastName} required onChange={(e) => this.setState({lastName: e.target.value})} />
                    <label htmlFor="zipCode">Zipcode</label>
                    <input name='zipCode' value={this.state.zipcode} required onChange={(e) => this.setState({zipcode: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name='email' type='email' value={this.state.email} required onChange={(e) => this.setState({email: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name='password' type='password' value={this.state.password} required onChange={(e) => this.setState({password: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="instrument">Instrument(s)</label>
                    <input name='instrument' value={this.state.instrument} required onChange={(e) => this.setState({instrument: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="genre">Genre(s)</label>
                    <input name='genre' value={this.state.genre} required onChange={(e) => this.setState({genre: e.target.value})} />
                </div>
                <button type='submit'>Get Started</button>
                <br />
            </form>
                <p>Already have an account?</p>
                <button onClick={this.props.changeView}>Login</button>
            </div>
        )
    }

}