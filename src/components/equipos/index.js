import React, { Component } from "react";
import { Accordion, Card, Button, Image } from "react-bootstrap";
import axios from "axios";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa";
import EquipoRegistrar from "./equipoRegistro";
import EquipoEditar from "./equipoEdit";
import CategoriaRegistrar from "./categoriaRegistro";
import "./equipos.css";

export default class Equipos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            equipos: [],
            showNuevoEquipo: false,
            showNuevaCategoria: false,
            showEditarEquipo: false,
            equipo: undefined
        };
    }

    componentWillMount() {
        this.getEquiposByCategorias();
    }

    render() {
        let equipos = this.state.equipos;
        let categoriasMostrar = <span>No hay equipos</span>;
        if (equipos !== undefined && equipos.length > 0) {
            categoriasMostrar = equipos.map((i) => (
                <Accordion className="col-md-12" defaultActiveKey="0" style={{ marginBottom: "10px", padding: 0}}>
                    <Card style={{borderBottom: "1px solid silver"}}>
                        <Accordion.Toggle className="card-header-title" as={Card.Header} eventKey="0">
                            <b>{i.denominacion}</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="card-body">
                                {this.getSubcategorias(i.subcategorias, i)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            ));
        }

        return (
            <>
                <EquipoEditar show={this.state.showEditarEquipo} close={this.closeEditarEquipo.bind(this)} update={this.updateEquipo.bind(this)} equipo={this.state.equipo}/>
                <EquipoRegistrar show={this.state.showNuevoEquipo} close={this.closeNuevoEquipo.bind(this)} save={this.saveEquipo.bind(this)}/>
                <CategoriaRegistrar show={this.state.showNuevaCategoria} close={this.closeNuevaCategoria.bind(this)} save={this.saveCategoria.bind(this)}/>
                <h3 style={{ fontFamily: "Lato Light", textAlign: "left" }}>Equipos</h3>
                <section style={{marginTop: "10px"}}>
                    <Button onClick={this.showNuevoEquipo.bind(this)}>
                        <b>Nuevo equipo</b>
                    </Button>&nbsp;&nbsp;
                    <Button onClick={this.showNuevaCategoria.bind(this)}>
                        <b>Nueva categoría</b>
                    </Button>&nbsp;&nbsp;
                    <Button><b>Nueva subcategoría</b></Button>
                </section>
                <section className="row" style={{ display: "flex", padding: "12px"}}>
                    {categoriasMostrar}
                </section>
            </>
        );
    }

    getSubcategorias(subcategorias, categoria) {
        let subcategoriasMostrar = subcategorias.map((j) => (
            <Accordion defaultActiveKey="0" style={{ borderBottom: "1px solid silver", marginBottom: "10px" }}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <b>{j.denominacion}</b>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {this.getEquipos(j.equipos, j, categoria)}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        ));
        return subcategoriasMostrar;
    }

    getEquipos(equipos, subcategoria, categoria) {
        let equiposMostrar = equipos.map((k) => (
            <Accordion defaultActiveKey="0" style={{ borderBottom: "1px solid silver", marginBottom: "10px" }}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <b>{k.descripcion}</b>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <section style={{display: "inline-block"}}>
                                <p><b>Fecha adquisición: </b>{this.convertDate(k.fechaAdquisicion)}</p>
                                <p><b>Estado: </b>{k.estado ? "DISPONIBLE" : "NO DISPONIBLE"}</p>
                                    <Button variant="warning" size="sm" onClick={(e) => {this.showEditarEquipo(e, k, subcategoria, categoria)}}>
                                        <FaPen/>
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" size="sm">
                                        <FaTrash/>
                                    </Button>
                            </section>
                            <section style={{display: "inline-block", float: "right"}} hidden={k.foto != undefined ? false : true}>
                                <Image src={("data:image/png;base64," + k.foto)} width="100" thumbnail/>
                            </section>                            
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        ));
        return equiposMostrar;
    }

    showNuevoEquipo(e){
        e.preventDefault();
        this.setState({ showNuevoEquipo: true });
    }

    showEditarEquipo(e, equipo, subcategoria, categoria){
        e.preventDefault();
        equipo["subcategoria"] = subcategoria;
        equipo["categoria"] = categoria;
        console.log(equipo);
        this.setState({ showEditarEquipo: true, equipo: equipo });
    }

    closeEditarEquipo(e){
        e.preventDefault();
        this.setState({ showEditarEquipo: false });
    }

    showNuevaCategoria(e){
        e.preventDefault();
        this.setState({ showNuevaCategoria: true });
    }

    closeNuevaCategoria(e){
        e.preventDefault();
        this.setState({ showNuevaCategoria: false });
    }

    closeNuevoEquipo(e){
        e.preventDefault();
        this.setState({ showNuevoEquipo: false });
    }    

    convertDate(date){
        let fecha = new Date(date);
        return this.checkDigits(fecha.getUTCDate()) + 
        "/" + this.checkDigits(fecha.getUTCMonth()) + 
        "/" + this.checkDigits(fecha.getUTCFullYear());
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }    

    getEquiposByCategorias() {
        axios.get("http://localhost:8080/scc/equipos/categorias")
        .then(res => {
            this.setState({ equipos: res.data });
        })
        .catch(res => {
            this.setState({ equipos: undefined });
        })
    }

    saveEquipo(e, obj){
        e.preventDefault();
        console.log(obj);
        axios.post("http://localhost:8080/scc/equipos", obj)
        .then(res => {
            this.setState({showNuevoEquipo: false}, this.getEquiposByCategorias());
        })
        .catch((error) => {
            console.log(error);
            this.setState({showNuevoEquipo: false});
        });
    }

    updateEquipo(e, obj){
        e.preventDefault();
        console.log(obj);
        axios.put("http://localhost:8080/scc/equipos", obj)
        .then(res => {
            this.setState({showEditarEquipo: false}, this.getEquiposByCategorias());
        })
        .catch((error) => {
            console.log(error);
            this.setState({showEditarEquipo: false});
        });
    }    

    saveCategoria(e, obj){
        e.preventDefault();
        console.log(obj);
        axios.post("http://localhost:8080/scc/categoria", obj)
        .then(res => {
            this.setState({showNuevaCategoria: false}, this.getEquiposByCategorias());
        })
        .catch((error) => {
            console.log(error);
        });
    }

}