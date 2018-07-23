import React, {Component} from 'react';
import {Breadcrumb} from 'antd';

export default class TopBread extends Component {
    generateList(){
        let list = this.props.info.map((item,index)=>{
            return  (<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
        })
        return list
    }
    render(){
        return(
            <Breadcrumb style={{ margin: '16px 0' }}>
                {this.generateList()}
            </Breadcrumb>
        )
    }
}