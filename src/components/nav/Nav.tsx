import { Route, Link, Switch } from 'react-router-dom';
import PeopleDisplay from '../people/PeopleDisplay';
import ProfileDisplay from '../profile/ProfileDisplay'
import GigIndex from '../gigs/GigIndex';
import styled from 'styled-components';
import logo from '../../assets/logo.png';


const NavBar = (props: any) =>{
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

    return(
        <div>
            <Nav>
                <Logo src={logo} alt="" />
                <NavLinks>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/people'>People</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <button onClick={props.clickLogout}>Logout</button>
                </NavLinks>
            </Nav>
            <div>
                <Switch>
                    <Route exact path='/'><GigIndex /></Route>
                    <Route exact path='/people'><PeopleDisplay /></Route>
                    <Route exact path='/profile'>< ProfileDisplay/></Route>
                </Switch>
            </div>
        </div>
    )
}

export default NavBar