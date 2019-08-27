import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const sccApp = (
                <Router>
                    <Switch>
                        <Route path="/home" component={App}/>
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Router>
                ) ;

ReactDOM.render(sccApp, document.getElementById('root'));
serviceWorker.unregister();
