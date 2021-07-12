import { Route, Link, Switch, Redirect } from 'react-router-dom';
import PeopleIndex from '../people/PeopleIndex';
import ProfileIndex from '../profile/ProfileIndex'
import GigIndex from '../gigs/GigIndex';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
        width: 30%;
        align-items: center
    `

    const LOButton = styled.button`
        color: #FF9F1C;
        background-color: transparent;
        border: none;
        &:hover {
            color: #891A1C
        }
    `

    return (
        <div>
            <Nav>
                <Logo src={logo} alt="" />
                <NavLinks>
                    <li><Link className='NavLinks' to='/home'>Home</Link></li>
                    <li><Link className='NavLinks' to='/people'>People</Link></li>
                    <li><Link className='NavLinks' to='/profile'>Profile</Link></li>
                    <LOButton onClick={props.clickLogout}><FontAwesomeIcon icon={faSignOutAlt} size='2x' /></LOButton>
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
                                    null
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