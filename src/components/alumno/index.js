import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaTrash, FaUserEdit, FaUserFriends } from "react-icons/fa";
import AlumnoRegistrar from "./alumnoRegistrar";
import axios from "axios";

export default class Alumno extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cedula: "",
            nombres: "",
            apellidos: "",
            email: "",
            carreraSelected: 0,
            resultados: [],
            showNuevo: false,
            carreras: []
        };
    }

    componentWillMount() {
        this.getCarreras();
    }

    render() {
        console.log(this.state.resultados);
        let results = this.state.resultados;
        let haveResults = false;
        var tableResults = <div></div>;
        if (results !== undefined && results.length > 0) {
            haveResults = true;
            tableResults = results.map((i) => (
                <tr key={i.ci} style={{cursor: "pointer"}}>
                    <td>{i.nombres} {i.apellidos}</td>
                    <td>{i.ci}</td>
                    <td>{i.telefono}</td>
                    <td>{i.email}</td>
                    <td>{i.idCarrera.denominacion}</td>
                    <td>
                        <Button
                            size="sm"
                            variant="warning"
                            title="Editar">
                            <FaUserEdit />
                        </Button>&nbsp;&nbsp;
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={(e)=>{this.deleteAlumno(e, i.ci)}}
                            title="Eliminar">
                            <FaTrash />
                        </Button>&nbsp;&nbsp;
                        <Button
                            size="sm"
                            variant="info"
                            title="Asociar">
                            <FaUserFriends />
                        </Button>               
                    </td>
                </tr>
            ));
        }
        let optionsCarreras = <option disabled={true}> - No hay carreras - </option>
        let carreras = this.state.carreras;
        if (carreras != undefined && carreras.length > 0) {
            optionsCarreras = carreras.map((i) => (
                <option key={i.idCarrera} value={i.idCarrera}>{i.denominacion}</option>
            ));
        }
        return (
            <section>
                <AlumnoRegistrar
                    show={this.state.showNuevo}
                    close={this.closeNuevo.bind(this)}
                    carreras={this.state.carreras}
                    save={this.saveAlumno.bind(this)} />
                <h3 style={{ fontFamily: "Lato Light" }}>Alumnos</h3>
                <Form style={{ marginTop: "10px" }}>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="N° de cédula"
                                value={this.state.cedula}
                                onChange={(e) => { this.onChangeField(e, "cedula") }}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombres"
                                value={this.state.nombres}
                                onChange={(e) => { this.onChangeField(e, "nombres") }} />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                value={this.state.apellidos}
                                onChange={(e) => { this.onChangeField(e, "apellidos") }} />
                        </Col>
                        <Col md="4">
                            <Form.Control
                                as="select"
                                value={this.state.carreraSelected}
                                onChange={(e) => { this.onChangeField(e, "carreraSelected")}}>
                                <option value="0"> - TODAS LAS CARRERAS - </option>
                                {optionsCarreras}
                            </Form.Control>
                        </Col>
                        <Button bsStyle="primary" onClick={this.getAlumnosByFields.bind(this)}>
                            <FaSearch />
                        </Button>&nbsp;
                        <Button bsStyle="primary" onClick={this.showNuevo.bind(this)}>
                            <span>Nuevo</span>&nbsp;
                                <FaUserPlus />
                        </Button>
                    </Form.Row>
                </Form>
                <section style={{ display: haveResults ? "block" : "none", marginTop: "10px" }}>
                    <Table hover variant="dark" size="sm" responsive style={{fontSize: "12px"}}>
                        <thead>
                            <tr>
                                <th>NOMBRES Y APELLIDOS</th>
                                <th>N° CÉDULA</th>
                                <th>TELÉFONO</th>
                                <th>CORREO ELECTRÓNICO</th>
                                <th>CARRERA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableResults}
                        </tbody>
                    </Table>
                </section>
            </section>
        );
    }

    onChangeField(e, field) {
        var obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    showNuevo(e) {
        e.preventDefault();
        this.setState({ showNuevo: true });
    }

    closeNuevo(e) {
        e.preventDefault();
        this.setState({ showNuevo: false });
    }

    makeQuery(cedula, carrera, nombres, apellidos){
        if(cedula === null && carrera === null && nombres === null && apellidos === null){ return ""; }
        let query = "?", cantidad = 0;   
        if(cedula !== null){ if(cantidad > 0) {query += "&";} query += "documento=" + cedula; cantidad++; }
        if(carrera !== null){ if(cantidad > 0) {query += "&";} query += "idCarrera=" + carrera; cantidad++; }
        if(nombres !== null){ if(cantidad > 0) {query += "&";} query += "nombres=" + nombres; cantidad++; }
        if(apellidos !== null){ if(cantidad > 0) {query += "&";} query += "apellidos=" + apellidos; cantidad++; }
        return query;
    }

    getAlumnosByFields(e) {
        let cedula = this.state.cedula === "" ? null : this.state.cedula;
        let carrera = parseInt(this.state.carreraSelected) === 0 ? null : parseInt(this.state.carreraSelected);
        let nombres = this.state.nombres === "" ? null : this.state.nombres;
        let apellidos = this.state.apellidos === "" ? null : this.state.apellidos;
        let queryParams = this.makeQuery(cedula, carrera, nombres, apellidos);
        axios.get("http://localhost:8080/scc/alumnos/fields" + queryParams)
            .then(res => {
                this.setState({ resultados: res.data });
            });
    }

    getCarreras() {
        axios.get("http://localhost:8080/scc/carreras")
            .then(res => {
                this.setState({ carreras: res.data });
            });
    }

    saveAlumno(e, obj) {
        e.preventDefault();
        axios.post("http://localhost:8080/scc/alumnos", obj)
            .then(res => {
                this.setState({resultados: [res.data], showNuevo: false});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteAlumno(e, ci){
        e.preventDefault();
        axios.delete("http://localhost:8080/scc/alumnos/" + ci)
        .then(res => {
            this.getAlumnosByFields();
        })
        .catch((error) => {
            console.log(error);
        });
    }

}