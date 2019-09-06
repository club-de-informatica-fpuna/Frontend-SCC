import React, { Component } from "react";
import { Modal, Button, Accordion, Card } from "react-bootstrap";
import axios from "axios";
export default class SearchEquipo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            equipos: []
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
                <Accordion defaultActiveKey="0" style={{borderBottom: "1px solid silver", marginBottom: "10px"}}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            {i.denominacion}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {this.getSubcategorias(i.subcategorias)}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            ));
        }
        return (
            <>
                <Modal show={this.props.show}>
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

    getEquipos(equipos){
        let equiposMostrar = equipos.map((k) => (
            <Accordion defaultActiveKey="0" style={{borderBottom: "1px solid silver", marginBottom: "10px"}}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        {k.descripcion}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <span><b>Fecha adquisición: </b>{k.fechaAdquisicion}</span>
                            <Button
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
        axios.get("http://localhost:8080/scc/equipos/categorias")
            .then(res => {
                this.setState({ equipos: res.data });
            })
            .catch(res => {
                this.setState({ equipos: undefined });
            })
    }

}