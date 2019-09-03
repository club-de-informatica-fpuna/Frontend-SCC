import React, {Component} from 'react';

import Home from './template/home'

class App extends Component {
  constructor(props, context) {
    super(props);
  }

  render(){
    const { path } = this.props.match;
    let currentPath = this.props.location;
    return (
      <Home pathMatch={path} currentPath={currentPath.pathname}/>
    );
  }
}
export default App;