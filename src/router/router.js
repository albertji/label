import React from 'react';
import {Router, Route, Switch, Link,Redirect} from 'react-router-dom';
import Bundle from './Bundle';
import Login from 'bundle-loader?lazy&name=login!../pages/Login/Login';
// import Menu from 'bundle-loader?lazy&name=menu!../pages/Menu/Menu';
import Home from 'bundle-loader?lazy&name=home!../pages/Home/Home';

import history from '../public/history';

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
const getRouter = () => (
    <Router history={history}>
        <div className="portal">
            <Switch>
                <Route exact path="/home" component={createComponent(Home)} />
                {/*<Route path="/menu" component={createComponent(Menu)} />*/}
                <Route path="/" component={createComponent(Login)} />
            </Switch>
        </div>
    </Router>
)

export default getRouter;