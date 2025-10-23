import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../services/ApiClient';

export default class VoitureListe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: []
        };
    }

    componentDidMount(){
        this.findAllVoitures();
    }

    findAllVoitures = () => {
        apiClient.get("/api/voitures")
            .then(response => {
                console.log("Response:", response.data);
                // Récupérer les voitures depuis _embedded.voitures
                const voituresData = response.data._embedded ? response.data._embedded.voitures : [];
                this.setState({voitures: voituresData});
            })
            .catch((error) => {
                console.error("Error - "+error);
                this.setState({voitures: []});
            });
    }

    render() {
        const { voitures } = this.state;
        // S'assurer que voitures est un tableau
        const voituresList = Array.isArray(voitures) ? voitures : [];
        
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Liste des Voitures</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modele</th>
                                <th>Couleur</th>
                                <th>Immatricule</th>
                                <th>Année</th>
                                <th>Prix (€)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                voituresList.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">Aucune Voiture n'est disponible</td>
                                    </tr> :
                                    voituresList.map((voiture) => (
                                        <tr key={voiture.id}>
                                            <td>{voiture.marque}</td>
                                            <td>{voiture.modele}</td>
                                            <td>{voiture.couleur}</td>
                                            <td>{voiture.immatricule}</td>
                                            <td>{voiture.annee}</td>
                                            <td>{voiture.prix}</td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}