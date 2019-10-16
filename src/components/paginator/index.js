import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import "./paginator.css";

export default class Paginator extends Component {

    render(){

        return(
            <section style={{textAlign: "right"}}>
                <Button className="btn-paginator-default" onClick={this.props.prev.bind(this)}><FaAngleLeft/></Button>&nbsp;&nbsp;
                <Button className="btn-paginator-default" onClick={this.props.first.bind(this)}><span>{this.props.firstPage}</span></Button>&nbsp;&nbsp;
                <Button className="btn-paginator-active"><span>{this.props.currentPage}</span></Button>&nbsp;&nbsp;
                <Button className="btn-paginator-default" onClick={this.props.last.bind(this)}><span>{this.props.lastPage}</span></Button>&nbsp;&nbsp;    
                <Button className="btn-paginator-default" onClick={this.props.next.bind(this)}><FaAngleRight/></Button>&nbsp;&nbsp;
            </section>
        );

    }

}