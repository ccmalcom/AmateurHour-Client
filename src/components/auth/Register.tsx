import React from "react";

type AcceptedProps={
    updateToken: (newToken: string) => void,
    changeView: () => void,
    isLoading: () => void
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
            instrument: ['Trumpet'], //! should be array of strings
            genre: ['Jazz'], //! should be array of strings
            admin: 'User'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    instrument:null,
                    genre: null,
                    admin: this.state.admin
                }})
        })
        .then(res => res.json())
        // .then(console.log)
        .then(data => this.props.updateToken(data.sessionToken))
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
            <div className='register'>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input name='firstName' value={this.state.firstName} required onChange={(e) => this.setState({firstName: e.target.value})} />
                    <label htmlFor="lastName">Last Name</label>
                    <input name='lastName' value={this.state.lastName} required onChange={(e) => this.setState({lastName: e.target.value})} />
                    <label htmlFor="zipCode">Zipcode</label>
                    <input name='zipCode' type='number' value={this.state.zipcode} required onChange={(e) => this.setState({zipcode: Number(e.target.value)})} />
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
                    {/* <input name='instrument' value={this.state.instrument} required onChange={(e) => this.setState({instrument: e.target.value})} /> */}
                    {/* <select name="instrument" id="instrument" multiple onChange={(e) => {this.setState({instrumentString: e.target.value})
                console.log(e.target.options)}}>
                        <option value="trumpet,">Trumpet</option>
                        <option value="guitar,">Guitar</option>
                        <option value="bass,">Bass</option>
                    </select> */}
                </div>
                <div>
                    <label htmlFor="genre">Genre(s)</label>
                    {/* <input name='genre' value={this.state.genre} required onChange={(e) => this.setState({genre: e.target.value})} /> */}
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