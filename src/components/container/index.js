import React, {Component} from 'react';

export default class Container extends Component {
    constructor(props, context){
        super(props);
    }

    render(){
        return(
            <div className="main-container" style={this.props.showSide ? {"marginLeft": "1%"}:{}}>
                ||Contenido||
            </div>
        );
    }
}