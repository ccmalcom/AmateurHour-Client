import React from 'react';
import './App.css';
import Landing from './components/landing/LandingDisplay'
import NavBar from './components/nav/Nav'
import {BrowserRouter as Router} from 'react-router-dom'

type AppState ={
  sessionToken: string | null,
  sessionUUID: number,
  sessionRole: string,
  isUserAuthenticated: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}){
    super(props);
    this.state={
      sessionToken: '' || null,
      sessionUUID: 0,
      sessionRole: '',
      isUserAuthenticated: false
    }
    this.updateToken = this.updateToken.bind(this);
    this.clearSession = this.clearSession.bind(this)
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({sessionToken: localStorage.getItem('token'), isUserAuthenticated: true})
    }
  }

  updateToken(newToken: string, newUserId: number, newRole: string){
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId.toString());
    localStorage.setItem('role', newRole)
    this.setState({sessionToken: newToken, sessionUUID: newUserId, sessionRole: newRole, isUserAuthenticated: true})
  }

  clearSession(){
    localStorage.clear();
    this.setState({sessionToken: '', isUserAuthenticated: false})
  }

  protectedViews(){
    return(localStorage.token ? <Router>
      <NavBar clickLogout={this.clearSession} isUserAuthenticated={this.state.isUserAuthenticated}/>
      </ Router> 
      : <Landing updateToken={this.updateToken} /> )
  }

  render(){
    return (
      <div className="App">
      {this.protectedViews()}
      </div>
  );
}
}

export default App;
