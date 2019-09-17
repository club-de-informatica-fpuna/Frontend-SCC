import React, { Component } from 'react';
import { Button, Table } from "react-bootstrap";
import { FaPlus, FaUserEdit, FaTrash, FaInfo } from "react-icons/fa";
import Notifications, {notify} from 'react-notify-toast';
import axios from "axios";

export default class Ventas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ventas: []
        };
    }

    componentWillMount() {
        this.getVentas();
    }

    render() {
        var ventas = this.state.ventas;
        let tableResults = <div></div>;
        if (ventas !== undefined && ventas.length > 0) {
            tableResults = ventas.map((i) => (
                <tr>
                    <td style={{textAlign: "center"}}>{i.idVenta}</td>
                    <td style={{textAlign: "center"}}>{i.idProducto.denominacion}</td>
                    <td style={{textAlign: "center"}}>{i.fecha}</td>
                    <td style={{textAlign: "center"}}>{i.cantidad}</td>
                    <td style={{textAlign: "center"}}>{i.importe}</td>                    
                    <td style={{textAlign: "center"}}>
                        <Button
                            size="sm"
                            variant="warning"
                            title="Editar">
                            <FaUserEdit />
                        </Button>&nbsp;&nbsp;
                        <Button
                            onClick={(e) => {this.deleteVenta(e, i.idVenta)}}
                            size="sm"
                            variant="danger"
                            title="Eliminar">
                            <FaTrash />
                        </Button>&nbsp;&nbsp;
                        <Button
                            size="sm"
                            variant="info"
                            title="Info">
                            <FaInfo />
                        </Button>
                    </td>
                </tr>
            ));
        }

        return (
            <section>
                <Notifications/>
                <h3 style={{ fontFamily: "Lato Light", textAlign: "left" }}>Ventas</h3>
                <Button>
                    <FaPlus />&nbsp;&nbsp;
                    <b>Nuevo</b>
                </Button>
                <Table hover responsive style={{ fontSize: "12px", marginTop: "10px" }}>
                    <thead style={{background: "#343a40", color: "white"}}>
                        <tr>
                            <th style={{textAlign: "center"}}>ID</th>
                            <th style={{textAlign: "center"}}>PRODUCTO</th>
                            <th style={{textAlign: "center"}}>FECHA</th>                            
                            <th style={{textAlign: "center"}}>CANTIDAD</th>
                            <th style={{textAlign: "center"}}>TOTAL</th>
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

    getVentas() {
        axios.get("http://localhost:8080/scc/ventas")
        .then(res => {
            this.setState({ ventas: res.data });
        })
        .catch(error => {
            console.log(error);
        });
    }

    deleteVenta(e, id){
        e.preventDefault();
        axios.delete("http://localhost:8080/scc/ventas/" + id)
        .then(res => {
            notify.show("Se ha eliminado exitosamente", "success");
            this.getVentas();
        })
        .catch(error => {
            notify.show("Ha ocurrido un error al eliminar la venta", "error");
        });
    }

}