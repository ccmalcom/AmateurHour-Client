import { Route, Link, Switch, Redirect } from 'react-router-dom';
import PeopleIndex from '../people/PeopleIndex';
import ProfileIndex from '../profile/ProfileIndex'
import GigIndex from '../gigs/GigIndex';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import Landing from '../landing/LandingDisplay';

type AcceptedProps = {
    clickLogout: () => void,
    isUserAuthenticated: boolean
}


const NavBar = (props: AcceptedProps) => {
    const Nav = styled.nav`
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 60px;
    background-color: #0f0f0f;
    padding: 0 8%;
    `

    const Logo = styled.img`
    height: 50px;
    width: 200px;
    `

    const NavLinks = styled.div`
        display: flex;
        justify-content: space-between;
        text-decoration: none !important
    `

    return (
        <div>
            <Nav>
                <Logo src={logo} alt="" />
                <NavLinks>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/people'>People</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <button onClick={props.clickLogout}>Logout</button>
                </NavLinks>
            </Nav>
            <div>
                <Switch>
                    <Route exact path='/home'><GigIndex /></Route>
                    {/* <Route exact path='/landing'><Landing /></Route> */}
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                props.isUserAuthenticated ?
                                    <Redirect to="/home" /> :
                                    <Redirect to="/" />
                            )
                        }} />
                    <Route exact path='/people'><PeopleIndex /></Route>
                <Route exact path='/profile'>< ProfileIndex clearSession={props.clickLogout}/></Route>
                </Switch>
        </div>
        </div >
    )
}

export default NavBar