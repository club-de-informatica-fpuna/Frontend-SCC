import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class EquipoRegistrar extends Component {

    constructor(props){
        super(props);
        this.state = {
            idEquipo: undefined,
            descripcion: "",
            fechaAdquisicion: "",
            categoriaSelected: 0,
            subcategoriaSelected: 0,
            categorias: [],
            subcategorias: [],
            file: undefined
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.equipo !== undefined){
            this.getSubcategorias(nextProps.equipo.categoria.idCategoria);
            this.setState({
                idEquipo: nextProps.equipo.idEquipo,
                descripcion: nextProps.equipo.descripcion,
                fechaAdquisicion: nextProps.equipo.fechaAdquisicion,
                categoriaSelected: nextProps.equipo.categoria.idCategoria,
                subcategoriaSelected: nextProps.equipo.subcategoria.idSubcategoria,
                file: nextProps.equipo.foto
            });
        }
    }

    now(){
        let date = new Date();
        let stringDate = date.getUTCFullYear() + "-" + this.checkDigits(date.getUTCMonth()+1) + "-" + this.checkDigits(date.getUTCDate());
        let time = this.checkDigits(date.getHours()) + ":" + this.checkDigits(date.getUTCMinutes());
        return stringDate + "T" + time;
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }
    
    componentWillMount(){
        this.getCategorias();
    }

    render() {
        let categorias = this.state.categorias;
        let subcategorias = this.state.subcategorias;
        let optionsSubcategorias = <option value="-1" disabled>No hay subcategorias</option>;
        let optionsCategorias = <option value="-1" disabled>No hay categorías</option>;
        if(categorias !== undefined && categorias.length > 0){
            optionsCategorias = categorias.map( (i) => (
                <option key={i.idCategoria} value={i.idCategoria}>
                    {i.denominacion}
                </option>
            ));
        }
        if(subcategorias !== undefined && subcategorias.length > 0){
            optionsSubcategorias = subcategorias.map( (i) => (
                <option key={i.idSubcategoria} value={i.idSubcategoria}>
                    {i.denominacion}
                </option>
            ));
        }
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar equipo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.descripcion}
                                onChange={(e)=>{this.changeField(e, "descripcion")}}
                                placeholder="Ingrese la descripción"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdquisicion">
                            <Form.Label>Fecha adquisición</Form.Label>
                            <Form.Control
                                type="date"
                                value={this.state.fechaAdquisicion}
                                onChange={(e)=>{this.changeField(e, "fechaAdquisicion")}}                                
                            />
                        </Form.Group>
                        <Form.Group controlId="formDocumento">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                as="select"
                                value={this.state.categoriaSelected}
                                onChange={this.changeCategorias.bind(this)}>
                                <option value="0" disabled> - SELECCIONE LA CATEGORÍA - </option>
                                {optionsCategorias}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDocumento">
                            <Form.Label>Subcategoría</Form.Label>
                            <Form.Control
                                as="select"
                                value={this.state.subcategoriaSelected}
                                onChange={(e)=>{this.changeField(e, "subcategoriaSelected")}}>
                                <option disabled value="0"> - SELECCIONE LA SUBCATEGORÍA - </option>
                                {optionsSubcategorias}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Fotografía</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Ingrese la imagen"
                                onChange={(e) => {this.changeFile(e)}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                    <Button variant="primary" onClick={this.handleSave.bind(this)}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    changeField(e, field){
        e.preventDefault();
        let obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    changeCategorias(e){
        e.preventDefault();
        this.setState({
            categoriaSelected: e.target.value,
        }, this.getSubcategorias(e.target.value));
    }

    getCategorias() {
        axios.get(process.env.REACT_APP_API_URL + "/categoria")
        .then(res => {
            this.setState({ categorias: res.data });
        });
    }

    getSubcategorias(categoria){
        axios.get(process.env.REACT_APP_API_URL + "/subcategoria/categoria/" + categoria)
        .then(res => {
            this.setState({ subcategorias: res.data });
        });
    }

    changeFile(e){
        e.preventDefault();
        var file = e.target.files[0];   
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function() {
            this.setState({
                file: window.btoa(reader.result)
            });
        }.bind(this);
    }

    handleSave(e){
        e.preventDefault();
        var obj = {
            idEquipo: this.state.idEquipo,
            descripcion: this.state.descripcion,
            estado: true,
            fechaAdquisicion: this.state.fechaAdquisicion,
            idSubcategoria: this.state.subcategoriaSelected,
            foto: this.state.file
        }
        if(true){ this.props.update(e, obj); }
    }

}