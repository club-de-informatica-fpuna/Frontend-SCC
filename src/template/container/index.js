import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Alumno from '../../components/alumno';
import Socio from '../../components/socio';
import Inicio from '../../components/inicio';
import Prestamos from "../../components/prestamos";
import Equipos from "../../components/equipos";
import Productos from "../../components/productos";
import Ventas from "../../components/ventas";
import Report from "../../components/report";

export default class Container extends Component {

    render(){

        return(
            <div className="main-container">
                <Switch>
                    <Route path={`${this.props.pathMatch}/alumnos`} component={Alumno} />
                    <Route path={`${this.props.pathMatch}/socios`} component={Socio} />
                    <Route path={`${this.props.pathMatch}/prestamos`} component={Prestamos} />                    
                    <Route path={`${this.props.pathMatch}/equipos`} component={Equipos} />
                    <Route path={`${this.props.pathMatch}/productos`} component={Productos} />
                    <Route path={`${this.props.pathMatch}/ventas`} component={Ventas} />
                    <Route path={`${this.props.pathMatch}/reporte`} component={Report} />
                    <Route path={`${this.props.pathMatch}`} component={Inicio} />
                </Switch>
            </div>
        );
    }
}