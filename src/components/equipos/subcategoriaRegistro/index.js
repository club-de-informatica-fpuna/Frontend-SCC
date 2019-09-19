import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class SubcategoriaRegistrar extends Component {

    constructor(props){
        super(props);
        this.state = {
            categorias: [],
            categoriaSelected: 0,
            denominacion: "",
            file: undefined
        };
    }

    componentWillMount(){
        this.getCategorias();
    }

    render() {

        var categorias = this.state.categorias;
        let categoriasOpciones = <option disabled>No hay categorías</option>;
        if(categorias !== undefined && categorias.length > 0){
            categoriasOpciones = categorias.map( (i) => (
                <option key={i.idCategoria} value={i.idCategoria}>
                    {i.denominacion}
                </option>
            ));
        }

        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva subcategoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategorias">
                            <Form.Label><b>Categoría</b></Form.Label>
                            <Form.Control
                                as="select"
                                value={this.state.categoriaSelected}
                                onChange={(e)=>{this.changeField(e, "categoriaSelected")}}>
                                <option value="0" key="0" disabled> - SELECCIONE CATEGORIA - </option>
                                {categoriasOpciones}
                            </Form.Control>
                        </Form.Group>     
                        <Form.Group controlId="formDescripcion">
                            <Form.Label><b>Descripción</b></Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.descripcion}
                                onChange={(e)=>{this.changeField(e, "descripcion")}}
                                placeholder="Ingrese la descripción"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label><b>Logo representante</b></Form.Label>
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


    getCategorias() {
        axios.get("http://localhost:8080/scc/categoria")
        .then(res => {
            this.setState({ categorias: res.data });
        });
    }
    
    handleSave(e){
        e.preventDefault();
        var obj = {
            idCategoria: this.state.categoriaSelected,
            denominacion: this.state.descripcion,
            logoRepresentante: this.state.file
        }
        if(true){ this.props.save(e, obj); }
    }

}