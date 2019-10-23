import React, { Component } from 'react';
import { Card, ListGroup, Badge, Button} from "react-bootstrap";
import axios from 'axios';
import {getBackEndContext, buildQueryParams, formatoMoneda, getMonthYear} from '../../util/generate-util';

export default class Report extends Component {

    constructor(props){
        super(props);
        this.state = {
            today : [],
            todaySeven : [],
            year : []
        }
    }
    
    componentWillMount(){
        this.today();
        this.today7();
        this.year1();
    }

    render() {
        let {today, todaySeven, year} = this.state;
        let zeroSale = [{quantity: 0, total:0}];
        if (today.length === 0){
            today = zeroSale;
        }
        if (todaySeven.length === 0){
            todaySeven = zeroSale;
        }
        if (year.length === 0){
            year = zeroSale;
        }
        let titleSub = getMonthYear(new Date().getMonth());
        let todayRender     = (<ListGroup>
                                <ListGroup.Item>
                                    <Button variant="primary" disabled>
                                        CANTIDAD DE VENTAS: <Badge variant="light">{today[0].quantity}</Badge>
                                    </Button>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="primary" disabled>
                                        TOTAL DE VENTAS: <Badge variant="light">{formatoMoneda(today[0].total)}</Badge>
                                    </Button>
                                </ListGroup.Item>
                              </ListGroup>);
        let todaySevenRender = (<ListGroup>
                                  <ListGroup.Item>
                                    <Button variant="primary" disabled>
                                      CANTIDAD DE VENTAS: <Badge variant="light">{todaySeven[0].quantity}</Badge>
                                    </Button>
                                   </ListGroup.Item>
                                  <ListGroup.Item>
                                    <Button variant="primary" disabled>
                                      TOTAL DE VENTAS: <Badge variant="light">{formatoMoneda(todaySeven[0].total)}</Badge>
                                    </Button>
                                  </ListGroup.Item>
                                </ListGroup>);
        let yearRender      = (<ListGroup>
                                <ListGroup.Item>
                                    <Button variant="primary" disabled>
                                        CANTIDAD DE VENTAS: <Badge variant="light">{year[0].quantity}</Badge>
                                    </Button>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="primary" disabled>
                                        TOTAL DE VENTAS: <Badge variant="light">{formatoMoneda(year[0].total)}</Badge>
                                    </Button>
                                </ListGroup.Item>
                               </ListGroup>);    
        return (
            <>
                <div  className="col-md-12" style={{ textAlign: "center" }}>
                    <Card className="col-md-3 card-shortcuts">
                        <Card.Header className="card-header-shortcuts"></Card.Header>
                        <Card.Body style={{ textAlign: "center", cursor: "pointer" }}>
                            {todayRender}
                        </Card.Body>
                        <Card.Footer className="card-footer-shortcuts">
                            <Card.Link>HOY</Card.Link>
                        </Card.Footer>
                    </Card>
                    <Card className="col-md-3 card-shortcuts">
                        <Card.Header className="card-header-shortcuts"></Card.Header>
                        <Card.Body style={{ textAlign: "center", cursor: "pointer" }}>
                            {todaySevenRender}
                        </Card.Body>
                        <Card.Footer className="card-footer-shortcuts">
                            <Card.Link>DEL MES DE {titleSub.month}</Card.Link>
                        </Card.Footer>
                    </Card>
                    <Card className="col-md-3 card-shortcuts">
                        <Card.Header className="card-header-shortcuts"></Card.Header>
                        <Card.Body style={{ textAlign: "center", cursor: "pointer" }}>
                            {yearRender}
                        </Card.Body>
                        <Card.Footer className="card-footer-shortcuts">
                            <Card.Link>DEL AÑO {titleSub.year}</Card.Link>
                        </Card.Footer>
                    </Card>
                </div>
            </>
        );
    }

    today(){
        let params = {condition:"TODAY"};
        let pathRequest = buildQueryParams(params, getBackEndContext("ventas/report"));
        axios.get(pathRequest).then(rs => {
            let dataRs = rs.data;
            this.setState({ today: dataRs});
        }).catch(error => {
            console.log(error);
        });
    }

    today7(){
        let params = {condition:"7DAY"};
        let pathRequest = buildQueryParams(params, getBackEndContext("ventas/report"));
        axios.get(pathRequest).then(rs => {
            let dataRs = rs.data;
            this.setState({ todaySeven: dataRs });
        }).catch(error => {
            console.log(error);
        });
    }

    year1(){
        let params = {condition:"1YEAR"};
        let pathRequest = buildQueryParams(params, getBackEndContext("ventas/report"));
        axios.get(pathRequest).then(rs => {
            let dataRs = rs.data;
            this.setState({ year: dataRs });
        }).catch(error => {
            console.log(error);
        });
    }
}