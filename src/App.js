import React, {Component} from 'react';

import Home from './template/home'

class App extends Component {
  render(){
    const { path } = this.props.match;
    return (
      <Home pathMatch={path}/>
    );
  }
}
export default App;