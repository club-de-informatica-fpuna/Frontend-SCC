import React, { Component } from 'react';
import { Form, Col, Button, Table } from "react-bootstrap";
import { FaSearch, FaRss, FaUserEdit, FaTrash, FaInfo } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import Registrar from "./registrar";
import RFIDReader from "../alumno/rfidReader";
import axios from "axios";

export default class Prestamos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cedula: "",
            nombres: "",
            apellidos: "",
            desde: undefined,
            hasta: undefined,
            showNuevo: false,
            equipos: [],
            equipoSelected: 0,
            rfidReading: false,
            prestamos: [],
            alumnoBuscado: undefined
        };
    }

    componentWillMount() {
        this.getEquipos();
    }

    render() {
        let haveResults = false;
        let equipos = this.state.equipos;
        let prestamos = this.state.prestamos;
        let equiposOptions = <option disabled>No hay equipos</option>;
        let tableResults = <div></div>;
        if (equipos !== undefined && equipos.length > 0) {
            equiposOptions = equipos.map((i) => (
                <option
                    key={i.idSubcategoria.idSubcategoria}
                    value={i.idSubcategoria.idSubcategoria}
                >
                    {i.idSubcategoria.denominacion}
                </option>
            ));
        }
        if(prestamos !== undefined && prestamos.length > 0){
            haveResults = true;
            tableResults = prestamos.map((i) => (
                <tr>
                    <td>{i.idPrestamo}</td>
                    <td>{i.alumno.nombres} {i.alumno.apellidos}</td>
                    <td><Button variant="secondary" size="sm">{i.alumno.ci}</Button></td>                    
                    <td><Button variant="secondary" size="sm">{i.equipo.descripcion}</Button></td>
                    <td>{this.fromRFCToFormat(i.fechaPrestamo)}</td>
                    <td>{this.fromRFCToFormat(i.fechaDevolucion)}</td>                    
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
                            title="Eliminar">
                            <FaTrash />
                        </Button>&nbsp;&nbsp;
                        <Button
                            size="sm"
                            variant="info"                            
                            title="Editar">
                            <FaInfo />
                        </Button>                        
                    </td>                    
                </tr>
            ));
        }

        return (
            <section>
                <Registrar
                    show={this.state.showNuevo}
                    close={this.closeNuevo.bind(this)}
                    save={this.savePrestamo.bind(this)}
                />
                <RFIDReader show={this.state.rfidReading}/>
                <h3 style={{ fontFamily: "Lato Light" }}>Préstamos</h3>
                <Form style={{ marginTop: "10px" }}>
                    <Form.Row>
                        <Col md="2">
                            <Form.Control
                                type="number"
                                placeholder="N° de cédula"
                                value={this.state.cedula}
                                onChange={(e) => { this.onChangeField(e, "cedula") }}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="datetime-local"
                                placeholder="Desde"
                                value={this.state.desde}
                                onChange={(e) => { this.onChangeField(e, "desde") }} />
                        </Col>
                        <Col>
                            <Form.Control
                                type="datetime-local"
                                placeholder="Hasta"
                                value={this.state.hasta}
                                onChange={(e) => { this.onChangeField(e, "hasta") }} />
                        </Col>
                        <Col md="3">
                            <Form.Control
                                as="select"
                                value={this.state.equipoSelected}
                                onChange={(e) => { this.onChangeField(e, "equipoSelected") }}>
                                <option value="0"> - TODOS LOS EQUIPOS - </option>
                                {equiposOptions}
                            </Form.Control>
                        </Col>
                        <Button bsStyle="primary" onClick={this.getPrestamosByFields.bind(this)}>
                            <FaSearch />
                        </Button>&nbsp;
                        <Button bsStyle="primary" onClick={this.getPrestamosFromRFID.bind(this)}>
                            <FaRss />
                        </Button>&nbsp;
                        <Button bsStyle="primary" onClick={this.showNuevo.bind(this)}>
                            <span>Nuevo</span>
                        </Button>
                    </Form.Row>
                </Form>

                <section style={{ display: haveResults ? "block" : "none", marginTop: "10px" }}>
                    <Table hover variant="dark" responsive style={{ fontSize: "12px" }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRES Y APELLIDOS</th>
                                <th>N° CÉDULA</th>
                                <th>EQUIPO</th>
                                <th>INICIO</th>
                                <th>DEVOLUCIÓN</th>
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

    showNuevo(e) {
        e.preventDefault();
        this.setState({ showNuevo: true });
    }    

    closeNuevo(e) {
        e.preventDefault();
        this.setState({ showNuevo: false });
    }

    onChangeField(e, field) {
        var obj = {};
        console.log(e.target.value);
        obj[field] = e.target.value;
        this.setState(obj);
    }

    getPrestamos() {
        axios.get("http://localhost:8080/scc/prestamos")
            .then(res => {
                console.log(res.data);
                this.setState({ prestamos: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getEquipos() {
        axios.get("http://localhost:8080/scc/equipos")
            .then(res => {
                console.log(res.data);
                this.setState({ equipos: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getPrestamosByFields(e) {
        e.preventDefault();
        let cedula = this.state.cedula === "" ? null : this.state.cedula;
        let subcategoria = parseInt(this.state.equipoSelected) === 0 ? null : parseInt(this.state.equipoSelected);
        let desde = this.convertDate(this.state.desde);
        let hasta = this.convertDate(this.state.hasta);
        let queryParams = this.makeQuery(cedula, subcategoria, desde, hasta);
        console.log(queryParams);
        axios.get("http://localhost:8080/scc/prestamos/fields" + queryParams)
            .then(res => {
                this.setState({ prestamos: res.data });
            });
    }

    makeQuery(cedula, subcategoria, desde, hasta) {
        if (cedula === null && subcategoria === null && desde === null && hasta === null) { return ""; }
        let query = "?", cantidad = 0;
        if (cedula !== null) { if (cantidad > 0) { query += "&"; } query += "documento=" + cedula; cantidad++; }
        if (subcategoria !== null) { if (cantidad > 0) { query += "&"; } query += "idSubcategoria=" + subcategoria; cantidad++; }
        if (desde !== null) { if (cantidad > 0) { query += "&"; } query += "inicio=" + desde; cantidad++; }
        if (hasta !== null) { if (cantidad > 0) { query += "&"; } query += "devolucion=" + hasta; cantidad++; }
        return query;
    }

    convertDate(date){
        if(date === undefined){ return null; }
        return date + ":00Z";
    }

    fromRFCToFormat(date){
        if(date === undefined){ return ""; }
        let fecha = new Date(date);
        return fecha.getUTCDate() + "/" + (fecha.getUTCMonth() + 1) +
            "/" + fecha.getUTCFullYear() + " " + fecha.getUTCHours() +
            ":" + fecha.getUTCMinutes() + ":" + fecha.getUTCSeconds();
    }

    async getPrestamosFromRFID(e) {
        e.preventDefault();
        this.setState({ rfidReading: true });
        let res = await axios.get("http://localhost:8080/scc/prestamos/rfid");
        if(res.status === 200){
            this.setState({ prestamos: res.data, rfidReading: false });
        }
        else{
            this.setState({prestamos: undefined, rfidReading: false});
        }
    }   


    savePrestamo(e, obj) {
        e.preventDefault();
        axios.post("http://localhost:8080/scc/prestamos", obj)
            .then(res => {
                this.setState({ prestamos: [res.data], showNuevo: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }    

}