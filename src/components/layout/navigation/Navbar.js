import {Container, Nav, Navbar} from "react-bootstrap";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NavBar() {
    if (window.sessionStorage.getItem("token") == null) {
        window.location.replace('/')
    }
    function logOut() {
        window.sessionStorage.clear();
    }
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Nav.Link href="/home">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/parkimiskoht/koik">Kõik parkimiskohad</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/parkimiskoht/lopeta">Lõpeta parkimiskoht</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/parkimiskoht/koondaruanne">Parkimiskohtade koondaruanne</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Navbar.Text>
                        Signed in as: <a href="/" onClick={logOut}>{sessionStorage.getItem("email")}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}