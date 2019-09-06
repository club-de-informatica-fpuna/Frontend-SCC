import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Alumno from '../../components/alumno';
import Socio from '../../components/socio';
import Inicio from '../../components/inicio';
import Prestamos from "../../components/prestamos";

export default class Container extends Component {
    constructor(props, context){
        super(props);
    }

    render(){

        return(
            <div className="main-container" style={{marginLeft: this.props.showSide ? "1%" : "16%"}}>
                <Switch>
                    <Route path={`${this.props.pathMatch}/alumnos`} component={Alumno} />
                    <Route path={`${this.props.pathMatch}/socios`} component={Socio} />
                    <Route path={`${this.props.pathMatch}/prestamos`} component={Prestamos} />                    
                    <Route path={`${this.props.pathMatch}`} component={Inicio} />
                </Switch>
            </div>
        );
    }
}