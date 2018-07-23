import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu,Dropdown, Icon} from 'antd';
import {connect} from 'react-redux';
import {getRouterList} from "../redux/actions/router_list";
import {getUserInfo} from "../redux/actions/user_info";
import {route_whitelist} from "./route_whitelist"

const { Header} = Layout;
const SubMenu = Menu.SubMenu

class TopMenu extends Component {
    getMenu(){
        let menu_data = []
        for(var key in this.props.router_list.list){
            if(route_whitelist[this.props.router_list.list[key].name]) {
                menu_data.push({
                    name: this.props.router_list.list[key].name,
                    router: this.props.router_list.list[key].route,
                    child: this.props.router_list.list[key].child

                })
            }
        }

/*        let menu_data = [
            {
                name: "数据管理",
                route: ""
            },
            {
                name: "用户权限管理",
                route: ""
            }
        ]*/
        let menu_render = menu_data.map((item,index)=>{
            let child = item.child
            let menu_list = item.child.map((menu_item,menu_index)=>{
                if(typeof(route_whitelist[item.name].data[menu_item.name]) != "undefined"){
                    var url = route_whitelist[item.name].data[menu_item.name].url
                    return (
                        <Menu.Item key={menu_index}><Link to={url} >{menu_item.name}</Link></Menu.Item>
                    )
                }
            })
            let menu = <Menu>{menu_list}</Menu>
            return (
                <Dropdown key={index} overlay={menu}>
                    <a className="ant-dropdown-link" href="#" style={{ padding:"20px",color:"#fff"}}>
                        {item.name}
                    </a>
                </Dropdown>
            )
        })
        menu_render.push(<Menu.Item key="logout" style={{float:"right",padding:"0px"}}><Link to="/login" style={{color:"#fff"}} >| 退出</Link></Menu.Item>)
        menu_render.push(<Menu.Item key="user_center" style={{float:"right",paddingRight:"5px"}}><Link to="/user_center"style={{color:"#fff"}} ><Icon style={{marginRight:"5px"}} type="user" />{this.props.user_info.name}</Link></Menu.Item>)
        menu_render.push(<Menu.Item key="help" style={{float:"right",paddingRight:"5px"}}><a href="/help.html">使用帮助</a></Menu.Item>)
        menu_render.push(<Menu.Item key="tool_try" style={{float:"right",paddingRight:"5px"}}><Link to="/tool_try" style={{color:"#fff"}}>工具试用</Link></Menu.Item>)
        return menu_render
    }
    componentDidMount() {
        if(!this.props.router_list.list){
            this.props.getRouterList()
        }
        this.props.getUserInfo()

    }
    render() {
        return (
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px',height: '64px'}}
                >
                    {this.getMenu()}
                </Menu>
            </Header>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRouterList:() => {
            dispatch(getRouterList())
        },
        getUserInfo:() => {
            dispatch(getUserInfo())
        }
    }
}
export default connect((state) => ({router_list: state.router_list,user_info: state.user_info}), mapDispatchToProps)(TopMenu);