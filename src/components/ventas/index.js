import React, { Component } from 'react';
import { Button, Table } from "react-bootstrap";
import Notifications, {notify} from 'react-notify-toast';
import axios from "axios";
import VentaDetalle from "./ventaDetalle";
import VentaRegistro from "./ventaRegistro";
import Paginator from "../paginator";

export default class Ventas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ventas: [],
            venta: undefined,
            showNuevaVenta: false,
            showDetalle: false,
            loading: false,
            firstPage: 1,
            lastPage: undefined,
            currentPage: 1,
            pageSize: 5
        };
    }

    componentWillMount() {
        this.getVentas(this.state.currentPage, this.state.pageSize);
    }

    render() {
        var ventas = this.state.ventas;
        let tableResults = <div></div>;
        var havingResults = false;
        if (ventas !== undefined && ventas.length > 0) {
            havingResults = true;
            tableResults = ventas.map((i) => (
                <tr>
                    <td style={{textAlign: "center"}}>{i.id}</td>
                    <td style={{textAlign: "center"}}>{i.clienteNombre}</td>
                    <td style={{textAlign: "center"}}>{i.clienteDocumento}</td>
                    <td style={{textAlign: "center"}}>{this.fromRFCToFormat(i.fecha)}</td>
                    <td style={{textAlign: "center"}}>{this.formatoMoneda(i.importeTotal) + " GS."}</td>
                    <td style={{textAlign: "center"}}>
                        <Button
                            onClick={(e)=>{this.showVentaDetalle(e, i)}}
                            size="sm"
                            variant="info"
                            title="Info">
                            <strong>Ver items</strong>
                        </Button>
                    </td>                    
                </tr>
            ));
        }

        return (
            <section>
                <VentaRegistro show={this.state.showNuevaVenta} close={this.closeNuevaVenta.bind(this)} save={this.saveVenta.bind(this)}/>
                <VentaDetalle show={this.state.showDetalle} venta={this.state.venta} close={this.closeVentaDetalle.bind(this)}/>
                <Notifications/>
                <Button onClick={this.showNuevaVenta.bind(this)}>
                    <strong>Nueva venta</strong>
                </Button>
                <br/>
                <img alt="Cargando ..." hidden={!this.state.loading} src={"/loading.gif"} height={50} style={{marginTop: "10px"}}/>
                <Table hover responsive style={{ fontSize: "12px", marginTop: "10px" }} hidden={!havingResults}>
                    <thead style={{background: "#343a40", color: "white"}}>
                        <tr>
                            <th style={{textAlign: "center"}}>ID</th>
                            <th style={{textAlign: "center"}}>NOMBRE DEL CLIENTE</th>
                            <th style={{textAlign: "center"}}>N° DOCUMENTO</th>
                            <th style={{textAlign: "center"}}>FECHA</th>
                            <th style={{textAlign: "center"}}>TOTAL</th>
                            <th style={{textAlign: "center"}}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableResults}
                    </tbody>
                </Table>
                <Paginator
                    prev={this.previousPage.bind(this)}
                    next={this.nextPage.bind(this)}
                    first={this.toFirstPage.bind(this)}
                    last={this.toLastPage.bind(this)}
                    firstPage={this.state.firstPage}
                    lastPage={this.state.lastPage}
                    currentPage={this.state.currentPage}/>
            </section>
        );
    }

    showNuevaVenta(e){
        e.preventDefault();
        this.setState({ showNuevaVenta: true });
    }

    closeNuevaVenta(e){
        this.setState({ showNuevaVenta: false });
    }

    showVentaDetalle(e, i){
        e.preventDefault();
        this.setState({showDetalle: true, venta: i});
    }

    closeVentaDetalle(e){
        this.setState({showDetalle: false});
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

    onChangeField(e, field) {
        var obj = {};
        console.log(e.target.value);
        obj[field] = e.target.value;
        this.setState(obj);
    }

    getVentas(page, pageSize) {
        this.setState({loading: true});
        let query = "?page=" + page + "&pageSize=" + pageSize;
        axios.get(process.env.REACT_APP_API_URL + "/ventas" + query)
        .then(res => {
            this.setState({
                ventas: res.data.content,
                loading: false,
                currentPage: res.data.pageable.pageNumber+1,
                lastPage: res.data.totalPages
            });
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error);
        });
    }

    getVentaById(id){
        axios.get(process.env.REACT_APP_API_URL + "/ventas/" + id)
        .then(res => {
            this.setState({ ventas: [res.data] });
        })
        .catch(error => {
            console.log(error);
        });        
    }

    saveVenta(e, obj){
        console.log(obj);
        axios.post(process.env.REACT_APP_API_URL + "/ventas", obj)
        .then(res => {
            notify.show("Venta registrada exitosamente", "success");
            this.setState({ showNuevaVenta: false }, this.getVentaById(res.data.id));
        })
        .catch(error => {
            notify.show("Ha ocurrido un error al registrar la venta", "error");
            console.log(error);
            this.setState({ showNuevaVenta: false });
        });
    }

    deleteVenta(e, id){
        e.preventDefault();
        axios.delete(process.env.REACT_APP_API_URL + "/ventas/" + id)
        .then(res => {
            notify.show("Se ha eliminado exitosamente", "success");
            this.getVentas();
        })
        .catch(error => {
            notify.show("Ha ocurrido un error al eliminar la venta", "error");
        });
    }

    formatoMoneda(number){
        return new Intl.NumberFormat('de-DE').format(number);
    }

    nextPage(e){
        e.preventDefault();
        if((this.state.currentPage+1) <= this.state.lastPage){
            let change = this.state.currentPage + 1;
            this.setState({
                currentPage: change
            }, this.getVentas(change, this.state.pageSize));
        }
    }

    previousPage(e){
        e.preventDefault();
        if((this.state.currentPage-1) >= this.state.firstPage){
            let change = this.state.currentPage - 1;
            this.setState({
                currentPage: change
            }, this.getVentas(change, this.state.pageSize));
        }
    }

    toFirstPage(e){
        e.preventDefault();
        this.setState({currentPage: this.state.firstPage}, this.getVentas(this.state.firstPage, this.state.pageSize));
    }

    toLastPage(e){
        e.preventDefault();
        this.setState({currentPage: this.state.lastPage}, this.getVentas(this.state.lastPage, this.state.pageSize));
    }

}