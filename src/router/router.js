import React from 'react';
import {Router, Route, Switch, Link,Redirect} from 'react-router-dom';
import Bundle from './Bundle';
import Login from 'bundle-loader?lazy&name=login!../pages/Login/Login';
import Menu from 'bundle-loader?lazy&name=menu!../pages/Menu/Menu';
import Home from 'bundle-loader?lazy&name=home!../pages/Home/Home';
import ProjectRelease from "bundle-loader?lazy&name=projectrelease!../pages/Project/ProjectRelease/ProjectRelease";

import history from '../public/history';

const Loading = function () {
    return <div></div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);
const getRouter = () => (
    <Router history={history}>
        <div className="portal">
            <Switch>
                <Route exact path="/" component={createComponent(Home)} />
                <Route path="/menu" component={createComponent(Menu)} />
                <Route path="/login" component={createComponent(Login)} />

                <Route path="/project_release" component={createComponent(ProjectRelease)} />
            </Switch>
        </div>
    </Router>
)

export default getRouter;