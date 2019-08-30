import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaTrash, FaUserEdit } from "react-icons/fa";
import axios from "axios";

export default class Alumno extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cedula: "",
            nombres: "",
            apellidos: "",
            email: "",
            telefono: "",
            carreraSelected: undefined,
            resultados: []
        };
    }

    render() {
        let results = this.state.resultados;
        let haveResults = false;
        var tableResults = <div></div>;
        if (results !== undefined && results.length > 0) {
            haveResults = true;
            tableResults = results.map( (i) => (
                <tr>
                    <td>{i.nombres} {i.apellidos}</td>
                    <td>{i.ci}</td> 
                    <td>{i.telefono}</td>
                    <td>{i.email}</td>
                    <td>{i.idCarrera.denominacion}</td>
                    <td>
                        <Button><FaUserEdit/></Button>&nbsp;&nbsp;
                        <Button><FaTrash/></Button>
                    </td>
                </tr>
            ) );
        }
        return (
            <section>
                <h3 style={{ fontFamily: "Lato Light" }}>Alumnos</h3>
                <Form style={{ marginTop: "10px" }}>
                    <Row>
                        <Col style={{ paddingRight: 0 }}>
                            <Form.Control
                                type="number"
                                placeholder="N° de cédula"
                                value={this.state.cedula}
                                onChange={(e) => { this.onChangeField(e, "cedula") }} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Control
                                type="text"
                                placeholder="Nombres"
                                value={this.state.nombres}
                                onChange={(e) => { this.onChangeField(e, "nombres") }} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                value={this.state.apellidos}
                                onChange={(e) => { this.onChangeField(e, "apellidos") }} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Control
                                type="email"
                                placeholder="Correo electrónico"
                                value={this.state.email}
                                onChange={(e) => { this.onChangeField(e, "email") }} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Control
                                type="text"
                                placeholder="Teléfono"
                                value={this.state.telefono}
                                onChange={(e) => { this.onChangeField(e, "telefono") }} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Control placeholder="Carrera" value={this.state.carreraSelected} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Button bsStyle="primary" onClick={this.getAlumnosByFields.bind(this)}>
                                <FaSearch />
                            </Button>&nbsp;
                            <Button bsStyle="primary">
                                <span>Nuevo</span>&nbsp;
                                <FaUserPlus />
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <section style={{display: haveResults ? "block" : "none", marginTop: "10px"}}>
                    <Table hover variant="dark" responsive>
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

    getAlumnosByFields(e) {
        let cedula = this.state.cedula;
        axios.get("http://localhost:8080/scc/alumnos")
            .then(res => {
                this.setState({ resultados: res.data });
            });
    }
}