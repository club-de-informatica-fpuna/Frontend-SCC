import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Alumno from '../../components/alumno';
import Socio from '../../components/socio';

export default class Container extends Component {
    constructor(props, context){
        super(props);
    }

    render(){

        return(
            <div className="main-container" style={this.props.showSide ? {"marginLeft": "1%"}:{}}>
                <Switch>
                    <Route path={`${this.props.pathMatch}/alumnos`} component={Alumno} />
                    <Route path={"/home/socio"} component={Socio} />
                </Switch>
            </div>
        );
    }
}