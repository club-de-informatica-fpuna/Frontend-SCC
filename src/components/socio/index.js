import React, {Component} from 'react';
import {Form, Row, Col, Button, Table, OverlayTrigger} from 'react-bootstrap';
import { FaSearch, FaRegGrinBeamSweat, FaUserEdit, FaUserSlash} from "react-icons/fa";
import { FiRadio } from "react-icons/fi";
import axios from 'axios';
import {getBackEndContext, buildQueryParams} from '../../util/generate-query-params';
import RFIDReader from "../alumno/rfidReader";
import ToolTipSocio from './toolTip-profile';

export default class Socio extends Component {

    constructor(props, context){
        super(props);
        this.state = {
            cedula: "",
            nombres: "",
            apellidos: "",
            telefono: "",
            carreraSelected: undefined,
            results: [],
            carreraList: [],
            rfidShow:false
        }
    }

    componentWillMount(){
        this.getCarreras();
    }


    render() {
        let res = this.state.results;
        let tableRender = <tr><FaRegGrinBeamSweat/></tr>;
        let optionCarreras = <option disabled={true}>- No hay carreras -</option>;
        let carrerasRs = this.state.carreraList;
        if(res !== undefined && res.length > 0){
            tableRender = res.map((i) => {
                let toolTipPartner = (<ToolTipSocio partnerName={i.alumno.nombres} image={i.foto} career={i.alumno.idCarrera.denominacion} />);
                return(
                <tr>
                    <OverlayTrigger placement="auto"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={toolTipPartner}>
                        <td>{i.alumno.nombres} {i.alumno.apellidos}</td>
                    </OverlayTrigger>
                    <td>{i.alumno.ci}</td> 
                    <td>{i.alumno.telefono}</td>
                    <td>{i.alumno.email}</td>
                    <td>{i.alumno.idCarrera.denominacion}</td>
                    <td>
                        <Button><FaUserEdit/></Button>&nbsp;&nbsp;
                        <Button><FaUserSlash/></Button>
                    </td>
                </tr>
                );
            });
        }

        if (carrerasRs !== undefined && carrerasRs.length > 0) {
            optionCarreras = carrerasRs.map((i) => (
                <option key={i.idCarrera} value={i.denominacion}>{i.denominacion}</option>
            ));
        }
        return(
            <section>
                <h3 style={{ fontFamily: "Lato Light", textAlign: "left" }}>Socios</h3>
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
                            <Form.Control as="select"
                            value={this.state.carreraSelected}
                            onChange={(e)=>{this.onChangeField(e, "carreraSelected")}}>
                                <option value=""> - CARRERAS - </option>
                                {optionCarreras}
                            </Form.Control>
                        </Col>
                        <Col style={{ padding: 0, paddingLeft: "5px" }}>
                            <Button bsStyle="primary" onClick={this.getPartnersByFilter.bind(this)}>
                                <FaSearch />
                            </Button>&nbsp;
                            <div className="btn btn-primary" onClick={this.getPartnerByRFID.bind(this)}><FiRadio style={{"fontSize":"1.4em"}}/></div>
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
                <RFIDReader show={this.state.rfidShow}/>
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

    getCarreras() {
        let requestAddress = getBackEndContext("carreras");
        axios.get(requestAddress).then(rs => {
            this.setState({ carreraList: rs.data });
        }).catch(error => {
            console.log(error);
        });
    }

    async getPartnerByRFID(e) {
        e.preventDefault();
        let requestAddress = getBackEndContext("socios/rfid");
        this.setState({ rfidShow: true });

        let rs = await axios.get(requestAddress);
        if(rs.status === 200){
            this.setState({ results: [rs.data], rfidShow: false });
        }
        else{
            this.setState({rfidShow: false});
        }

    }
}