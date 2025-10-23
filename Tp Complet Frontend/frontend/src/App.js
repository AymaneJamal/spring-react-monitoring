import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import Login from './Components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    const marginTop = {
        marginTop: "20px"
    };

    return (
        <Router>
            <div className="App">
                <NavigationBar/>
                <div className="main-content">
                    <Container style={marginTop}>
                        <Row>
                            <Col lg={12}>
                                <Routes>
                                    <Route path="/" element={<Bienvenue />} />
                                    <Route path="/add" element={<Voiture />} />
                                    <Route path="/list" element={<VoitureListe />} />
                                    <Route path="/login" element={<Login />} />
                                </Routes>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;