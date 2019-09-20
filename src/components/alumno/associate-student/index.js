import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

export default class PartnerUp extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return(
            <Modal show={this.props.show} onHide={this.props.showCloseFunction}>
                <Modal.Header closeButton>
                    <Modal.Title>SOCIO</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        );
    }
}