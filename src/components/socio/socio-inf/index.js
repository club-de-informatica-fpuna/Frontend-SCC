import React, { Component } from "react";
import { Modal, Button, FormGroup, FormControl } from "react-bootstrap";
import { FaRegEdit, FaUserGraduate } from "react-icons/fa";
import {MdClose} from 'react-icons/md';
import student from '../../../static/student.svg';
import "./inf-socio-style.css";

export default class SocioInf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDisabled: false,
      partnerImg:undefined
    };
  }

  componentWillReceiveProps(next){
    let photo = next.partnerInf !== undefined && next.partnerInf.foto !== undefined ? next.partnerInf.foto : student;
    this.setState({partnerImg: photo});
  }

  render() {
    let partnerInf = this.props.partnerInf;
    if (partnerInf === undefined) {
      return <></>;
    }

    return (
      <Modal show={this.props.show} onHide={this.handleCloseModal.bind(this)} size="lg">
        <div className="container">
          <div className="row">
            <div className="twPc-div" style={this.state.editDisabled ? {height: "16em"}: {} }>
              <a className="twPc-bg twPc-block"></a>

              <div>
                <div className="twPc-button">
                  <Button variant="warning" onClick={this.handleDisableEdit.bind(this)}><FaRegEdit/></Button>&nbsp;&nbsp;
                  <Button variant="danger" onClick={this.handleCloseModal.bind(this)}><MdClose/></Button>
                </div>

                <a className="twPc-avatarLink"><img className="twPc-avatarImg" src={this.state.partnerImg}/></a>

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
                    <li className="twPc-ArrangeSizeFit" style={{paddingRight: "2em"}}>
                      <a title="Telefono">
                        <span className="twPc-StatLabel twPc-block">Telefono</span>
                        <span className="twPc-StatValue">{partnerInf.alumno.telefono}</span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{paddingRight: "2em"}}>
                      <a title="Correo">
                        <span className="twPc-StatLabel twPc-block">Correo</span>
                        <span className="twPc-StatValue">{partnerInf.alumno.email}</span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{paddingRight: "1em"}}>
                      <a title="UUID">
                        <span className="twPc-StatLabel twPc-block">UUID</span>
                        <span className="twPc-StatValue">{partnerInf.uuid}</span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={!this.state.editDisabled ? {display: "none"}: {} }>
                      <div className="input-div-container" style={{marginTop: "5px"}}>
		                    <p className="title">Agg img</p>
		                    <input className="input-file" type="file" accept=".jpg, .png" onChange={this.handleImgChange.bind(this)}/>
	                    </div> 
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
    this.setState({editDisabled:!this.state.editDisabled});
  }

  handleImgChange(e){
    //window.btoa(str) encripta
    //window.atob(photo)
    e.preventDefault();
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      this.setState({partnerImg:reader.result});
    }.bind(this);

  }
  
}
