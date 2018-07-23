import React, {Component} from 'react';
import TopMenu from "../../../public/topmenu"
import TopBread from "../../../public/topbread"
// import "./home.css"
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;
export default class ProjectRelease extends Component {
    getBreadInfo(){
        return ["项目管理","已发布项目列表"]
    }
    render() {
        console.log("id:",this.props.location.search);
        return (
            <Layout className="layout">
                <TopMenu></TopMenu>
                <Content style={{ padding: '0 50px' }}>
                    <TopBread info={this.getBreadInfo()}></TopBread>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                       {/*{this.props.location.query.name}*/}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    数据标注平台 © 2018 Horizon Robotics
                </Footer>
            </Layout>
        )
    }
}