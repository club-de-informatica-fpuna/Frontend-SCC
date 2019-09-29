import React, { Component } from 'react';
import { Button, Form, Col, Table } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaTrash, FaUserEdit, FaUserFriends, FaRss } from "react-icons/fa";
import AlumnoRegistrar from "./alumnoRegistrar";
import AlumnoEditar from "./alumnoEditar";
import AlumnoInfo from "./alumnoInfo";
import RFIDReader from "./rfidReader";
import axios from "axios";
import Notifications, {notify} from 'react-notify-toast';
import SocioInf from '../socio/socio-inf'

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
            showInfo: false,
            showEditar: false,
            alumno: undefined,
            carreras: [],
            rfidReading: false,
            partnerUpShow: false,
            loading: false
        };
    }

    componentWillMount() {
        this.getAlumnosByFields();
        this.getCarreras();
    }

    render() {
        let results = this.state.resultados;
        let haveResults = false;
        var tableResults = <div></div>;
        if (results !== undefined && results.length > 0) {
            haveResults = true;
            tableResults = results.map((i) => (
                <tr key={i.ci} style={{ cursor: "pointer" }}>
                    <td >{i.nombres.toUpperCase()} {i.apellidos.toUpperCase()}</td>
                    <td style={{textAlign: "center"}}><Button variant="secondary" size="sm" onClick={(e) => {this.showAlumnoInfo(e, i)}}>{i.ci}</Button></td>
                    <td style={{textAlign: "center"}}>{i.telefono}</td>
                    <td style={{textAlign: "center"}}>{i.email}</td>
                    <td style={{textAlign: "center"}}>{i.idCarrera.denominacion}</td>
                    <td style={{textAlign: "center"}}>
                        <Button
                            onClick={(e) => {this.showAlumnoEditar(e, i)}}
                            size="sm"
                            variant="warning"
                            title="Editar">
                            <FaUserEdit />
                        </Button>&nbsp;&nbsp;
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={(e) => { this.deleteAlumno(e, i.ci) }}
                            title="Eliminar">
                            <FaTrash />
                        </Button>&nbsp;&nbsp;
                        <Button
                            disabled={i.asociado}
                            size="sm"
                            variant="info"
                            onClick={(e) => {this.associateStudent(e, i)}}
                            title="Asociar">
                            <FaUserFriends />
                        </Button>&nbsp;&nbsp;
                    </td>
                </tr>
            ));
        }
        let optionsCarreras = <option disabled={true}> - No hay carreras - </option>
        let carreras = this.state.carreras;
        if (carreras !== undefined && carreras.length > 0) {
            optionsCarreras = carreras.map((i) => (
                <option key={i.idCarrera} value={i.idCarrera}>{i.denominacion}</option>
            ));
        }
        return (
            <section>
                <Notifications/>
                <AlumnoInfo show={this.state.showInfo} alumno={this.state.alumno} close={this.closeAlumnoInfo.bind(this)}/>
                <AlumnoEditar
                    show={this.state.showEditar}
                    close={this.closeAlumnoEditar.bind(this)}
                    carreras={this.state.carreras}
                    update={this.update.bind(this)}
                    alumno={this.state.alumno}/>
                <AlumnoRegistrar
                    show={this.state.showNuevo}
                    close={this.closeNuevo.bind(this)}
                    carreras={this.state.carreras}
                    save={this.saveAlumno.bind(this)} alumno={this.state.alumno}/>
                <RFIDReader show={this.state.rfidReading} />
                <SocioInf mode={false} show={this.state.partnerUpShow} showFunction={this.handleShowParner.bind(this)} partnerInf={this.state.alumno}/>
                <Form>
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
                                onChange={(e) => { this.onChangeField(e, "carreraSelected") }}>
                                <option value="0"> - TODAS LAS CARRERAS - </option>
                                {optionsCarreras}
                            </Form.Control>
                        </Col>
                        <Button bsStyle="primary" onClick={this.getAlumnosByFields.bind(this)}>
                            <FaSearch />
                        </Button>&nbsp;
                        <Button bsStyle="primary" onClick={this.getAlumnoFromRFID.bind(this)}>
                            <FaRss />
                        </Button>&nbsp;
                        <Button bsStyle="primary" onClick={this.showNuevo.bind(this)}>
                            <span>Nuevo</span>&nbsp;
                            <FaUserPlus />
                        </Button>&nbsp;
                    </Form.Row>
                </Form>
                <img hidden={!this.state.loading} src={"/loading.gif"} height={50} style={{marginTop: "10px"}}/>
                <section style={{ display: haveResults ? "block" : "none", marginTop: "10px" }}>
                    <Table hover responsive style={{ fontSize: "12px" }}>
                        <thead style={{background: "#343a40", color: "white"}}>
                            <tr>
                                <th >NOMBRES Y APELLIDOS</th>
                                <th style={{textAlign: "center"}}>N° CÉDULA</th>
                                <th style={{textAlign: "center"}}>TELÉFONO</th>
                                <th style={{textAlign: "center"}}>CORREO ELECTRÓNICO</th>
                                <th style={{textAlign: "center"}}>CARRERA</th>
                                <th style={{textAlign: "center"}}>ACCIONES</th>
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

    showAlumnoInfo(e, alumno){
        e.preventDefault();
        this.setState({
            alumno: alumno,
            showInfo: true
        });
    }

    showAlumnoEditar(e, alumno){
        e.preventDefault();
        this.setState({
            alumno: alumno,
            showEditar: true
        });        
    }

    closeAlumnoEditar(e){
        this.setState({
            showEditar: false
        });
    }

    closeAlumnoInfo(e){
        this.setState({
            showInfo: false
        });
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
        this.setState({ showNuevo: false });
    }

    makeQuery(cedula, carrera, nombres, apellidos) {
        if (cedula === null && carrera === null && nombres === null && apellidos === null) { return ""; }
        let query = "?", cantidad = 0;
        if (cedula !== null) { if (cantidad > 0) { query += "&"; } query += "documento=" + cedula; cantidad++; }
        if (carrera !== null) { if (cantidad > 0) { query += "&"; } query += "idCarrera=" + carrera; cantidad++; }
        if (nombres !== null) { if (cantidad > 0) { query += "&"; } query += "nombres=" + nombres; cantidad++; }
        if (apellidos !== null) { if (cantidad > 0) { query += "&"; } query += "apellidos=" + apellidos; cantidad++; }
        return query;
    }

    getAlumnosByFields(e) {
        this.setState({loading: true});        
        let cedula = this.state.cedula === "" ? null : this.state.cedula;
        let carrera = parseInt(this.state.carreraSelected) === 0 ? null : parseInt(this.state.carreraSelected);
        let nombres = this.state.nombres === "" ? null : this.state.nombres;
        let apellidos = this.state.apellidos === "" ? null : this.state.apellidos;
        let queryParams = this.makeQuery(cedula, carrera, nombres, apellidos);
        axios.get(process.env.REACT_APP_API_URL + "/alumnos/fields" + queryParams)
        .then(res => {
            this.setState({ resultados: res.data, loading: false });
        })
        .catch(error => {
            notify.show("Ha ocurrido un error al procesar la solicitud", "error");
            this.setState({ loading: false });
        });
    }

    getCarreras() {
        axios.get(process.env.REACT_APP_API_URL + "/carreras")
            .then(res => {
                this.setState({ carreras: res.data });
            });
    }

    saveAlumno(e, obj) {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + "/alumnos", obj)
            .then(res => {
                notify.show("Alumno registrado exitosamente", "success");
                this.setState({ resultados: [res.data], showNuevo: false });
            })
            .catch((error) => {
                notify.show("Ha ocurrido un error al procesar la solicitud", "error");
                console.log(error);                
                this.setState({ showNuevo: false });                
            });
    }

    update(e, obj){
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_URL + "/alumnos", obj)
            .then(res => {
                notify.show("Alumno actualizado exitosamente", "success");
                this.setState({ resultados: [res.data], showEditar: false });
            })
            .catch((error) => {
                notify.show("Ha ocurrido un error al procesar la solicitud", "error");
                console.log(error);                
                this.setState({ showEditar: false });                
            });        
    }

    deleteAlumno(e, ci) {
        e.preventDefault();
        axios.delete(process.env.REACT_APP_API_URL + "/alumnos/" + ci)
            .then(res => {
                this.getAlumnosByFields();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async getAlumnoFromRFID(e) {
        e.preventDefault();
        this.setState({ rfidReading: true });
        let res = await axios.get(process.env.REACT_APP_API_URL + "/alumnos/rfid");
        if(res.status === 200){
            this.setState({ resultados: [res.data], rfidReading: false });
        }
        else{
            this.setState({rfidReading: false});
        }
    }

    handleShowParner(){
        this.setState({partnerUpShow : !this.state.partnerUpShow});
    }

    associateStudent(e, student){
        e.preventDefault();
        this.setState({alumno : student, partnerUpShow : true});
    }

}