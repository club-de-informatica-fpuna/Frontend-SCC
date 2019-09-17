import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";

export default class EquipoInfo extends Component {

    constructor(props){
        super(props);
    }

    render() {
        var logo = require("./equip.png");
        var equipo = this.props.equipo;
        if(equipo === undefined){ return (<></>) }
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title><b>{"Equipo: "}</b>{equipo.descripcion}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: "center"}}>
                        <Image className="representative-image" src={ equipo.foto != undefined ? ("data:image/png;base64," + equipo.foto) : logo} width="150" thumbnail />
                    </p>
                    <section className="modal-info-fields">
                        <p><strong>DESCRIPCIÓN: </strong>{equipo.descripcion}</p>
                        <p><strong>FECHA ADQUISICIÓN: </strong>{this.fromRFCToFormat(equipo.fechaAdquisicion)}</p>
                        <p><strong>ESTADO: </strong>{equipo.estado ? "DISPONIBLE" : "NO DISPONIBLE"}</p>
                        <p><strong>CATEGORÍA: </strong>{equipo.idSubcategoria.idCategoria.denominacion}</p>
                        <p><strong>SUBCATEGORÍA: </strong>{equipo.idSubcategoria.denominacion}</p>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
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

}