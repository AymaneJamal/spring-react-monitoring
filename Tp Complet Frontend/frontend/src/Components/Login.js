import React from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import authService from '../services/AuthService';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            isLoggedIn: false,
            isLoading: false
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            errorMessage: '' // Clear error message when user types
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        if (!email || !password) {
            this.setState({ errorMessage: 'Veuillez remplir tous les champs' });
            return;
        }

        // Stocker les credentials et rediriger
        authService.setCredentials(email, password);
        this.setState({ isLoggedIn: true });
    };

    render() {
        const { email, password, errorMessage, isLoggedIn, isLoading } = this.state;

        // Redirect if logged in
        if (isLoggedIn) {
            return <Navigate to="/" replace />;
        }

        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6} lg={4}>
                        <Card className="border border-dark bg-dark text-white">
                            <Card.Header className="text-center">
                                <FontAwesomeIcon icon={faSignInAlt} size="2x" className="mb-2" />
                                <h4>Connexion</h4>
                            </Card.Header>
                            <Card.Body>
                                {errorMessage && (
                                    <Alert variant="danger" className="mb-3">
                                        {errorMessage}
                                    </Alert>
                                )}
                                
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail" className="mb-3">
                                        <Form.Label>
                                            <FontAwesomeIcon icon={faUser} /> Username
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="user@app.com"
                                            name="email"
                                            value={email}
                                            onChange={this.handleInputChange}
                                            className="bg-dark text-white"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword" className="mb-3">
                                        <Form.Label>
                                            <FontAwesomeIcon icon={faLock} /> Mot de passe
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Entrez votre mot de passe"
                                            name="password"
                                            value={password}
                                            onChange={this.handleInputChange}
                                            className="bg-dark text-white"
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Connexion...
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faSignInAlt} /> Se connecter
                                            </>
                                        )}
                                    </Button>
                                </Form>
                                
                                <div className="text-center mt-3">
                                    <small className="text-muted">
                                        Entrez vos credentials Basic Auth
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;