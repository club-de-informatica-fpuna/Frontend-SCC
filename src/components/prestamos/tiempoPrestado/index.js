import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import "./timer.css";

export default class TiempoPrestado extends Component {

    constructor(props){
        super(props);
        this.state = {
            hours: "00",
            minutes: "00",
            seconds: "00"
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.inicio !== undefined){
            let inicio = this.convert(nextProps.inicio);
            let current = this.now();
            console.log(inicio, current);
            let millis = current - inicio;
            console.log(millis);
            let time = new Date(millis);
            let hours = this.checkDigits(time.getUTCHours() + (time.getUTCDate() * 24 ));
            let minutes = this.checkDigits(time.getUTCMinutes());
            let seconds = this.checkDigits(time.getUTCSeconds());
            this.setState({
                hours: hours,
                minutes: minutes,
                seconds: seconds
            });
        }
    }

    convert(date){
        date = new Date(date).toLocaleString();
        return date;
    }

    now(){
        let date = new Date();
        return date;
    }

    checkDigits(digit){
        return digit < 10 ? ("0" + digit) : digit;
    }    

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close.bind(this)}>
                <Modal.Body>
                    <h3 style={{textAlign: "center", marginTop: "10px"}}>Tiempo transcurrido</h3>
                    <section style={{textAlign: "center"}}>
                        <span className="timer">
                            {this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds}
                        </span>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close.bind(this)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
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

}