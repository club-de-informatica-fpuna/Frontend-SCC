import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import axios from "axios";

export default class AlumnoInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            socio: undefined
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.alumno != undefined){
            var alumno = nextProps.alumno;
            if(alumno.asociado){
                this.getSocio(alumno.idSocio);
            }
            else{
                this.setState({socio: undefined});
            }
        }
    }

    render() {
        var logo = require("./user.png");
        var alumno = this.props.alumno;
        var socio = this.state.socio;
        if(alumno === undefined){ return (<></>) }
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title><b>{alumno.nombres.toUpperCase() + " " + alumno.apellidos.toUpperCase()}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: "center"}}>
                        <Image className="representative-image" src={ (socio != undefined && socio.foto != undefined) ? socio.foto : logo} width="150" roundedCircle />
                    </p>
                    <section className="modal-info-fields">
                        <p><strong>NOMBRES: </strong>{alumno.nombres}</p>
                        <p><strong>APELLIDOS: </strong>{alumno.apellidos}</p>
                        <p><strong>N° DOCUMENTO: </strong>{alumno.ci}</p>
                        <p><strong>TELÉFONO o CELULAR: </strong>{alumno.telefono}</p>
                        <p><strong>CORREO ELECTRÓNICO: </strong>{alumno.email}</p> 
                        <p><strong>CARRERA: </strong>{alumno.idCarrera.denominacion}</p>
                        <p><strong>ASOCIADO: </strong>{alumno.asociado ? "SÍ" : "NO"}</p>                                        
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    getSocio(id){
        axios.get(process.env.REACT_APP_API_URL + "/socios/" + id)
        .then(res => {
            this.setState({ socio: res.data  });
        })
        .catch(error => {
            this.setState({ socio: undefined });
        });
    }

}