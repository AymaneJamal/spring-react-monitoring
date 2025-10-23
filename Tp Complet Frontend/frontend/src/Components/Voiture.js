import React, {Component} from 'react';
import {Card, Form, Button, Col, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import apiClient from '../services/ApiClient';

export default class Voiture extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
    }

    initialState = {
        marque:'',
        modele:'',
        couleur:'',
        immatricule:'',
        prix:'',
        annee:'',
        show: false
    }

    resetVoiture = () => {
        this.setState(() => this.initialState);
    };

    submitVoiture = event => {
        event.preventDefault();
        
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: this.state.annee,
            prix: this.state.prix
        };

        apiClient.post("/api/voitures", voiture)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false}), 3000);
                } else {
                    this.setState({show: false});
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    voitureChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    render() {
        const {marque, modele, couleur, immatricule, prix, annee} = this.state;
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast children={{show:this.state.show, message:"Voiture ajoutée avec succès", type: "success"}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare} /> Ajouter une Voiture
                    </Card.Header>
                    <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col} controlId="formGridMarque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control 
                                        required 
                                        name="marque" 
                                        type="text" 
                                        value={marque} 
                                        autoComplete="off"
                                        onChange={this.voitureChange} 
                                        className={"bg-dark text-white"} 
                                        placeholder="Entrez Marque Voiture" 
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridModele">
                                    <Form.Label>Modele</Form.Label>
                                    <Form.Control 
                                        required 
                                        value={modele} 
                                        name="modele" 
                                        autoComplete="off"
                                        type="text" 
                                        onChange={this.voitureChange} 
                                        className={"bg-dark text-white"} 
                                        placeholder="Entrez Modele Voiture"
                                    />
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} controlId="formGridCouleur">
                                <Form.Label>Couleur</Form.Label>
                                <Form.Control 
                                    required 
                                    value={couleur} 
                                    name="couleur" 
                                    autoComplete="off"
                                    type="text" 
                                    onChange={this.voitureChange} 
                                    className={"bg-dark text-white"} 
                                    placeholder="Entrez Couleur Voiture"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridImmatricule">
                                <Form.Label>Immatricule</Form.Label>
                                <Form.Control 
                                    required 
                                    value={immatricule} 
                                    name="immatricule" 
                                    autoComplete="off"
                                    type="text" 
                                    onChange={this.voitureChange} 
                                    className={"bg-dark text-white"} 
                                    placeholder="Entrez Immatricule"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPrix">
                                <Form.Label>Prix (€)</Form.Label>
                                <Form.Control 
                                    required 
                                    value={prix} 
                                    name="prix" 
                                    autoComplete="off"
                                    type="number" 
                                    min="0"
                                    step="0.01"
                                    onChange={this.voitureChange} 
                                    className={"bg-dark text-white"} 
                                    placeholder="Entrez Prix Voiture"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAnnee">
                                <Form.Label>Année</Form.Label>
                                <Form.Control 
                                    required 
                                    value={annee} 
                                    name="annee" 
                                    autoComplete="off"
                                    type="number" 
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    onChange={this.voitureChange} 
                                    className={"bg-dark text-white"} 
                                    placeholder="Entrez Année Voiture"
                                />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}