import React, { Component } from 'react';
import { Image, Button, Table } from "react-bootstrap";
import { FaUserEdit, FaTrash, FaInfo } from "react-icons/fa";
import ProductoRegistro from "./registro";
import ProductoInfo from "./productoInfo";
import Notifications, {notify} from 'react-notify-toast';
import axios from "axios";

export default class Productos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            producto: undefined,
            showNuevo: false,
            showProducto: false
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
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.idProducto}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                        <Image height={100} src={i.foto != undefined ? ("data:image/png;base64," + i.foto) : i.foto}/>
                    </td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.denominacion}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.precio + " GS."}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.cantidad > 0 ? "DISPONIBLE" : "AGOTADO"}</td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>{i.cantidad}</td>                  
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                        <Button
                            size="sm"
                            variant="warning"
                            title="Editar">
                            <FaUserEdit />
                        </Button>&nbsp;&nbsp;
                        <Button
                            onClick={(e)=>{this.deleteProducto(e, i.idProducto)}}
                            size="sm"
                            variant="danger"
                            title="Eliminar">
                            <FaTrash />
                        </Button>&nbsp;&nbsp;
                        <Button
                            onClick={(e)=>{this.showProducto(e, i)}}
                            size="sm"
                            variant="info"
                            title="Ver">
                            <FaInfo />
                        </Button>
                    </td>
                </tr>
            ));
        }

        return (
            <section>
                <Notifications/>
                <ProductoRegistro show={this.state.showNuevo} close={this.closeNuevoProducto.bind(this)} save={this.saveProducto.bind(this)}/>
                <ProductoInfo show={this.state.showProducto} producto={this.state.producto} close={this.closeProducto.bind(this)}/>
                <h3 style={{ fontFamily: "Lato Light", textAlign: "left" }}>Productos</h3>
                <Button onClick={this.showNuevoProducto.bind(this)}><b>Nuevo</b></Button>
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

    showNuevoProducto(e){
        e.preventDefault();
        this.setState({
            showNuevo: true
        });
    }

    closeNuevoProducto(e){
        this.setState({
            showNuevo: false
        });
    }

    showProducto(e, producto){
        e.preventDefault();
        this.setState({
            showProducto: true,
            producto: producto
        });
    }

    closeProducto(e){
        this.setState({
            showProducto: false
        });
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


    deleteProducto(e, id){
        e.preventDefault();
        axios.delete("http://localhost:8080/scc/productos/" + id)
        .then(res => {
            notify.show("Se ha eliminado exitosamente", "success");
            this.getProductos();
        })
        .catch(error => {
            notify.show("Ha ocurrido un error al eliminar el producto", "error");
        });
    }    

    saveProducto(e, obj){
        e.preventDefault();
        axios.post("http://localhost:8080/scc/productos", obj)
        .then(res => {
            notify.show("Se ha registrado el producto exitosamente", "success");
            this.setState({ productos: [res.data], showNuevo: false });
        })
        .catch(error => {
            notify.show("Ha ocurrido un error al registrar el producto", "error");
            console.log(error);
            this.setState({showNuevo: false});
        });        
    }

}