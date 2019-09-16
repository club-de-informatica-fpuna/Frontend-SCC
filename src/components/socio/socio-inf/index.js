import React, { Component } from "react";
import { Modal, Button, FormGroup, FormControl } from "react-bootstrap";
import { FaRegEdit, FaUserGraduate } from "react-icons/fa";
import {MdClose} from 'react-icons/md';
import "./inf-socio-style.css";

export default class SocioInf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDisabled: false
    };
  }

  render() {
    let partnerInf = this.props.partnerInf;
    if (partnerInf === undefined) {
      return <></>;
    }

    let image = partnerInf.foto === undefined ?  <h1 className="twPc-avatarImg" style={{color:"#343a40", border:"13px solid #fff"}}><FaUserGraduate/></h1>  : <img className="twPc-avatarImg" src={"data:image/jpg;base64,"+partnerInf.foto}/>;
    return (
      <Modal show={this.props.show} onHide={this.handleCloseModal.bind(this)} size="lg">
        <div className="container">
          <div className="row">
            <div className="twPc-div">
              <a className="twPc-bg twPc-block"></a>

              <div>
                <div className="twPc-button">
                  <Button variant="warning" onClick={this.handleDisableEdit.bind(this)}><FaRegEdit/></Button>&nbsp;&nbsp;
                  <Button variant="danger" onClick={this.handleCloseModal.bind(this)}><MdClose/></Button>
                </div>

                <a className="twPc-avatarLink">{image}</a>

                <div className="twPc-divUser">
                  <div className="twPc-divName">
                    <a>{partnerInf.alumno.nombres} {partnerInf.alumno.apellidos}</a>
                  </div>
                  <span>
                    <a><span>{partnerInf.alumno.idCarrera.denominacion}</span></a>
                  </span>
                </div>

                <div className="twPc-divStats">
                  <ul className="twPc-Arrange">
                    <li className="twPc-ArrangeSizeFit" style={{paddingRight: "2em"}}>
                    <a title="CI">
                        <span className="twPc-StatLabel twPc-block">Cedula de identidad</span>
                        <span className="twPc-StatValue">{partnerInf.alumno.ci}</span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{paddingRight: "2em"}}>
                    <a title="Fecha de Ingreso">
                        <span className="twPc-StatLabel twPc-block">Fecha de Ingreso</span>
                        <span className="twPc-StatValue">{partnerInf.fechaIngreso}</span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit"style={{paddingRight: "2em"}}>
                      <a title="Telefono">
                        <span className="twPc-StatLabel twPc-block">Telefono</span>
                        <span className="twPc-StatValue">{partnerInf.alumno.telefono}</span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit">
                      <a title="Correo">
                        <span className="twPc-StatLabel twPc-block">Correo</span>
                        <span className="twPc-StatValue">{partnerInf.alumno.email}</span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={!this.state.editDisabled ? {display:"none"} : {}}>
                      <a title="Imagen">
                        <span className="twPc-StatLabel twPc-block">Subir imagen</span>
                        <span className="twPc-StatValue">
                          <FormControl type="file" accept=".jpg, .png" onChange={this.handleImgChange}  />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  handleCloseModal(){
    this.props.showFunction();
    this.setState({editDisabled:false});
  }

  handleDisableEdit(e){
    e.preventDefault();
    this.setState({editDisabled:true});
  }

  handleImgChange(e){
    console.log(e.target.files);
  }
}
