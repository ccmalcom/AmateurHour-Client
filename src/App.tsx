import React from 'react';
import './App.css';
import Landing from './components/landing/LandingDisplay'
import NavBar from './components/nav/Nav'
import {BrowserRouter as Router} from 'react-router-dom'

type AppState ={
  sessionToken: string | null
  sessionUUID: number | null
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}){
    super(props);
    this.state={
      sessionToken: '' || null,
      sessionUUID: 0 || null
    }
    this.updateToken = this.updateToken.bind(this);
    this.clearSession = this.clearSession.bind(this)
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({sessionToken: localStorage.getItem('token')})
    }
  }

  updateToken(newToken: string, newUserId: number){
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId.toString())
    this.setState({sessionToken: newToken, sessionUUID: newUserId})
  }

  clearSession(){
    localStorage.clear();
    this.setState({sessionToken: ''})
  }

  protectedViews(){
    return(this.state.sessionToken === localStorage.getItem('token') ? <Router>
      <NavBar clickLogout={this.clearSession}/>
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
