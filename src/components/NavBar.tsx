import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoginForm from "./users/LoginForm";
import RegisterForm from "./users/RegisterForm";


export default observer(function NavBar(){
    const{userStore: {user, isLoggedIn, logout}, modalStore, commonStore} = useStore()
    
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo"/>
                    SmartWork
                </Menu.Item>
                <Menu.Item as={NavLink} to='/offices' name="Discover" />
                <Menu.Item as={NavLink} to='/companies' name="Companies" />
                <Menu.Item>
                    <Button as={NavLink} to='/addOffice' positive content='Add office' />
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/addCompany' positive content='Add company' />
                </Menu.Item>

                <Menu.Item position='right'>
                   
                    {isLoggedIn === false ? (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />, 'mini')} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />, 'mini')} size='huge' inverted>
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <Image src={user?.image || commonStore.imageBasePath + '/user.png'} avatar spased='right' />
                                <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My profile'/>
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    )}
                </Menu.Item>
            </Container>
        </Menu>
    )
})