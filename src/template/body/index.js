import React, {Component} from 'react';
import { ListGroup } from 'react-bootstrap';
import {Route, Switch, Link} from 'react-router-dom';
import Alumno from '../../components/alumno'
import Socio from '../../components/socio'

import './body.css';

export default class Body extends Component {
    constructor(props, context){
        super(props);
    }

    render(){
        return(
            <div>
                {/* <Menu showSide = {this.props.showMenu} pathMatch={this.props.pathMatch}/> */}
                <ListGroup className="side-nav" style={this.props.showSide ? { "width": 0 } : {}}>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Inicio</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={`${this.props.pathMatch}/alumnos`}>Alumnos</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/home/socio"}>Socios</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Prestamos</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Equipos</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Ventas</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light" to={"/"}>Caja</Link>
            </ListGroup>
                <div className="main-container" style={this.props.showSide ? {"marginLeft": "1%"}:{}}>
                    <Switch>
                        <Route path={`${this.props.pathMatch}/alumnos`} component={Alumno} />
                        <Route path={"/home/socio"} component={Socio} />
                    </Switch>
                </div>
            </div>
        );
    }
}
