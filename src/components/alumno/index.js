import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaTrash, FaUserEdit } from "react-icons/fa";
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
            carreraSelected: undefined,
            resultados: [],
            showNuevo: false,
            carreras: []
        };
    }

    componentWillMount(){
        this.getCarreras();        
    }

    render() {
        let results = this.state.resultados;
        let haveResults = false;
        var tableResults = <div></div>;
        if (results !== undefined && results.length > 0) {
            haveResults = true;
            tableResults = results.map( (i) => (
                <tr>
                    <td key={i.ci}>{i.nombres} {i.apellidos}</td>
                    <td key={i.ci}>{i.ci}</td> 
                    <td key={i.ci}>{i.telefono}</td>
                    <td key={i.ci}>{i.email}</td>
                    <td key={i.ci}>{i.idCarrera.denominacion}</td>
                    <td key={i.ci}>
                        <Button><FaUserEdit/></Button>&nbsp;&nbsp;
                        <Button><FaTrash/></Button>
                    </td>
                </tr>
            ) );
        }
        let optionsCarreras = <option disabled={true}> - No hay carreras - </option>
        let carreras = this.state.carreras;
        if(carreras != undefined && carreras.length > 0){
            optionsCarreras = carreras.map((i) => (
              <option key={i.idCarrera}>{i.denominacion}</option>
            ));
        }
        return (
            <section>
                <AlumnoRegistrar
                    show={this.state.showNuevo}
                    close={this.closeNuevo.bind(this)}
                    carreras={this.state.carreras}
                    save={this.saveAlumno.bind(this)}/>
                <h3 style={{ fontFamily: "Lato Light" }}>Alumnos</h3>
                <Form style={{ marginTop: "10px"}}>
                    <Row>
                        <Col style={{ paddingRight: 0}}>
                            <Form.Control
                                type="number"
                                placeholder="N° de cédula"
                                value={this.state.cedula}
                                onChange={(e) => { this.onChangeField(e, "cedula") }}
                                />
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
                            <Form.Control as="select">
                                {optionsCarreras}
                            </Form.Control>
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Button bsStyle="primary" onClick={this.getAlumnosByFields.bind(this)}>
                                <FaSearch />
                            </Button>&nbsp;
                            <Button bsStyle="primary" onClick={this.showNuevo.bind(this)}>
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

    showNuevo(e){
        e.preventDefault();
        this.setState({showNuevo: true});
    }

    closeNuevo(e){
        e.preventDefault();
        this.setState({showNuevo: false});
    }

    getAlumnosByFields(e) {
        let cedula = this.state.cedula;
        axios.get("http://localhost:8080/scc/alumnos")
            .then(res => {
                this.setState({ resultados: res.data });
            });
    }    

    getCarreras(){
        axios.get("http://localhost:8080/scc/carreras")
            .then(res => {
                this.setState({ carreras: res.data });
            });
    }

    saveAlumno(e, obj){
        e.preventDefault();


        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        console.log(obj);
        obj = JSON.stringify(obj);
        axios.post("http://localhost:8080/scc/alumnos", {headers, obj})
        .then(res => {
          console.log(res.data);
          this.closeNuevo(e);
        })
        .catch((error) => {
            console.log(error);
        });
    }

}