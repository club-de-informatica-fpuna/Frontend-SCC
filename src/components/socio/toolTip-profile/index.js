import React, {Component} from 'react';
import student from '../../../static/student.svg';
import './toolTip-style.css';

export default class ToolTipSocio extends Component {

    render(){
        let toolTipImg = this.props.image === undefined ? <img alt="" src={student}/> : <img alt={student} src={this.props.image}/>;
        return(
            <div className={this.props.className} style={this.props.style}>
                <div style={{textAlign: "-webkit-right"}}>
                    <div className="col-md-7">
                        <div className="card-tooltip hovercard">
                            <div className="cardheader">
                                
                            </div>
                            <div className="avatar">
                                {toolTipImg}
                            </div>
                            <div className="info">
                                <div className="title"><h3>{this.props.partnerName}</h3></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}