import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {validateField, validateSelect} from "../../../util/validators";
import {FaFileImage} from "react-icons/fa";
import axios from "axios";

export default class SubcategoriaRegistrar extends Component {

    constructor(props){
        super(props);
        this.state = {
            categorias: [],
            categoriaSelected: 0,
            denominacion: "",
            file: undefined,
            fileSpan: "Seleccione el archivo",
            validated: true
        };
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
                            <span className="validation-field" hidden={validateSelect(this.state.categoriaSelected)}>Debe seleccionar una categoría</span>
                            <Form.Control
                                className={validateSelect(this.state.categoriaSelected) ? "input-validate-field-success" : "input-validate-field-error"}
                                as="select"
                                value={this.state.categoriaSelected}
                                onChange={(e)=>{this.changeField(e, "categoriaSelected")}}>
                                <option value="0" key="0" disabled> - SELECCIONE CATEGORIA - </option>
                                {categoriasOpciones}
                            </Form.Control>
                        </Form.Group>     
                        <Form.Group controlId="formDescripcion">
                            <Form.Label><b>Descripción</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.descripcion, 50, 3)}>La descripción es inválida</span>
                            <Form.Control
                                className={validateField(this.state.descripcion, 50, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                autoComplete="off"
                                value={this.state.descripcion}
                                onChange={(e)=>{this.changeField(e, "descripcion")}}
                                placeholder="Ingrese la descripción"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label><b>Logo representante</b></Form.Label>
                            <Form.Control id="file" hidden type="file" onChange={(e) => {this.changeFile(e)}}/>
                            <Form.Label className="input-file-field" for="file">
                                <FaFileImage/>&nbsp;&nbsp;
                                <span>{this.state.fileSpan}</span>
                            </Form.Label>                            
                        </Form.Group>
                    </Form>
                    <span className="validation-field" hidden={this.state.validated} style={{textAlign: "center", fontWeight: "bold"}}>Por favor, revise los campos marcados.</span>                    
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
        if(file !== undefined){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                this.setState({
                    file: window.btoa(reader.result),
                    fileSpan: file.name
                });
            }.bind(this);
        }
    }  

    validateAllFields(subcategoria){
        if(validateField(subcategoria.denominacion, 50, 3) &&
            validateSelect(subcategoria.idCategoria)){
            return true;
        }
        return false;
    }    

    getCategorias() {
        axios.get(process.env.REACT_APP_API_URL + "/categoria")
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
        if(this.validateAllFields(obj)){
            this.setState({validated: true}, this.props.save(e, obj));
        }
        else{
            this.setState({validated: false});
        }
    }

}