import React, { Component } from 'react';
import { Form, Col, Button, Table } from "react-bootstrap";
import { FaSearch, FaRss, FaTrash, FaReply, FaInfo, FaRegGrinBeamSweat } from "react-icons/fa";
import Registrar from "./registrar";
import AlumnoInfo from "../alumno/alumnoInfo";
import PrestamoInfo from "./prestamoInfo";
import EquipoInfo from "../equipos/equipoInfo";
import TiempoPrestado from "./tiempoPrestado";
import DevolucionModal from "./devolucion";
import RFIDReader from "../alumno/rfidReader";
import Notifications, {notify} from 'react-notify-toast';
import Paginator from "../paginator";
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
            alumnoBuscado: undefined,
            showAlumno: false,
            showInfo: false,
            showEquipo: false,
            showDevolucion: false,
            showTiempoPrestado: false,
            alumno: undefined,
            prestamo: undefined,
            equipo: undefined,
            fechaPrestamo: undefined,
            fechaDevolucion: undefined,
            loading: false,
            firstPage: 1,
            lastPage: undefined,
            currentPage: 1,
            pageSize: 5
        };
    }

    componentWillMount() {
        this.getEquipos();
        this.getPrestamosByFields(this.state.currentPage, this.state.pageSize);
    }

    render() {
        let haveResults = false;
        let equipos = this.state.equipos;
        let prestamos = this.state.prestamos;
        let equiposOptions = <option disabled>No hay equipos</option>;
        let tableResults = <><tr><td style={{borderTop: "none"}} ><FaRegGrinBeamSweat style={{height:"4em", width:"4em"}}/></td></tr>&nbsp;<tr>NO SE HAN ENCONTRADO RESULTADOS!!!</tr></>;
        if (equipos !== undefined && equipos.length > 0) {
            equiposOptions = equipos.map((i) => (
                <option
                    key={i.idSubcategoria}
                    value={i.idSubcategoria}
                >
                    {i.denominacion}
                </option>
            ));
        }
        if(prestamos !== undefined && prestamos.length > 0){
            haveResults = true;
            tableResults = prestamos.map((i) => (
                <tr>
                    <td>{i.idPrestamo}</td>
                    <td style={{textAlign: "center"}}>{i.alumno.nombres.toUpperCase()} {i.alumno.apellidos.toUpperCase()}</td>
                    <td style={{textAlign: "center"}}><Button variant="secondary" size="sm" onClick={(e) => {this.showAlumnoInfo(e, i.alumno)}}>{i.alumno.ci}</Button></td>
                    <td style={{textAlign: "center"}}><Button variant="secondary" size="sm" onClick={(e) => {this.showEquipoInfo(e, i.equipo)}}>{i.equipo.descripcion}</Button></td>
                    <td style={{textAlign: "center"}}>{this.fromRFCToFormat(i.fechaPrestamo)}</td>
                    <td style={{textAlign: "center"}}>
                        <Button onClick={(e) => {this.showTiempoPrestado(e, i.fechaPrestamo, i.fechaDevolucion)}} size="sm" style={i.fechaDevolucion == undefined ? {background: "#dc3545", border: "1px solid #dc3545", color: "white"} : {background: "#229954", border: "1px solid #229954", color: "white"}}>
                            {i.fechaDevolucion == undefined ? "NO DEVUELTO" : this.fromRFCToFormat(i.fechaDevolucion)}                  
                        </Button>
                    </td>
                    <td style={{textAlign: "center"}}>
                        <Button
                            style={{border: "2px solid white"}}
                            onClick={(e)=> {this.deletePrestamo(e, i.idPrestamo)}}
                            size="sm"
                            variant="danger"                            
                            title="Eliminar">
                            <FaTrash />
                        </Button>&nbsp;&nbsp;
                        <Button
                            disabled={i.estado}
                            style={{border: "2px solid white"}}
                            size="sm"
                            onClick={(e) => {this.showDevolucion(e, i)}}
                            variant="success"
                            title="Devolver">
                            <FaReply />
                        </Button>&nbsp;&nbsp;
                        <Button
                            style={{border: "2px solid white"}}
                            onClick={(e) => {this.showInfo(e, i)}}
                            size="sm"
                            variant="info"                            
                            title="Info"><FaInfo />
                        </Button>&nbsp;&nbsp;            
                    </td>                    
                </tr>
            ));
        }

        return (
            <section>
                <Notifications/>
                <TiempoPrestado show={this.state.showTiempoPrestado} close={this.closeTiempoPrestado.bind(this)} inicio={this.state.fechaPrestamo} fin={this.state.fechaDevolucion}/>
                <AlumnoInfo show={this.state.showAlumno} alumno={this.state.alumno} close={this.closeAlumnoInfo.bind(this)}/>
                <PrestamoInfo show={this.state.showInfo} prestamo={this.state.prestamo} close={this.closeInfo.bind(this)}/>                
                <EquipoInfo show={this.state.showEquipo} equipo={this.state.equipo} close={this.closeEquipoInfo.bind(this)} />
                <DevolucionModal show={this.state.showDevolucion} prestamo={this.state.prestamo} close={this.closeDevolucion.bind(this)} save={this.devolver.bind(this)}/>
                <Registrar
                    show={this.state.showNuevo}
                    close={this.closeNuevo.bind(this)}
                    save={this.savePrestamo.bind(this)}
                    showFunction={this.showNuevo.bind(this)}
                />
                <RFIDReader show={this.state.rfidReading}/>
                <Form>
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
                        <Button
                            variant="primary"
                            onClick={(e)=>{this.getPrestamosByFields(this.state.currentPage, this.state.pageSize)}}>
                            <FaSearch />
                        </Button>&nbsp;
                        <Button variant="primary" onClick={this.getPrestamosFromRFID.bind(this)}>
                            <FaRss />
                        </Button>&nbsp;
                        <Button variant="primary" onClick={this.showNuevo.bind(this)}>
                            <span>Nuevo</span>
                        </Button>
                    </Form.Row>
                </Form>
                <img alt="Cargando ..." hidden={!this.state.loading} src={"/loading.gif"} height={50} style={{marginTop: "10px"}}/>
                <section hidden={this.state.loading} style={{ marginTop: "10px" }}>
                    <Table hover={haveResults} responsive style={{ fontSize: "12px", textAlign: haveResults ? "" : "center" }}>
                        <thead hidden={!haveResults} style={{background: "#343a40", color: "white"}}>
                            <tr>
                                <th>ID</th>
                                <th style={{textAlign: "center"}}>NOMBRES Y APELLIDOS</th>
                                <th style={{textAlign: "center"}}>N° CÉDULA</th>
                                <th style={{textAlign: "center"}}>EQUIPO</th>
                                <th style={{textAlign: "center"}}>INICIO</th>
                                <th style={{textAlign: "center"}}>DEVOLUCIÓN</th>
                                <th style={{textAlign: "center"}}>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableResults}
                        </tbody>
                    </Table>
                    <Paginator
                        show={prestamos.length > 0}
                        prev={this.previousPage.bind(this)}
                        next={this.nextPage.bind(this)}
                        first={this.toFirstPage.bind(this)}
                        last={this.toLastPage.bind(this)}
                        firstPage={this.state.firstPage}
                        lastPage={this.state.lastPage}
                        currentPage={this.state.currentPage}
                    />
                </section>

            </section>
        );
    }

    closeTiempoPrestado(e){
        //e.preventDefault();
        this.setState({showTiempoPrestado: false});
    }

    showTiempoPrestado(e, inicio, devolucion){
        e.preventDefault();
        this.setState({
            showTiempoPrestado: true,
            fechaPrestamo: inicio,
            fechaDevolucion: devolucion
        });
    }

    showAlumnoInfo(e, alumno){
        e.preventDefault();
        this.setState({
            alumno: alumno,
            showAlumno: true
        });
    }

    showEquipoInfo(e, equipo){
        e.preventDefault();
        this.setState({
            equipo: equipo,
            showEquipo: true
        });
    }

    showDevolucion(e, prestamo){
        e.preventDefault();
        this.setState({
            prestamo: prestamo,
            showDevolucion: true
        });
    }

    showInfo(e, prestamo){
        e.preventDefault();
        this.setState({
            prestamo: prestamo,
            showInfo: true
        });
    }

    closeInfo(e){
        this.setState({
            showInfo: false
        });
    }

    closeAlumnoInfo(e){
        //e.preventDefault();
        this.setState({
            showAlumno: false
        });
    }

    closeDevolucion(e){
        this.setState({
            showDevolucion: false
        });
    }

    closeEquipoInfo(e){
        this.setState({
            showEquipo: false
        });
    }

    showNuevo(e) {
        this.setState({ showNuevo: true });
    }    

    closeNuevo(e) {
        //e.preventDefault();
        this.setState({ showNuevo: false });
    }

    onChangeField(e, field) {
        var obj = {};
        console.log(e.target.value);
        obj[field] = e.target.value;
        this.setState(obj);
    }

    getPrestamos() {
        this.setState({ loading: true });
        axios.get(process.env.REACT_APP_API_URL + "/prestamos")
        .then(res => {
            console.log(res.data);
            this.setState({ prestamos: res.data, loading: false });
        })
        .catch((error) => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    getEquipos() {
        axios.get(process.env.REACT_APP_API_URL + "/subcategoria")
            .then(res => {
                this.setState({ equipos: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getPrestamosByFields(page, pageSize) {
        this.setState({loading: true});
        let cedula = this.state.cedula === "" ? null : this.state.cedula;
        let subcategoria = parseInt(this.state.equipoSelected) === 0 ? null : parseInt(this.state.equipoSelected);
        let desde = this.convertDate(this.state.desde);
        let hasta = this.convertDate(this.state.hasta);
        let queryParams = this.makeQuery(cedula, subcategoria, desde, hasta, page, pageSize);
        axios.get(process.env.REACT_APP_API_URL + "/prestamos/fields" + queryParams)
        .then(res => {
            let dataEmpty = {content:[], pageable: {pageNumber:0}, totalPages:5};
            let dataPage = res.data === "" ? dataEmpty : res.data ;
            this.setState({
                prestamos: dataPage.content ,
                loading: false,
                currentPage: dataPage.pageable.pageNumber+1,
                lastPage: dataPage.totalPages
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    makeQuery(cedula, subcategoria, desde, hasta, page, pageSize) {
        let query = "?page=" + page + "&pageSize=" + pageSize;
        if (cedula !== null) { query += "&documento=" + cedula; }
        if (subcategoria !== null) { query += "&idSubcategoria=" + subcategoria; }
        if (desde !== null) { query += "&inicio=" + desde; }
        if (hasta !== null) { query += "&devolucion=" + hasta; }
        return query;
    }

    convertDate(date){
        if(date === undefined){ return null; }
        return date + ":00Z";
    }

    fromRFCToFormat(date){
        if(date === undefined){ return ""; }
        let fecha = new Date(date);
        return this.checkDigits(fecha.getUTCDate()) + "/" +
            this.checkDigits((fecha.getUTCMonth() + 1)) +
            "/" + fecha.getUTCFullYear() + " " +
            this.checkDigits(fecha.getUTCHours()) +
            ":" + this.checkDigits(fecha.getUTCMinutes()) +
            ":" + this.checkDigits(fecha.getUTCSeconds());
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }    

    async getPrestamosFromRFID(e) {
        e.preventDefault();
        this.setState({ rfidReading: true });
        let res = await axios.get(process.env.REACT_APP_API_URL + "/prestamos/rfid");
        if(res.status === 200){
            this.setState({ prestamos: res.data, rfidReading: false });
        }
        else{
            this.setState({prestamos: undefined, rfidReading: false});
        }
    }   


    savePrestamo(e, obj) {
        e.preventDefault();
        console.log(obj);
        axios.post(process.env.REACT_APP_API_URL + "/prestamos", obj)
        .then(res => {
            notify.show("Se ha realizado correctamente el préstamo", "success");
            this.setState({ prestamos: [res.data], showNuevo: false });
        })
        .catch((error) => {
            notify.show("Ha ocurrido un error al realizar la operación", "error");
            this.setState({ showNuevo: false });
        });
    }

    deletePrestamo(e, idPrestamo) {
        e.preventDefault();
        axios.delete(process.env.REACT_APP_API_URL + "/prestamos/" + idPrestamo)
        .then(res => {
            notify.show("Se ha eliminado correctamente el préstamo", "success");
            this.getPrestamosByFields(this.state.currentPage, this.state.pageSize);
        })
        .catch((error) => {
            notify.show("Ha ocurrido un error al eliminar el préstamo", "error");
            console.log(error);
        });
    }

    devolver(e, obj){
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + "/prestamos/devolucion", obj)
        .then(res => {
            notify.show("Se ha realizado la operación correctamente", "success");
            this.setState({ showDevolucion: false},
            this.getPrestamosByFields(this.state.currentPage, this.state.pageSize));
        })
        .catch((error) => {
            notify.show("Ha ocurrido un error al realizar la operación", "error");            
            console.log(error);
            this.setState({ showDevolucion: false});
        });        
    }

    nextPage(e){
        e.preventDefault();
        if((this.state.currentPage+1) <= this.state.lastPage){
            let change = this.state.currentPage + 1;
            this.setState({
                currentPage: change
            }, this.getPrestamosByFields(change, this.state.pageSize));
        }
    }

    previousPage(e){
        e.preventDefault();
        if((this.state.currentPage-1) >= this.state.firstPage){
            let change = this.state.currentPage - 1;
            this.setState({
                currentPage: change
            }, this.getPrestamosByFields(change, this.state.pageSize));
        }
    }

    toFirstPage(e){
        e.preventDefault();
        this.setState({currentPage: this.state.firstPage}, this.getPrestamosByFields(this.state.firstPage, this.state.pageSize));
    }

    toLastPage(e){
        e.preventDefault();
        this.setState({currentPage: this.state.lastPage}, this.getPrestamosByFields(this.state.lastPage, this.state.pageSize));
    }    

}