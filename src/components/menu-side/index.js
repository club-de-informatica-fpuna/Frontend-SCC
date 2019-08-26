import React, {Component} from  'react';
import {ListGroup} from 'react-bootstrap';

export default class Menu extends Component {
    constructor(props, context) {
        super(props);
    }

    render(){
        return(
            <div className="side-nav" style={this.props.showSide ? {"width":0} : {} }>
                <ListGroup>
                    <ListGroup.Item action variant="dark">Socios</ListGroup.Item>
                    <ListGroup.Item action variant="dark">Alumnos</ListGroup.Item>
                    <ListGroup.Item action variant="dark">Prestamos</ListGroup.Item>
                    <ListGroup.Item action variant="dark">Equipos</ListGroup.Item>
                    <ListGroup.Item action variant="dark">Ventas</ListGroup.Item>
                    <ListGroup.Item action variant="dark">Caja</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}