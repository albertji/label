import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TopMenu from "../../public/topmenu"
import TopBread from "../../public/topbread"
import "../../public/css/main.css"
import { Layout, Row, Col,Button,Table,Popover,Tabs,Popconfirm,Badge,message} from 'antd';
import SearchContent from "../../public/search_content";
import {getFirmInfo,updateSearchVal,clearSearch,setTableLoading,getTableData} from "../../redux/actions/Home/action_home"
import {interfaces} from "../../public/interfaces";
import {connect} from "react-redux";
import axios from 'axios';
import qs from 'qs'

const { Header, Content, Footer } = Layout;
const TabPane = Tabs.TabPane;
const status_list = {
    0:  '待处理',
    1:  '已接受',
    2:  '已拒绝'
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            bread_info: ["项目管理", "待处理项目列表"],
            search_list: [
                {
                    name: "业务项目组",
                    key: "firm",
                    type: "select",
                    option_list: formatFirmOptionsData(props.firm_list),
                    default: false,
                    value: ""
                },
                {
                    name: "状态",
                    key: "status",
                    type: "select",
                    option_list:[
                        {key:0,text:"待处理"},{key:1,text:"已接受"},{key:2,text:"已拒绝"}
                    ],
                    default: false,
                    value: ""
                },
                {
                    name: "项目ID",
                    key: "id",
                    type: "input",
                    value: ""
                },
                {
                    name: "项目名称",
                    key: "name",
                    type: "input",
                    value: ""
                }
            ],
            category: 0,
            pagination:{
                current: 1,
                total: 0
            },
            columns :[{
                title: '项目ID',
                dataIndex: 'id',
                render: (id,record) =>{
                    if(record.manage){
                        return <Link to="/program_detail">{id}</Link>
                    }
                    else{
                        return id
                    }
                }
            }, {
                title: '项目名称',
                dataIndex: 'name'
            }, {
                title: '数据量',
                dataIndex: 'data_num',
                render: data_num => data_num || ''
            },{
                title: '待标注/标注中/待验收/已完成',
                dataIndex: 'data_dist',
                width: "10%",
                render: data_dist => {
                    if(data_dist){
                        return data_dist.wait+'/'+data_dist.ongoing+'/'+(data_dist.accepting || '0')+'/'+(data_dist.done || '0')
                    }
                    else{
                        return ''
                    }
                }
            },{
                title: '业务项目组',
                dataIndex: 'firm',
                render: firm => firm.name
            },{
                title: '标注属性',
                dataIndex: 'attr',
                width: '20%',
                render: attr => {
                    var show_text = (attr && attr.length) > 30? attr.substring(0,30)+"..." : attr
                    return(<Popover overlayStyle={{maxWidth: "500px"}} placement="left" content={attr} trigger="click">
                        {show_text}
                    </Popover>)
                }
            },{
                title: '项目描述',
                dataIndex: 'comment',
                width: "10%"
            }, {
                title: '状态',
                dataIndex: 'status',
                render: status => status_list[status]
            }, {
                title: '操作',
                key: 'action',
                render: (record) => {
                    let operations = ""
                    operations = this.getOperation(record)
                    return operations
                }
            }]
        }
    }
    componentDidMount() {
        this.props.getFirmInfo()
        this.props.getTableData({
            offset: 0,
            category: this.state.category
        })
    }
    componentWillReceiveProps(nextProps){
        this.resetFirmList(nextProps)
        if(!nextProps.slave_data.loading){
            this.resetPagination(nextProps)
        }
    }
    updateSearchVal = (key,val,seq) => {
        this.props.updateSearchVal(key,val)

        let data = Object.assign({},this.state);
        if(data.search_list[seq].type == "input" || data.search_list[seq].type == "select" ){
            data.search_list[seq].value = val
        }
        this.setState(data);
    }
    clearSearch = () =>{
        this.props.clearSearch()
        let data = Object.assign({},this.state);
        for(let i=0;i<data.search_list.length;i++){
            if(data.search_list[i].type == "input"){
                data.search_list[i].value = ""
            }
            else if(data.search_list[i].type == "select"){
                data.search_list[i].value = ""
            }
        }
        this.setState(data);

        this.props.getTableData({
            offset: 0,
            category: this.state.category
        })
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
    }
    searchData = () =>{
        var param = {
            offset: 0,
            category: this.state.category
        }
        for(var key in this.props.search_items){
            param[key] = this.props.search_items[key]
        }
        this.props.getTableData(param)
        const pager = this.state.pagination;
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
    }
    handleTableChange = (pagination) => {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

        var param = {
            offset: pager.current-1,
            category: this.state.category
        }
        for(var key in this.props.search_items){
            param[key] = this.props.search_items[key]
        }
        this.props.getTableData(param)
    }
    resetFirmList = (nextProps)=>{
        let data = Object.assign({},this.state);
        data.search_list[0].option_list = formatFirmOptionsData(nextProps.firm_list)
        this.setState(data);
    }
    resetPagination = (nextProps)=>{
        const pager = this.state.pagination;
        pager.pageSize = pager.pageSize ? pager.pageSize : nextProps.slave_data.data.detail.length
        pager.total = nextProps.slave_data.data? parseInt(nextProps.slave_data.data.page.res_num): 0;
        pager.showQuickJumper = true
        this.setState({
            pagination: pager,
        });
    }
    getOperation = (record)=> {
        let {config,id,action,status,point} = record
        let content = []
        if(status == 0){
            content.push(<Link to={`/program_release_label?acc=1&id=${id}`} key="accept" className="operation">接受</Link>)
            content.push(
                <Popconfirm key={id} title="确定拒绝吗？" onConfirm={()=>{this.doRefuce(id)}} onCancel={()=>{return false}} okText="确定" cancelText="取消">
                    <a href="javascript:;" key={"refuse"+id} className="operation">拒绝</a>
                </Popconfirm>);
        }
        if (!config) return content
        if(config['mode']==0){//自动模式
            for(let i in action) {
                //console.log(action[i])
                if(parseInt(action[i]['proc']) != 99){
                    if (action[i]['type'] == '1') {
                        content.push(<a key={"m_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${action[i]['proc']}&type=2&mode=1&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{ action[i]['name']}</a>)
                    }
                    else if (action[i]['type'] == '2') {
                        content.push(<a key={"n_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${action[i]['proc']}&type=2&mode=1&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{'顺序' + action[i]['name']}</a>)
                        content.push(<a key={"t_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${action[i]['proc']}&type=2&mode=2&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{'随机' + action[i]['name']}</a>)
                    }
                }
                else{//验收
                    let point_show = point? true : false
                    if(config['accept_config'] && config['accept_config']['mode'] == '0'){//验收自动
                        content.push(<Badge key={"badge_m_"+i} dot={point_show}><a key={"procm_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${[i]['proc']}&type=1&mode=1&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{'顺序' + action[i]['name']}</a></Badge>)
                        content.push(<Badge key={"badge_n_"+i} dot={point_show}><a key={"procn_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${action[i]['proc']}&type=1&mode=2&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{'随机' + action[i]['name']}</a></Badge>)
                    }
                    else{//验收手动
                        content.push(<Badge key={"badge_t_"+i} dot={point_show}><a key={"proct_"+i} className="operation" href={`program_check_list.html?project=${id}&seq=${action[i]['proc']}&type=1&itype=false&tool_name=${escape(action[i]['name'])}`}>{action[i]['name']}</a></Badge>)
                    }
                }
            }
        }
        else{
            for(let i in action) {
                if (action[i]['type'] == '1') {//这里的type区分了是标注还是别的什么，比如检查 1标注 2非标注
                    content.push(<a key={"procs_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${action[i]['proc']}&type=2&mode=1&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{action[i]['name']}</a>)
                }
                else if (action[i]['type']=='2'){
                    if(parseInt(action[i]['proc']) == 99){//验收
                        let point_show = point? true : false
                        if(config['accept_config'] && config['accept_config']['mode'] == '0'){
                            content.push(<Badge key={"badge_m_"+i} dot={point_show}><a key={"procs_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${action[i]['proc']}&type=1&mode=1&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{'顺序' + action[i]['name']}</a></Badge>)
                            content.push(<Badge key={"badge_n_"+i} dot={point_show}><a key={"proct_"+i} className="operation" href={`/web/tools/point/index.html?project=${id}&seq=${action[i]['proc']}&type=1&mode=2&tool_type=label&tool_name=${escape(action[i]['name'])}`}>{'随机' + action[i]['name']}</a></Badge>)
                        }
                        else{
                            content.push(<Badge key={"badge_m_"+i} dot={point_show}><a key={"procs_"+i} className="operation" href={`program_check_list.html?project=${id}&seq=${action[i]['proc']}&type=1&itype=false&tool_name=${escape(action[i]['name'])}`}>{action[i]['name']}</a></Badge>)
                        }
                    }else{
                        content.push(<a key={"procx_"+i} className="operation" href={`program_check_list.html?project=${id}&seq=${action[i]['proc']}&itype=false&tool_name=${escape(action[i]['name'])}`}>{action[i]['name']}</a>)
                    }
                }
            }
        }
        return content
    }
    doRefuce = (project_id)=>{
        axios.post(interfaces.url_slaveedit,qs.stringify({
            project: project_id,
            status: 2
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => {
            let result = res.data
            if(result.error == 0){
                setTimeout(() =>{
                    message.success("操作成功");
                    this.searchData()
                },4000)
            }
            else{
                message.error("操作失败，错误码为："+result.error);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    switchTab = (key)=>{
        this.setState({
            category: parseInt(key)-1,
        },this.searchData);
    }
    render() {
        return (
            <Layout className="layout">
                <TopMenu></TopMenu>
                <Content style={{ padding: '0 50px' }}>
                    <TopBread info={this.state.bread_info}></TopBread>
                    <Row>
                        <SearchContent size={21} items={this.state.search_list} updateSearchVal={(key,val,seq)=>{this.updateSearchVal(key,val,seq)}}></SearchContent>
                        <Col span={3}>
                            <div style={{margin:"auto",width:"100px"}}>
                                <Button style={{minWidth: "120px",marginBottom: "10px" }} onClick={()=>this.clearSearch()}>清空检索式</Button>
                                <Button type="primary" style={{minWidth: "120px",marginBottom: "10px" }} onClick={()=>this.searchData()}>搜索</Button>
                            </div>
                        </Col>
                    </Row>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Tabs defaultActiveKey="1" onChange={(key)=>{this.switchTab(key)}}>
                            <TabPane tab="正式项目列表" key="1"></TabPane>
                            <TabPane tab="测试项目列表" key="2"></TabPane>
                        </Tabs>
                        <Table
                            columns={this.state.columns}
                            rowKey={(record,index)=> index}
                            dataSource={this.props.slave_data.data? this.props.slave_data.data.detail:[]}
                            pagination={this.state.pagination}
                            loading={this.props.slave_data.loading}
                            onChange={this.handleTableChange}
                        />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    数据标注平台 © 2018 Horizon Robotics
                </Footer>
            </Layout>
        )
    }
}
const formatFirmOptionsData = (list)=> {
    return list.map((item)=>{
        return {
            key: item.id,
            text: item.name
        }
    })
}


const mapStatetoProps = (state) => {
    return {
        firm_list: state.reducer_home.firm_list,
        search_items: state.reducer_home.search_items,
        slave_data: state.reducer_home.slave_data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getFirmInfo:() => {
            dispatch(getFirmInfo())
        },
        updateSearchVal:(key,val) => {
            dispatch(updateSearchVal(key,val))
        },
        clearSearch:()=>{
            dispatch(clearSearch())
        },
        getTableData:(data)=>{
            dispatch(setTableLoading())
            dispatch(getTableData(data))
        }
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Home);