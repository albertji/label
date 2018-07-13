import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Bundle from '../../router/Bundle';
import Home from 'bundle-loader?lazy&name=home!../Home/Home';
// import Home from '../Home/Home';

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);
export default class Menu extends Component {

    render() {
        return(
               111
            )
    }
}
