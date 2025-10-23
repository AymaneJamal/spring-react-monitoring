import React from 'react';
import {Container} from 'react-bootstrap';

export default class Bienvenue extends React.Component {
    render() {
        return (
            <Container className="bg-dark text-white p-5">
                <h1>Bienvenue au Magasin des Voitures</h1>
                <blockquote className="blockquote mb-0">
                    <p>Le meilleur de nos voitures est exposé près de chez vous</p>
                    <footer className="blockquote-footer">Master MIOLA</footer>
                </blockquote>
            </Container>
        );
    }
}