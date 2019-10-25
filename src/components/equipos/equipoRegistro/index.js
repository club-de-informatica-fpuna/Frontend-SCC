import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import {FaFileImage} from "react-icons/fa";
import {validateField, validateSelect, validateDate} from "../../../util/validators";

export default class EquipoRegistrar extends Component {

    constructor(props){
        super(props);
        this.state = {
            descripcion: "",
            fechaAdquisicion: this.now(),
            categoriaSelected: 0,
            subcategoriaSelected: 0,
            categorias: [],
            subcategorias: [],
            file: undefined,
            fileSpan: "Seleccione el archivo",
            validated: true
        };
    }

    componentWillMount(){
        this.getCategorias();
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
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo equipo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label><b>Descripción</b></Form.Label>
                            <span className="validation-field" hidden={validateField(this.state.descripcion, 50, 3)}>Descripción inválida</span>
                            <Form.Control
                                className={validateField(this.state.descripcion, 50, 3) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="text"
                                value={this.state.descripcion}
                                onChange={(e)=>{this.changeField(e, "descripcion")}}
                                placeholder="Ingrese la descripción"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdquisicion">
                            <Form.Label><b>Fecha adquisición</b></Form.Label>
                            <span className="validation-field" hidden={validateDate(this.state.fechaAdquisicion)}>Fecha inválida</span>
                            <Form.Control
                                className={validateDate(this.state.fechaAdquisicion) ? "input-validate-field-success" : "input-validate-field-error"}
                                type="datetime-local"
                                value={this.state.fechaAdquisicion}
                                onChange={(e)=>{this.changeField(e, "fechaAdquisicion")}}                                
                            />
                        </Form.Group>
                        <Form.Group controlId="formDocumento">
                            <Form.Label><b>Categoría</b></Form.Label>
                            <span className="validation-field" hidden={validateSelect(this.state.categoriaSelected)}>Debe seleccionar la categoría</span>
                            <Form.Control
                                as="select"
                                className={validateSelect(this.state.categoriaSelected) ? "input-validate-field-success" : "input-validate-field-error"}
                                value={this.state.categoriaSelected}
                                onChange={this.changeCategorias.bind(this)}>
                                <option value="0" disabled> - SELECCIONE LA CATEGORÍA - </option>
                                {optionsCategorias}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDocumento">
                            <Form.Label><b>Subcategoría</b></Form.Label>
                            <span className="validation-field" hidden={validateSelect(this.state.subcategoriaSelected)}>Debe seleccionar la subcategoría</span>
                            <Form.Control
                                as="select"
                                className={validateSelect(this.state.subcategoriaSelected) ? "input-validate-field-success" : "input-validate-field-error"}
                                value={this.state.subcategoriaSelected}
                                onChange={(e)=>{this.changeField(e, "subcategoriaSelected")}}>
                                <option disabled value="0"> - SELECCIONE LA SUBCATEGORÍA - </option>
                                {optionsSubcategorias}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label><b>Fotografía</b></Form.Label>
                            <Form.Control hidden type="file" placeholder="Ingrese la imagen" id="file"
                                onChange={(e) => {this.changeFile(e)}}
                            />
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

    validateAllFields(subcategoria){
        if(validateField(subcategoria.descripcion, 50, 3) &&
            validateDate(subcategoria.fechaAdquisicion) &&
            validateSelect(subcategoria.idSubcategoria) &&
            validateSelect(this.state.categoriaSelected)){
            return true;
        }
        return false;
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

    handleSave(e){
        e.preventDefault();
        var obj = {
            descripcion: this.state.descripcion,
            estado: true,
            fechaAdquisicion: this.state.fechaAdquisicion,
            idSubcategoria: this.state.subcategoriaSelected,
            foto: this.state.file
        }
        if(this.validateAllFields(obj)) { this.setState({validated: true}, this.props.save(e, obj)); }
        else { this.setState({validated: false}); }
    }

}