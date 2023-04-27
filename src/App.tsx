import React from 'react';
import './App.css';
import Landing from './components/landing/LandingDisplay'
import NavBar from './components/nav/Nav'
import { BrowserRouter as Router } from 'react-router-dom'
import { auth } from './firebase';


type AppState = {
  sessionToken: string | null,
  sessionUUID: string,
  sessionRole: string,
  isUserAuthenticated: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: '' || null,
      sessionUUID: '',
      sessionRole: '',
      isUserAuthenticated: false
    }
    this.clearSession = this.clearSession.bind(this);
    this.updateAuthState = this.updateAuthState.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ sessionToken: localStorage.getItem('token'), isUserAuthenticated: true })
    }
  }

  updateAuthState() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('setting state: ', user.uid);
        user.getIdToken().then(token => {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', user.uid);
          localStorage.setItem('role', 'User')
          this.setState({ sessionToken: token, sessionUUID: user.uid, isUserAuthenticated: true })
        })
      }
    })
  }


  clearSession() {
    localStorage.clear();
    this.setState({ sessionToken: '', isUserAuthenticated: false, sessionUUID: '', sessionRole: '' })
  }

  protectedViews() {
    return (localStorage.token === this.state.sessionToken && this.state.sessionToken !== '' ? <Router>
      <NavBar clickLogout={this.clearSession} isUserAuthenticated={this.state.isUserAuthenticated} />
    </ Router>
      : <Landing updateToken={this.updateAuthState} />)
  }

  render() {
    return (
      <div className="App">
        {this.protectedViews()}
      </div>
    );
  }
}

export default App;
