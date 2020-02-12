import React, {Component} from 'react';
import {Form, Row, Col, Button, Table, OverlayTrigger} from 'react-bootstrap';
import { FaSearch, FaRegGrinBeamSweat, FaUserSlash, FaInfo} from "react-icons/fa";
import { FiRadio } from "react-icons/fi";
import axios from 'axios';
import {getBackEndContext, buildQueryParams, buildDate} from '../../util/generate-util';
import RFIDReader from "../alumno/rfidReader";
import ToolTipSocio from './toolTip-profile';
import Notifications, {notify} from 'react-notify-toast';
import SocioInf from './socio-inf';
import Paginator from '../paginator'
import {get} from "../../util/cookies";

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
            rfidShow:false,
            showInfModal:false,
            partnerDetails: undefined,
            firstPage: 1,
            lastPage: undefined,
            currentPage: 1,
            pageSize: 5
        }
    }

    componentWillMount(){
        this.getPartnersByFilter(this.state.currentPage, this.state.pageSize);
        this.getCarreras();
    }


    render() {
        let res = this.state.results === undefined ? [] : this.state.results;
        res = res.filter(partner => partner.estado);
        let tableRender = <><tr><td style={{borderTop: "none"}} ><FaRegGrinBeamSweat style={{height:"4em", width:"4em"}}/></td></tr>&nbsp;<tr>NO SE HAN ENCONTRADO RESULTADOS!!!</tr></>;
        let optionCarreras = <option disabled={true}>- No hay carreras -</option>;
        let carrerasRs = this.state.carreraList;
        if(res !== undefined && res.length > 0){
            tableRender = res.map((i) => {
                let toolTipPartner = (<ToolTipSocio partnerName={i.alumno.nombres} image={i.foto} career={i.alumno.idCarrera.denominacion} />);
                return (<tr key={i.alumno.ci}>
                                <OverlayTrigger placement="auto-start"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={toolTipPartner}>
                                    <td>{i.alumno.nombres.toUpperCase()} {i.alumno.apellidos.toUpperCase()}</td>
                                </OverlayTrigger>
                                <td>{i.alumno.ci}</td>
                                <td>{i.alumno.telefono}</td>
                                <td>{i.alumno.email}</td>
                                <td>{i.alumno.idCarrera.denominacion.toUpperCase()}</td>
                                <td>
                                    <Button size="sm" variant="danger" onClick={(e)=>{this.disassociateStudent(e, i)}}><FaUserSlash/></Button>&nbsp;&nbsp;
                                    <Button size="sm" variant="info" onClick={(e)=>{this.handleShowInf(e, i)}}><FaInfo /></Button>
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
                <Notifications/>
                <Form>
                    <Row>
                        <Col md="2" style={{ paddingRight: 0 }}>
                            <Form.Label style={{marginBottom: "0px"}}><b>N° de cédula</b></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="N° de cédula"
                                value={this.state.cedula}
                                onChange={(e) => { this.onChangeField(e, "cedula") }} />
                        </Col>
                        <Col md="2" style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Label style={{marginBottom: "0px"}}><b>Nombres</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombres"
                                value={this.state.nombres}
                                onChange={(e) => { this.onChangeField(e, "nombres") }} />
                        </Col>
                        <Col md="2" style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Label style={{marginBottom: "0px"}}><b>Apellidos</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                value={this.state.apellidos}
                                onChange={(e) => { this.onChangeField(e, "apellidos") }} />
                        </Col>
                        <Col md="2" style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Label style={{marginBottom: "0px"}}><b>Tel&eacute;fono</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Teléfono"
                                value={this.state.telefono}
                                onChange={(e) => { this.onChangeField(e, "telefono") }} />
                        </Col>
                        <Col md="3" style={{ padding: 0, paddingLeft: "5px" }}>
                            <Form.Label style={{marginBottom: "0px"}}><b>Carrera</b></Form.Label>
                            <Form.Control as="select" value={this.state.carreraSelected}
                                          onChange={(e)=>{this.onChangeField(e, "carreraSelected")}}>
                                <option value=""> - CARRERAS - </option>
                                {optionCarreras}
                            </Form.Control>
                        </Col>&nbsp;&nbsp;&nbsp;
                        <div style={{float:"right"}}>
                            <Button variant="primary" onClick={(e) => {this.getPartnersByFilter(this.state.currentPage, this.state.pageSize)}} style={{marginTop:"1.5em"}}>
                                <FaSearch/>
                            </Button>&nbsp;
                            <div className="btn btn-primary" onClick={this.getPartnerByRFID.bind(this)} style={{marginTop:"1.5em"}}><FiRadio style={{"fontSize":"1.4em"}}/></div>
                        </div>
                    </Row>
                </Form>
                <section style={{display: "block", marginTop: "10px"}}>
                    <Table hover={res.length > 0 ? true:false} responsive size="sm" style={{ fontSize: "12px", textAlign:res.length > 0 ? "":"center"}}>
                        <thead style={{background: "#343a40", color: "#fff", display:res.length > 0 ? "":"none"}}>
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
                <SocioInf mode={true} show={this.state.showInfModal}
                          showFunction={this.handleShowInf.bind(this)}
                          partnerInf={this.state.partnerDetails}
                          updateTable={(e) => {this.getPartnersByFilter(this.state.currentPage, this.state.pageSize)}}/>
                <Paginator
                        prev={this.previousPage.bind(this)}
                        next={this.nextPage.bind(this)}
                        first={this.toFirstPage.bind(this)}
                        last={this.toLastPage.bind(this)}
                        firstPage={this.state.firstPage}
                        lastPage={this.state.lastPage}
                        currentPage={this.state.currentPage}
                        show={res.length > 0}/>  
            </section>
        );
    }

    onChangeField(e, field) {
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    getPartnersByFilter(page, pageSize) {

        let params = {  cedula: this.state.cedula,
                        nombres: this.state.nombres,
                        apellidos: this.state.apellidos,
                        telefono: this.state.telefono,
                        carrera:this.state.carreraSelected,
                        page:page !== undefined ? page : this.state.currentPage,
                        pageSize:pageSize !== undefined ? pageSize : this.state.pageSize
                    };
        let requestAddress = buildQueryParams(params, getBackEndContext("socios/filter"));
        axios.get(requestAddress).then(rs => {
            let dataRs = rs.data;
            this.setState({ results: dataRs !== undefined ? dataRs.content : [], currentPage: (dataRs.pageable.pageNumber+1), lastPage: dataRs.totalPages});
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
        var port = get("scc_port");
        if(port == null){
            notify.show("Debes configurar primero el puerto RFID", "warning");
            return;
        }        
        let requestAddress = buildQueryParams({port:port}, getBackEndContext("socios/rfid"));
        this.setState({ rfidShow: true });
        let rs = await axios.get(requestAddress);
        let partialResult =  this.state.results;
        this.setState({ results: rs.status === 200 ? [rs.data] : partialResult, rfidShow: false });
    }

    handleShowInf(e, partnerInf){
        this.setState({showInfModal: !this.state.showInfModal, partnerDetails: partnerInf});
    }

    disassociateStudent(e, student){
        e.preventDefault();
        let studentPut = {
            idSocio: student.idSocio,
            uuid: "Ninguno",
            foto: null,
            fechaIngreso: buildDate(student.fechaIngreso),
            ci: student.alumno.ci,
            estado: false
        };
        let endPoint = getBackEndContext("socios");

        axios.put(endPoint, studentPut).then(rs => {
            this.getPartnersByFilter(this.state.currentPage, this.state.pageSize);
            notify.show("Se ha desasociado correctamente", "success");
        }).catch(error => {
            console.log(error);
            notify.show("Error al intentar desasociar", "error");
        })

    }

    nextPage(e){
        e.preventDefault();
        if((this.state.currentPage+1) <= this.state.lastPage){
            let change = this.state.currentPage + 1;
            this.setState({
                currentPage: change
            }, this.getPartnersByFilter(change, this.state.pageSize));
        }
    }

    previousPage(e){
        e.preventDefault();
        if((this.state.currentPage-1) >= this.state.firstPage){
            let change = this.state.currentPage - 1;
            this.setState({
                currentPage: change
            }, this.getPartnersByFilter(change, this.state.pageSize));
        }
    }

    toFirstPage(e){
        e.preventDefault();
        this.setState({currentPage: this.state.firstPage}, this.getPartnersByFilter(this.state.firstPage, this.state.pageSize));
    }

    toLastPage(e){
        e.preventDefault();
        this.setState({currentPage: this.state.lastPage}, this.getPartnersByFilter(this.state.lastPage, this.state.pageSize));
    }
}