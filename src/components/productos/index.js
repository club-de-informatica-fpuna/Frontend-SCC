import React, { Component } from 'react';
import { Form, Col, Button, Table } from "react-bootstrap";
import { FaSearch, FaPlus, FaUserEdit, FaTrash, FaInfo } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import axios from "axios";

export default class Productos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productos: []
        };
    }

    componentWillMount() {
        this.getProductos();
    }

    render() {
        var productos = this.state.productos;
        let tableResults = <div></div>;
        if (productos !== undefined && productos.length > 0) {
            tableResults = productos.map((i) => (
                <tr>
                    <td style={{textAlign: "center"}}>{i.idProducto}</td>
                    <td style={{textAlign: "center"}}></td>
                    <td style={{textAlign: "center"}}>{i.denominacion}</td>
                    <td style={{textAlign: "center"}}>{i.precio + " GS."}</td>
                    <td style={{textAlign: "center"}}>{i.estado ? "DISPONIBLE" : "NO DISPONIBLE"}</td>
                    <td style={{textAlign: "center"}}>{i.cantidad}</td>                  
                    <td style={{textAlign: "center"}}>
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
                <h3 style={{ fontFamily: "Lato Light", textAlign: "left" }}>Productos</h3>
                <Button>
                    <FaPlus />&nbsp;&nbsp;
                    <b>Nuevo</b>
                </Button>
                <Table hover responsive style={{ fontSize: "12px", marginTop: "10px" }}>
                    <thead style={{background: "#343a40", color: "white"}}>
                        <tr>
                            <th style={{textAlign: "center"}}>ID</th>
                            <th style={{textAlign: "center"}}>FOTO</th>
                            <th style={{textAlign: "center"}}>DENOMINACION</th>
                            <th style={{textAlign: "center"}}>PRECIO</th>
                            <th style={{textAlign: "center"}}>ESTADO</th>
                            <th style={{textAlign: "center"}}>CANTIDAD</th>                            
                            <th style={{textAlign: "center"}}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableResults}
                    </tbody>
                </Table>
            </section>
        );
    }

    onChangeField(e, field) {
        var obj = {};
        console.log(e.target.value);
        obj[field] = e.target.value;
        this.setState(obj);
    }

    getProductos() {
        axios.get("http://localhost:8080/scc/productos")
        .then(res => {
            this.setState({ productos: res.data });
        })
        .catch(error => {
            console.log(error);
        });
    }

}