import React, { Component } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdClose, MdExposurePlus1, MdRefresh } from "react-icons/md";
import student from "../../../static/student.svg";
import { getBackEndContext, buildDate } from "../../../util/generate-util";
import axios from "axios";
import {notify} from 'react-notify-toast';
import "./inf-socio-style.css";

export default class SocioInf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDisabled: false,
      partnerImg: undefined,
      person: undefined,
      waitForRFID: false
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
      <Modal show={this.props.show} onHide={this.handleCloseModal.bind(this)} size="lg" dialogClassName="modal-90w">
        <div className="container">
          <div className="row">
            <div className="twPc-div" style={{ height: "16em" }}>
              <section className="twPc-bg twPc-block"></section>

              <div>
                <div className="twPc-button">
                  <Button variant="success" onClick={this.upPartner.bind(this)} style={{ display: this.props.mode ? "none" : "" }}>
                    <MdExposurePlus1 />
                  </Button>
                  <Button variant="info" onClick={this.updatePartner.bind(this)} style={{ display: this.props.mode && this.state.editDisabled ? "" : "none" }}>
                    <MdRefresh />
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="warning" onClick={this.handleDisableEdit.bind(this)} style={{ display: this.props.mode ? "" : "none" }}>
                    <FaRegEdit />
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="danger" onClick={this.handleCloseModal.bind(this)}>
                    <MdClose />
                  </Button>
                </div>

                <section className="twPc-avatarLink">
                  <img alt="Partner" className="twPc-avatarImg" src={this.state.partnerImg} />
                </section>

                <div className="twPc-divUser">
                  <div className="twPc-divName">
                    <span>{this.state.person.nombres} {this.state.person.apellidos}</span>
                  </div>
                  <span>{this.state.person.denominacion}</span>
                </div>

                <div className="twPc-divStats">
                  <ul className="twPc-Arrange">
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>

                      <span className="twPc-StatLabel twPc-block">
                        Cedula de identidad
                        </span>
                      <span className="twPc-StatValue">
                        <Form.Control style={{ background: "transparent", border: "transparent", paddingLeft: "0em" }}
                          type="text"
                          placeholder={this.state.person.ci}
                          disabled
                        />
                      </span>

                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                      
                        <span className="twPc-StatLabel twPc-block">
                          Fecha de Ingreso
                        </span>
                        <span className="twPc-StatValue">
                          <Form.Control style={{ background: "transparent", border: "transparent", paddingLeft: "0em" }}
                            type="date"
                            placeholder={this.state.person.fechaIngreso}
                            value={this.state.person.fechaIngreso}
                            onChange={(e) => {this.changeManager(e, "person", "fechaIngreso")}}
                            disabled={!this.state.editDisabled && this.props.mode}
                          />
                        </span>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                        <span className="twPc-StatLabel twPc-block">
                          Telefono
                        </span>
                        <span className="twPc-StatValue">
                          <Form.Control style={{ background: "transparent", border: "transparent", paddingLeft: "0em" }}
                            type="text"
                            placeholder={this.state.person.telefono}
                            disabled
                          />
                        </span>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                        <span className="twPc-StatLabel twPc-block">
                          Correo
                        </span>
                        <span className="twPc-StatValue">
                          <Form.Control style={{ background: "transparent", border: "transparent", paddingLeft: "0em" }}
                            type="text"
                            placeholder={this.state.person.email}
                            disabled />
                        </span>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em" }}>
                        <span className="twPc-StatLabel twPc-block">UUID</span>
                        <span className="twPc-StatValue">
                          <Form.Control style={{ background: "transparent", border: "transparent", paddingLeft: "0em" }}
                            type="text"
                            defaultValue={this.state.person.uuid}
                            placeholder={this.state.person.uuid}
                            disabled={this.state.editDisabled}
                          />
                        </span>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ paddingRight: "2em", display: this.props.mode && !this.state.editDisabled ? "none" : "" }}>
                        <Button variant="primary" disabled={false} onClick={this.getCodeRFID.bind(this)}>
                          RFID
                          <Spinner style={{ display: this.state.waitForRFID ? "" : "none" }} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        </Button>
                    </li>
                    <li className="twPc-ArrangeSizeFit" style={{ display: this.props.mode && !this.state.editDisabled ? "none" : "" }}>
                        <Button className="input-div-container" variant="primary" disabled={false}>
                          IMAGEN
                        <input className="input-file" type="file"
                            accept=".jpg, .png, .jpeg"
                            onChange={this.handleImgChange.bind(this)}
                          />
                        </Button>
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

  changeManager(e, fileName, subFilename) {
    e.preventDefault();
    let obj = {};
    if(fileName==="person" && subFilename!==undefined){
      obj = this.state.person;
      obj[subFilename] = e.target.value;
      this.setState({person:obj});
    }else{
      obj[fileName] = e.target.value;
      this.setState(obj);
    }
  }

  setInfShow(inf) {
    let personInf = {
      ci: "Nada que mostrar",
      fechaIngreso: new Date(),
      uuid: "No identificado",
      nombres: "Nada que mostrar",
      apellidos: "Nada que mostrar",
      denominacion: "Nada que mostrar",
      telefono: "Nada que mostrar",
      email: "Nada que mostrar",
      estado: false
    };
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
      personInf.idSocio      = inf.idSocio;
    } else if (inf !== undefined) {
      personInf.ci           = inf.ci;
      personInf.nombres      = inf.nombres.toUpperCase();
      personInf.apellidos    = inf.apellidos.toUpperCase();
      personInf.denominacion = inf.idCarrera.denominacion;
      personInf.telefono     = inf.telefono;
      personInf.email        = inf.email;
      personInf.idSocio      = inf.idSocio;
      personInf.estado       = inf.asociado;
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
      reader.onload = function () {
        this.setState({ partnerImg: reader.result });
      }.bind(this);
    }
  }

  async getCodeRFID(e) {
    e.preventDefault();
    let endPoint = getBackEndContext("socios/rfid/code");
    this.setState({ waitForRFID: true });
    await axios.get(endPoint).then(rs => {
      let personUpdateInf = this.state.person;
      personUpdateInf.uuid = rs.data;
      this.setState({ person: personUpdateInf, waitForRFID: false });
    }).catch(ex => {
      console.error(ex);
      this.setState({ waitForRFID: false });
    });
  }

  upPartner(e) {
    e.preventDefault();
    let endPoint = getBackEndContext("socios");
    let studentPost = {
      idSocio: this.state.person.idSocio,
      ci: this.state.person.ci,
      estado: this.state.person.estado,
      fechaIngreso: buildDate(this.state.person.fechaIngreso),
      foto: window.btoa(this.state.partnerImg),
      uuid: this.state.person.uuid
    };

    if(studentPost.idSocio === null) {
      studentPost.estado = true;
      axios.post(endPoint, studentPost).then(rs => {
        this.handleCloseModal();
        this.props.updateTable(e);
        notify.show(this.state.person.nombres.toUpperCase()+" ha sido correctamente asociado", "success");
      }).catch(error => {
        console.log(error);
        notify.show("Ocurrio un error al intentar asociar a "+this.state.person.nombres, "error");
      })
    } else {
      studentPost.estado = true;
      let name = this.state.person.nombres.toUpperCase();
      axios.put(endPoint, studentPost).then(rs => {
        this.handleCloseModal();
        this.props.updateTable(e);
        notify.show(name+" ha sido correctamente asociado", "success");
      }).catch(error => {
        console.log(error);
        notify.show("Ocurrio un error al intentar asociar a "+name, "error");
      })
    }
  }

  updatePartner(e) {
    e.preventDefault();
    let endPoint = getBackEndContext("socios");
    let studentPut = {
      idSocio: this.state.person.idSocio,
      ci: this.state.person.ci,
      estado: this.state.person.estado,
      fechaIngreso: buildDate(this.state.person.fechaIngreso),
      foto: window.btoa(this.state.partnerImg),
      uuid: this.state.person.uuid
    };
    let name = this.state.person.nombres.toUpperCase();
    axios.put(endPoint, studentPut).then(rs => {
      this.handleCloseModal();
      this.props.updateTable(e);
      notify.show("Los datos del socio "+name+" han sido actualizados correctamente", "success");
    }).catch(error => {
      console.log(error);
      notify.show("Ocurrio un error al intentar actualizar los datos del Socio "+name, "error");
    })
  }

}