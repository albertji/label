import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRouterList} from "../../redux/actions/router_list";
import "./home.css"

// import { Layout, Menu, Breadcrumb } from 'antd';
// const { Header, Content, Footer } = Layout;
//
// import Bundle from '../../router/Bundle';
// import MyMenu from 'bundle-loader?lazy&name=menu!../Menu/Menu';
// import {Router, Route, Switch, Link,Redirect} from 'react-router-dom';
//
// const createComponent = (component) => (props) => (
//     <Bundle load={component}>
//         {
//             (Component) => Component ? <Component {...props} /> : ""
//         }
//     </Bundle>
// );
class Home extends Component {
    render() {
        this.props.getRouterList()

/*        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {/!*<Switch>*!/}
                            {/!*<Route exact path="/menu" component={createComponent(MyMenu)} />*!/}
                        {/!*</Switch>*!/}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    数据标注平台 © 2018 Horizon Robotics
                </Footer>
            </Layout>
        )*/

        //const {router_list, is_loading, error_msg} = this.props.router_list;
        //console.log( this.props.router_list)
        return (
            <div>
                {JSON.stringify(this.props.router_list)}
                <button onClick={() => this.props.getRouterList()}>请求用户信息</button>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRouterList:() => {
            dispatch(getRouterList())
        }
    }
}
export default connect((state) => ({router_list: state.router_list}), mapDispatchToProps)(Home);