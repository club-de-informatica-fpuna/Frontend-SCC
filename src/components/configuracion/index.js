import React, { Component } from 'react';
import axios from "axios";
import { FaRegGrinBeamSweat, FaTrash } from "react-icons/fa";
import Notifications, { notify } from 'react-notify-toast';
import { Nav, Table, Button } from "react-bootstrap";
import NuevaCarrera from './nuevaCarrera';

export default class Configuracion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carreras: [],
            optionSelected: 1,
            loading: false,
            showNuevaCarrera: false
        };
    }

    componentWillMount() {
        this.getCarreras();
    }

    render() {
        var tableResults = <><tr><td style={{ borderTop: "none" }} ><FaRegGrinBeamSweat style={{ height: "4em", width: "4em" }} /></td></tr>&nbsp;<tr>NO SE HAN ENCONTRADO RESULTADOS!!!</tr></>;
        var haveResults = false;
        var carreras = this.state.carreras;
        if (carreras !== undefined && carreras.length > 0) {
            haveResults = true;
            tableResults = carreras.map((i) => (
                <tr key={i.idCarrera} style={{ cursor: "pointer" }}>
                    <td style={{ textAlign: "left", verticalAlign: "middle" }}>{i.denominacion}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                        <Button size="sm" variant="danger" onClick={(e)=>{this.deleteCarrera(e, i.idCarrera)}}><FaTrash /></Button>
                    </td>
                </tr>
            ));
        }
        return (
            <section>
                <Notifications />
                <NuevaCarrera show={this.state.showNuevaCarrera} close={this.closeRegistrarCarrera.bind(this)} save={this.saveCarrera.bind(this)} />
                <section className="col-md-12">
                    <Nav variant="tabs" defaultActiveKey={1} onSelect={this.changeSelected.bind(this)}>
                        <Nav.Item>
                            <Nav.Link href="#carreras" eventKey={1}>Carreras</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#notificaciones" eventKey={2}>Notificaciones</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </section>
                <section hidden={!(this.state.optionSelected == 1)} className="col-md-4" style={{ marginTop: "20px" }} >
                    <Button onClick={this.showRegistrarCarrera.bind(this)}>Nueva carrera</Button>
                    <Table hover={haveResults} responsive style={{ fontSize: "12px", marginTop: "10px", textAlign: haveResults ? "" : "center" }}>
                        <thead hidden={!haveResults} style={{ background: "#343a40", color: "white" }}>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableResults}
                        </tbody>
                    </Table>
                </section>
                <section hidden={!(this.state.optionSelected == 2)} className="col-md-12">

                </section>
            </section>
        );
    }

    closeRegistrarCarrera() {
        this.setState({ showNuevaCarrera: false });
    }

    showRegistrarCarrera() {
        this.setState({ showNuevaCarrera: true });
    }

    getCarreras() {
        this.setState({ loading: true });
        axios.get(process.env.REACT_APP_API_URL + "/carreras")
            .then(res => {
                this.setState({ carreras: res.data, loading: false });
            })
            .catch(error => {
                this.setState({ carreras: [], loading: false });
            });
    }

    saveCarrera(e, carrera) {
        axios.post(process.env.REACT_APP_API_URL + "/carreras", carrera)
            .then(res => {
                notify.show("Se ha registrado la carrera correctamente", "success");
                this.setState({ showNuevaCarrera: false }, this.getCarreras);
            })
            .catch(error => {
                notify.show("Ha ocurrido un error al registrar la carrera", "error");
                this.setState({ showNuevaCarrera: false });
            })
    }

    deleteCarrera(e, id) {
        e.preventDefault();
        axios.delete(process.env.REACT_APP_API_URL + "/carreras/" + id)
            .then(res => {
                notify.show("Se ha eliminado exitosamente", "success");
                this.getCarreras();
            })
            .catch((error) => {
                notify.show("Ha ocurrido un error al eliminar la carrera", "error");
                console.log(error);
            });
    }


    changeSelected(e) {
        console.log(e);
        this.setState({
            optionSelected: e
        });
    }

}