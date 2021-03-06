import React, { Component } from "react";
import { Modal, Button, Accordion, Card } from "react-bootstrap";
import axios from "axios";
import "../equipos.css";
export default class SearchEquipo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            equipos: []
        };
    }

    componentWillReceiveProps(props){
        this.getEquiposByCategorias();
    }

    componentWillMount() {
        this.getEquiposByCategorias();
    }

    render() {
        let equipos = this.state.equipos;
        let categoriasMostrar = <span>No hay equipos</span>;
        if (equipos !== undefined && equipos.length > 0) {
            categoriasMostrar = equipos.map((i) => (
                <Accordion defaultActiveKey="0" style={{borderBottom: "1px solid silver", marginBottom: "10px"}}>
                    <Card>
                        <Accordion.Toggle className="card-header-title-team" as={Card.Header} eventKey={i.idCategoria+i.denominacion}>
                            {i.denominacion}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={i.idCategoria+i.denominacion}>
                            <Card.Body className="card-body-team">
                                {this.getSubcategorias(i.subcategorias)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            ));
        }
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Equipos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {categoriasMostrar}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    getSubcategorias(subcategorias) {
        let subcategoriasMostrar = subcategorias.map((j) => (
            <Accordion defaultActiveKey="0" style={{borderBottom: "1px solid silver", marginBottom: "10px"}}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        {j.denominacion}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {this.getEquipos(j.equipos)}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        ));
        return subcategoriasMostrar;
    }

    getEquipos(equipos) {
        let equiposMostrar = equipos.map((k) => (
            <Accordion defaultActiveKey="0" style={{borderBottom: "1px solid silver", marginBottom: "10px"}}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={k.idEquipo}>
                        {k.descripcion}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={k.idEquipo}>
                        <Card.Body>
                            <span><b>Fecha adquisición: </b>{this.convertDate(k.fechaAdquisicion)}</span>
                            <Button
                                disabled={k.estado ? false : true}
                                size="sm"
                                style={{float: "right"}}
                                variant="primary"
                                onClick={(e)=>{this.props.selector(e, k.idEquipo, k.descripcion)}}
                            >
                                Seleccionar
                            </Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        ));
        return equiposMostrar;
    }

    changeField(e, field) {
        e.preventDefault();
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
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

    convertDate(date){
        let fecha = new Date(date);
        return this.checkDigits(fecha.getUTCDate()) + 
        "/" + this.checkDigits(fecha.getUTCMonth()) + 
        "/" + this.checkDigits(fecha.getUTCFullYear());
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }        

}