import "../styles/swNavbar.css"
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";

function SWNavbar(){
    return(
        <div className="swNavbar">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <span className="brand-name">SmartWork</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#discover">Discover</Nav.Link>
                            <Nav.Link href="#companies">Companies</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#account">My account</Nav.Link>
                            <NavDropdown title="Other">
                                <NavDropdown.Item href="#bookmarks">Bookmarks</NavDropdown.Item>
                                <NavDropdown.Item href="#mySubscriptions">My subscriptions</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#shareLink">Share SwartWork</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default SWNavbar;