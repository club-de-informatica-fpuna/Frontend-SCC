import React, {Component} from 'react';
import {FaUserGraduate} from 'react-icons/fa'
import './toolTip-style.css';

export default class ToolTipSocio extends Component {

    render(){
        let toolTipImg = this.props.image === undefined ?  <h1><FaUserGraduate/></h1>  : <img alt="" src={"data:image/jpg;base64,"+this.props.image}/>;
        return(
            <div className={"container "+this.props.className} style={this.props.style}>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card hovercard">
                            <div className="cardheader">
                                
                            </div>
                            <div className="avatar" style={this.props.image === undefined ? {marginTop:"3em"} : {}}>
                                {toolTipImg}
                            </div>
                            <div className="info">
                                <div className="title"><h3>{this.props.partnerName}</h3></div>
                                <div className="desc">{this.props.career}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}