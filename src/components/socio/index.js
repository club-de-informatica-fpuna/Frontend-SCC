import React, {Component} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import {FaUserPlus, FaSearch, FaRegGrinBeamSweat,
        FaUserEdit, FaUserSlash} from "react-icons/fa";
import axios from 'axios';
import {getBackEndContext, buildQueryParams} from '../../util/generate-query-params';

export default class Socio extends Component {

    constructor(props, context){
        super(props);
        this.state = {
            cedula: "",
            nombres: "",
            apellidos: "",
            telefono: "",
            carreraSelected: undefined,
            results: []
        }
    }


    render() {
        let res = this.state.results;
        var tableRender = <tr><FaRegGrinBeamSweat/></tr>;
        if(res !== undefined && res.length > 0){
            tableRender = res.map((i) => (
                <tr>
                    <td>{i.ci.nombres} {i.ci.apellidos}</td>
                    <td>{i.ci.ci}</td> 
                    <td>{i.ci.telefono}</td>
                    <td>{i.ci.email}</td>
                    <td>{i.ci.idCarrera.denominacion}</td>
                    <td>
                        <Button><FaUserEdit/></Button>&nbsp;&nbsp;
                        <Button><FaUserSlash/></Button>
                    </td>
                </tr>
            ));
        }
        return(
            <section>
                <h3 style={{ fontFamily: "Lato Light" }}>Socios</h3>
                <Form>
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
                                type="text"
                                placeholder="Teléfono"
                                value={this.state.telefono}
                                onChange={(e) => { this.onChangeField(e, "telefono") }} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Control placeholder="Carrera" value={this.state.carreraSelected} />
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Button bsStyle="primary" onClick={this.getPartnersByFilter.bind(this)}>
                                <FaSearch />
                            </Button>&nbsp;
                            <Button bsStyle="primary">
                                <span>Nuevo</span>&nbsp;
                                <FaUserPlus />
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <section style={{display: res.length > 0 ? "block" : "none", marginTop: "10px"}}>
                    <Table variant="dark" size="sm" hover responsive striped>
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
                            {tableRender}
                        </tbody>
                    </Table>
                </section>
            </section>
        );
    }

    onChangeField(e, field) {
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    getPartnersByFilter(e) {
        e.preventDefault();
        let params = {  cedula: this.state.cedula,
                        nombres: this.state.nombres,
                        apellidos: this.state.apellidos,
                        telefono: this.state.telefono,
                        carrera:this.state.carreraSelected
                    };
        let requestAddress = buildQueryParams(params, getBackEndContext("socios/filter"));
        axios.get(requestAddress).then(rs => {
            let dataRs = rs.data;
            this.setState({ results: dataRs !== undefined ? dataRs : []});
        }).catch(error => {
            console.log(error);
        })
    }
}