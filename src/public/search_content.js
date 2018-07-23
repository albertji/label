import React, {Component} from 'react';
import {Row, Col,Input,Select} from 'antd';
import "./css/main.css"
const Option = Select.Option;
export default class SearchContent extends Component {
    changeInputContent= (event,key,seq) =>{
        this.props.updateSearchVal(key,event.target.value,seq)
    }
    changeSelectContent = (val,key,seq) => {
        this.props.updateSearchVal(key,val,seq)
    }
    getItemContent = () => {
        let items = this.props.items
        let content
        let cols = this.props.items.map((item,index)=>{
            if(item.type == "input"){
                content = <Input value={item.value} key={index} ckey={item.key} onChange={(event)=>{this.changeInputContent(event,item.key,index)}}/>
            }
            else if(item.type == "select"){
                let options = ""
                let default_val = ""
                let default_option = item.default? "":<Option value="" key="default" style={{height:"30px"}}></Option>
                if(item.option_list.length>0) {
                    options = item.option_list.map((option, option_index) => {
                        return (
                            <Option value={option.key} key={option_index}>{option.text}</Option>
                        )
                    })
                    default_val = item.default? item.option_list[0].key:""
                    content = (
                        <Select value={item.value} key={index} defaultValue={default_val} style={{width:"100%"}} onChange={(value)=>{this.changeSelectContent(value,item.key,index)}}>
                            {default_option}
                            {options}
                        </Select>
                    )
                }
                else{
                    content = ""
                }
            }
            return(
                <Col span={12} key={index}>
                    <Row type="flex" align="middle">
                        <Col span={4} className="col_content">{item.name}</Col>
                        <Col span={19} className="col_content">
                            {content}
                        </Col>
                    </Row>
                </Col>
            )
        })
        return (
            <Row>
                {cols}
            </Row>
        )
    }
    render() {
        return (
            <Col span={this.props.size} style={{ background: '#fff', padding: 10,marginBottom: "10px",borderRadius: "5px", minHeight: "50px" }}>
                {this.getItemContent()}
            </Col>
        )
    }
}