import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoginForm from "./users/LoginForm";

export default observer(function NavBar(){
    const{userStore: {user, isLoggedIn, logout}, modalStore} = useStore()

    console.log(isLoggedIn)

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo"/>
                    SmartWork
                </Menu.Item>
                <Menu.Item as={NavLink} to='/offices' name="Discover" />
                <Menu.Item name="Companies" />
                <Menu.Item>
                    <Button as={NavLink} to='/addOffice' positive content='Add office' />
                </Menu.Item>

                <Menu.Item position='right'>
                   
                    {isLoggedIn === false ? (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<h1>Register</h1>)} size='huge' inverted>
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <Image src={user?.image || 'assets/user.png'} avatar spased='right' />
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