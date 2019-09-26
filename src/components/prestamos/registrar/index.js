import React, { Component } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { FaSearch, FaRss } from "react-icons/fa";
import axios from "axios";
import RFIDReader from "../../alumno/rfidReader";
import SearchEquipos from "../../equipos/search";
import {validateField, validateSelect, validateDate} from "../../../util/validators";

export default class Registrar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            documento: "",
            alumno: undefined,
            rfidReading: false,
            showEquipos: false,
            equipoSelectedKey: undefined,
            equipoSelectedLabel: "",
            fechaPrestamo: this.now()
        };
    }

    now(){
        let date = new Date();
        let stringDate = date.getFullYear() + "-" + this.checkDigits(date.getMonth()+1) + "-" + this.checkDigits(date.getDate());
        let time = this.checkDigits(date.getHours()) + ":" + this.checkDigits(date.getUTCMinutes());
        return stringDate + "T" + time;
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }

    render() {

        let alumno = this.state.alumno;
        let nombreCompleto = alumno !== undefined ? (alumno.nombres + " " + alumno.apellidos) : undefined;

        return (
            <section>
                <RFIDReader show={this.state.rfidReading} />
                <SearchEquipos
                    show={this.state.showEquipos}
                    close={this.closeEquipos.bind(this)}
                    selector={this.selectEquipo.bind(this)}
                />
                <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo préstamo</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Label><b>N° Documento</b></Form.Label>
                            <span className="validation-field" hidden={validateField(nombreCompleto, 70, 3)}>Debe buscar un alumno</span>                            
                            <Form.Group as={Row} controlId="formDocumento" >
                                <Col style={{ paddingRight: "0px" }}>
                                    <Form.Control
                                        className={validateField(nombreCompleto, 70, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                        type="number"
                                        placeholder="Ingrese su documento"
                                        value={this.state.documento}
                                        onChange={(e) => { this.changeField(e, "documento") }}
                                    />
                                </Col>
                                <Col md="3" style={{ textAlign: "right" }}>
                                    <Button bsStyle="primary" onClick={this.getAlumnoByCI.bind(this)}>
                                        <FaSearch />
                                    </Button>&nbsp;
                                    <Button bsStyle="primary" onClick={this.getAlumnoFromRFID.bind(this)}>
                                        <FaRss />
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formNombres">
                                <Form.Label><b>Nombre y Apellido</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nombreCompleto}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="formTelefono">
                                <Form.Label><b>Fecha préstamo</b></Form.Label>
                                <span className="validation-field" hidden={validateDate(this.state.fechaPrestamo)}>Fecha inválida</span>
                                <Form.Control
                                    className={validateDate(this.state.fechaPrestamo) ? "input-validate-field-success" : "input-validate-field-error"}
                                    type="datetime-local"
                                    value={this.state.fechaPrestamo}/>
                            </Form.Group>
                            <Form.Label><b>Equipo</b></Form.Label>
                            <span className="validation-field" hidden={validateSelect(this.state.equipoSelectedKey)}>Debe seleccionar un equipo</span>
                            <Form.Group controlId="formCarrera" as={Row}>
                                <Col style={{ paddingRight: "0px" }}>
                                    <Form.Control
                                        className={validateSelect(this.state.equipoSelectedKey) ? "input-validate-field-success" : "input-validate-field-error"}                                    
                                        value={this.state.equipoSelectedLabel}
                                        type="text"
                                        placeholder="Buscar el equipo"
                                        disabled
                                    />
                                </Col>
                                <Col md="2" style={{ textAlign: "right" }}>
                                    <Button bsStyle="primary" onClick={this.showEquipos.bind(this)}>
                                        <FaSearch />
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                        <span className="validation-field" hidden={this.state.validated} style={{textAlign: "center", fontWeight: "bold"}}>Por favor, revise los campos marcados.</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                        <Button variant="primary" onClick={this.handleSave.bind(this)}>Guardar</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        );
    }

    changeField(e, field) {
        e.preventDefault();
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    async getAlumnoFromRFID(e) {
        e.preventDefault();
        this.setState({ rfidReading: true });
        let res = await axios.get(process.env.REACT_APP_API_URL + "/alumnos/rfid");
        if (res.status === 200) {
            this.setState({ alumno: res.data, documento: res.data.ci, rfidReading: false });
        }
        else {
            this.setState({ alumno: undefined, documento: "", rfidReading: false });
        }
    }

    getAlumnoByCI(e){
        e.preventDefault();
        let cedula = this.state.documento === "" ? null : this.state.documento;
        if(cedula === null){ return; }
        axios.get(process.env.REACT_APP_API_URL + "/alumnos/fields?documento=" + cedula)
            .then(res => {
                this.setState({ alumno: res.data[0] });
            })
            .catch(res => {
                this.setState({ alumno: undefined });
            })
    }

    closeEquipos(e) {
        e.preventDefault();
        this.setState({ showEquipos: false });
    }

    showEquipos(e){
        e.preventDefault();
        this.setState({ showEquipos: true });        
    }

    selectEquipo(e, key, label){
        e.preventDefault();
        this.setState({
            showEquipos: false,
            equipoSelectedKey: key,
            equipoSelectedLabel: label
        });
    }

    convertDate(date){
        if(date === undefined){ return null; }
        return date + ":00Z";
    }

    validateAllFields(prestamo){
        if(validateField(prestamo.ciAlumno, 20, 6) &&
            validateDate(prestamo.fechaPrestamo) &&
            validateSelect(prestamo.idEquipo)){
            return true;
        }
        return false;
    }      

    handleSave(e){
        e.preventDefault();
        var prestamo = {
            ciAlumno: this.state.documento,
            estado: false,
            fechaPrestamo: this.convertDate(this.state.fechaPrestamo),
            idEquipo: this.state.equipoSelectedKey
        }
        // validaciones
        if(this.validateAllFields(prestamo)) { this.setState({validated: true}, this.props.save(e, prestamo)); }
        else { this.setState({validated: false}); }
    }

}