import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import authService from '../services/AuthService';

class NavigationBar extends React.Component {
    
    handleLogout = () => {
        authService.logout();
        window.location.href = '/login'; // Rediriger vers la page de login
    };

    render() {
        const isAuthenticated = authService.isAuthenticated();
        
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        Voiture Shop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Accueil</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/add">
                            <Nav.Link>Ajouter Voiture</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/list">
                            <Nav.Link>Liste Voitures</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;