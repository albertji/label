import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doLogin,setUserName,setPassword} from "../../redux/actions/login";
import { Input, Icon, Button } from 'antd';
import './login.css';
import logosmall from '../../images/logosmall.png';



class Login extends Component {
    login(){
        this.props.startLogin(this.props.login_info.input_info.user,this.props.login_info.input_info.pwd)
    }
    onChangeUserName = (e) => {
        this.props.setUserName(e.target.value)
    }
    onChangePassword = (e) => {
        this.props.setPassword(e.target.value)
    }
    render() {
        return (
            <div className="content">
                <div className="top_banner">
                    <div className="top_img">
                        <img src={logosmall}style={{ height:"40px",width:"40px"}}></img>
                    </div>
                </div>
                <div className="login_block">
                    <div className="boxer">
                        <div style={{ fontSize: "38px",lineHeight: "50px",color:"#fff",position:"relative",top:"-40px"}}>数据标注平台</div>
                        <Input size="large" className="login_input"
                               placeholder="请输入用户名"
                               onChange={this.onChangeUserName}
                               defaultValue={this.props.login_info.input_info.user}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        />
                        <Input type="password" size="large" className="login_input"
                               placeholder="请输入密码"
                               defaultValue={this.props.login_info.input_info.pwd}
                               onChange={this.onChangePassword}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                        <div>
                            <Button onClick={() => this.login()}>登录</Button>
                        </div>
                    </div>
                </div>
             </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLogin:(user,pwd) => {
            dispatch(doLogin(user,pwd))
        },
        setUserName: user =>{
            dispatch(setUserName(user))
        },
        setPassword: pwd =>{
            dispatch(setPassword(pwd))
        }
    }
}
export default connect((state) => ({login_info: state.login_info}), mapDispatchToProps)(Login);
//export default connect((state) => ({login_info: state.login_info}), {doLogin,setUserName})(Login);