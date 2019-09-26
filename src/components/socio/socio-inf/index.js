import React, { Component } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdClose, MdExposurePlus1, MdRefresh } from "react-icons/md";
import student from "../../../static/student.svg";
import { getBackEndContext } from "../../../util/generate-query-params";
import axios from "axios";
import "./inf-socio-style.css";

export default class SocioInf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDisabled: false,
      partnerImg: undefined,
      person: undefined,
      waitForRFID:false
    };
  }

  componentWillReceiveProps(next) {
    let photo =
      next.partnerInf !== undefined && next.partnerInf.foto !== undefined
        ? next.partnerInf.foto
        : student;
    this.setInfShow(next.partnerInf);
    this.setState({ partnerImg: photo });
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
            <div className="twPc-div" style={{ height: "16em" }}>
              <a className="twPc-bg twPc-block"></a>

              <div>
                <div className="twPc-button">
                  <Button variant="success" onClick={this.upPartner.bind(this)} style={{display: this.props.mode ? "none" :"" }}>
                    <MdExposurePlus1/>
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="info" style={{display: this.props.mode ? "" :"none" }}>
                    <MdRefresh/>
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="warning" onClick={this.handleDisableEdit.bind(this)} style={{display: this.props.mode ? "" :"none" }}>
                    <FaRegEdit />
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="danger" onClick={this.handleCloseModal.bind(this)}>
                    <MdClose />
                  </Button>
                </div>

                <a className="twPc-avatarLink">
                  <img className="twPc-avatarImg" src={this.state.partnerImg} />
                </a>

                <div className="twPc-divUser">
                  <div className="twPc-divName">
                    <a>{this.state.person.nombres} {this.state.person.apellidos}</a>
                  </div>
                  <span>
                    <a><span>{this.state.person.denominacion}</span></a>
                  </span>
                </div>

                <div className="twPc-divStats">
                  <ul className="twPc-Arrange">
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                      <a title="CI">
                        <span className="twPc-StatLabel twPc-block">
                          Cedula de identidad
                        </span>
                        <span className="twPc-StatValue">
                          <Form.Control style={{background: "transparent",border: "transparent",paddingLeft: "0em"}}
                            type="text"
                            placeholder={this.state.person.ci}
                            disabled
                          />
                        </span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                      <a title="Fecha de Ingreso">
                        <span className="twPc-StatLabel twPc-block">
                          Fecha de Ingreso
                        </span>
                        <span className="twPc-StatValue">
                        <Form.Control style={{background: "transparent",border: "transparent",paddingLeft: "0em"}}
                            type="text"
                            placeholder={this.state.person.fechaIngreso}
                            disabled={this.state.editDisabled}
                          />
                        </span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                      <a title="Telefono">
                        <span className="twPc-StatLabel twPc-block">
                          Telefono
                        </span>
                        <span className="twPc-StatValue">
                        <Form.Control style={{background: "transparent",border: "transparent",paddingLeft: "0em"}}
                            type="text"
                            placeholder={this.state.person.telefono}
                            disabled
                          />
                        </span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                      <a title="Correo">
                        <span className="twPc-StatLabel twPc-block">
                          Correo
                        </span>
                        <span className="twPc-StatValue">
                        <Form.Control style={{background: "transparent",border: "transparent",paddingLeft: "0em"}}
                            type="text"
                            placeholder={this.state.person.email}
                            disabled/>
                        </span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                      <a title="UUID">
                        <span className="twPc-StatLabel twPc-block">UUID</span>
                        <span className="twPc-StatValue">
                        <Form.Control style={{background: "transparent",border: "transparent",paddingLeft: "0em"}}
                            type="text"
                            value={this.state.person.uuid}
                            placeholder={this.state.person.uuid}
                            disabled={this.state.editDisabled}
                          />
                        </span>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em", display: this.props.mode && !this.state.editDisabled ? "none" :"" }}>
                      <a title="UUID-BUTTON" style={{paddingTop:".5em"}}>
                          <Button variant="primary" disabled={false} onClick={this.getCodeRFID.bind(this)}>
                          RFID
                          <Spinner style={{display: this.state.waitForRFID ? "" : "none"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                        </Button>
                      </a>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ display:this.props.mode && !this.state.editDisabled ? "none" :"" }}>
                      <a style={{paddingTop:".5em"}}>
                      <Button className="input-div-container" variant="primary" disabled={false}>
                        IMAGEN
                        <input className="input-file" type="file"
                          accept=".jpg, .png, .jpeg"
                          onChange={this.handleImgChange.bind(this)}
                        />
                      </Button>
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
  handleCloseModal() {
    this.props.showFunction();
    this.setState({ editDisabled: false });
  }

  handleDisableEdit(e) {
    e.preventDefault();
    this.setState({ editDisabled: !this.state.editDisabled });
  }

  changeManager(e, fileName){
    e.preventDefault();
    let obj = {};
    console.log(e.target.value);
    obj[fileName] = e.target.value;
    this.setState(obj);
  }

  setInfShow(inf) {
    let personInf = {
      ci: "Nada que mostrar",
      fechaIngreso: new Date().toJSON().slice(0,19),
      uuid: "Nada que mostrar",
      nombres: "Nada que mostrar",
      apellidos: "Nada que mostrar",
      denominacion: "Nada que mostrar",
      telefono:  "Nada que mostrar",
      email: "Nada que mostrar",
      estado: true
    };
    console.log(inf);
    if (this.props.mode && inf !== undefined) {
      personInf.ci           = inf.alumno.ci;
      personInf.fechaIngreso = inf.fechaIngreso;
      personInf.uuid         = inf.uuid;
      personInf.nombres      = inf.alumno.nombres.toUpperCase();
      personInf.apellidos    = inf.alumno.apellidos.toUpperCase();
      personInf.denominacion = inf.alumno.idCarrera.denominacion;
      personInf.telefono     = inf.alumno.telefono;
      personInf.email        = inf.alumno.email;
      personInf.estado       = inf.estado;
    } else if (inf !== undefined) {
      personInf.ci           = inf.ci;
      personInf.nombres      = inf.nombres.toUpperCase();
      personInf.apellidos    = inf.apellidos.toUpperCase();
      personInf.denominacion = inf.idCarrera.denominacion;
      personInf.telefono     = inf.telefono;
      personInf.email        = inf.email;
    }
    this.setState({ person: personInf });
  }

  handleImgChange(e) {
    //window.btoa(str) encripta
    //window.atob(photo)
    e.preventDefault();
    var file = e.target.files;
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function() {
        this.setState({ partnerImg: reader.result });
      }.bind(this);
    }
  }

  async getCodeRFID(e) {
    e.preventDefault();
    let endPoint = getBackEndContext("socios/rfid/code");
    this.setState({waitForRFID:true});
    await axios.get(endPoint).then(rs => {
      let personUpdateInf = this.state.person;
      personUpdateInf.uuid = rs.data;
      this.setState({person:personUpdateInf, waitForRFID:false});
    }).catch(ex => {
      console.error(ex);
      this.setState({waitForRFID:false});
    });
  }

  upPartner(e){
    e.preventDefault();
    let endPoint = getBackEndContext("socios");
    let studentPost = {
      ci: this.state.person.ci,
      estado: this.state.person.estado,
      fechaIngreso: this.state.person.fechaIngreso,
      foto: window.btoa(this.state.partnerImg),
      uuid: this.state.person.uuid
    };

    axios.post(endPoint, studentPost).then(rs => {

    }).catch(error => {
        console.log(error);
    })
  }

}
