import React, { Component } from "react";
import { Accordion, Card, Button, Image } from "react-bootstrap";
import axios from "axios";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa";
import EquipoRegistrar from "./equipoRegistro";
import EquipoEditar from "./equipoEdit";
import CategoriaRegistrar from "./categoriaRegistro";
import SubcategoriaRegistrar from "./subcategoriaRegistro";
import Notifications, {notify} from 'react-notify-toast';
import "./equipos.css";

export default class Equipos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            equipos: [],
            showNuevoEquipo: false,
            showNuevaCategoria: false,
            showNuevaSubcategoria: false,
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
                        <Accordion.Toggle className="card-header-title" as={Card.Header} eventKey="0" style={{cursor: "pointer"}}>
                            <b>{i.denominacion.toUpperCase()}</b>
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
                <Notifications/>
                <EquipoEditar show={this.state.showEditarEquipo} close={this.closeEditarEquipo.bind(this)} update={this.updateEquipo.bind(this)} equipo={this.state.equipo}/>
                <EquipoRegistrar show={this.state.showNuevoEquipo} close={this.closeNuevoEquipo.bind(this)} save={this.saveEquipo.bind(this)}/>
                <CategoriaRegistrar show={this.state.showNuevaCategoria} close={this.closeNuevaCategoria.bind(this)} save={this.saveCategoria.bind(this)}/>
                <SubcategoriaRegistrar show={this.state.showNuevaSubcategoria} close={this.closeNuevaSubcategoria.bind(this)} save={this.saveSubcategoria.bind(this)}/>
                <section>
                    <Button onClick={this.showNuevoEquipo.bind(this)}>
                        <b>Nuevo equipo</b>
                    </Button>&nbsp;&nbsp;
                    <Button onClick={this.showNuevaCategoria.bind(this)}>
                        <b>Nueva categoría</b>
                    </Button>&nbsp;&nbsp;
                    <Button onClick={this.showNuevaSubcategoria.bind(this)}>
                        <b>Nueva subcategoría</b>
                    </Button>
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
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={{background: "#666666", color: "white", cursor: "pointer"}}>
                        <b>{j.denominacion.toUpperCase()}</b>
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
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={{cursor: "pointer"}}>
                        <b>{k.descripcion.toUpperCase()}</b>
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

    showNuevaSubcategoria(e){
        e.preventDefault();
        this.setState({ showNuevaSubcategoria: true });
    }

    showEditarEquipo(e, equipo, subcategoria, categoria){
        e.preventDefault();
        equipo["subcategoria"] = subcategoria;
        equipo["categoria"] = categoria;
        console.log(equipo);
        this.setState({ showEditarEquipo: true, equipo: equipo });
    }

    closeEditarEquipo(e){
        //e.preventDefault();
        this.setState({ showEditarEquipo: false });
    }

    showNuevaCategoria(e){
        e.preventDefault();
        this.setState({ showNuevaCategoria: true });
    }

    closeNuevaCategoria(e){
        //e.preventDefault();
        this.setState({ showNuevaCategoria: false });
    }

    closeNuevaSubcategoria(e){
        this.setState({ showNuevaSubcategoria: false });
    }    

    closeNuevoEquipo(e){
        //e.preventDefault();
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
        axios.get(process.env.REACT_APP_API_URL + "/equipos/categorias")
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
        axios.post(process.env.REACT_APP_API_URL + "/equipos", obj)
        .then(res => {
            notify.show("Equipo registrado exitosamente", "success");            
            this.setState({showNuevoEquipo: false}, this.getEquiposByCategorias());
        })
        .catch((error) => {
            console.log(error);
            notify.show("Ha ocurrido un error al registrar el equipo", "error");
            this.setState({showNuevoEquipo: false});
        });
    }

    updateEquipo(e, obj){
        e.preventDefault();
        console.log(obj);
        axios.put(process.env.REACT_APP_API_URL + "/equipos", obj)
        .then(res => {
            notify.show("Equipo actualizado exitosamente", "success");
            this.setState({showEditarEquipo: false}, this.getEquiposByCategorias());
        })
        .catch((error) => {
            notify.show("Ha ocurrido un error al actualizar el equipo", "error");
            console.log(error);
            this.setState({showEditarEquipo: false});
        });
    }    

    saveCategoria(e, obj){
        e.preventDefault();
        console.log(obj);
        axios.post(process.env.REACT_APP_API_URL + "/categoria", obj)
        .then(res => {
            notify.show("Categoría registrada exitosamente", "success");
            this.setState({showNuevaCategoria: false}, this.getEquiposByCategorias());
        })
        .catch((error) => {
            notify.show("Ha ocurrido un error al registrar la categoría", "error");
            this.setState({showNuevaCategoria: false});
        });
    }

    saveSubcategoria(e, obj){
        e.preventDefault();
        console.log(obj);
        axios.post(process.env.REACT_APP_API_URL + "/subcategoria", obj)
        .then(res => {
            notify.show("Subcategoría registrada exitosamente", "success");
            this.setState({showNuevaSubcategoria: false}, this.getEquiposByCategorias());
        })
        .catch((error) => {            
            notify.show("Ha ocurrido un error al registrar la subcategoría", "error");
            this.setState({showNuevaSubcategoria: false});
        });
    }

}