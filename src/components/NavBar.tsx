import React from "react";
import { Container, Dropdown, Menu } from "semantic-ui-react";

export default function NavBar(){
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo"/>
                    SmartWork
                </Menu.Item>
                <Menu.Item name="Discover" />
                <Menu.Item name="Companies" />
                <Menu.Menu position='right'>
                    <Menu.Item name="Account" />
                    <Dropdown item text='Other'>
                    <Dropdown.Menu>
                        <Dropdown.Header>Text Size</Dropdown.Header>
                        <Dropdown.Item>Bookmarks</Dropdown.Item>
                        <Dropdown.Item>My subscriptions</Dropdown.Item>
                        <Dropdown.Item>Share SwartWork</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}