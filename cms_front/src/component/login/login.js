import React, { Component } from 'react';
import { Form, Input, Button, Modal} from 'antd';
import {login} from '../../action/loginAction.js';
require('./login.less');

class Login extends Component {

    constructor (props) {
        super(props);
        this.state = {
          uesr:'',
          remember: false
        }
      }   
    
    onFinish = values =>{
        if(values.account){
            const promise = login(values);
            promise.then((res)=>{
                this.setState({
                    user: res.result
                })             
            }).then(()=> {
                console.log(this.state.user)
                const code = this.state.user.code;
                if(code === 0){//登陆成功
                    sessionStorage.setItem('user',JSON.stringify(this.state.user.data));
                    sessionStorage.setItem("isLogin", "1");
                    location.assign('/home');
                } else {
                    Modal.error({
                        title:"登录失败",
                        content:this.state.user.msg
                    })
                }
            })      
        }
    }

    render(){

        return (
            <div className="login-frame-bg-image">
            <div className="login-frame">
                

                <Form onFinish={this.onFinish.bind(this)}>
                <div className="login-text">用 户 登 录</div>
                            <Form.Item 
                                name='account' 
                                label='账号'                            
                                rules={ [{required: true, message: '请输入用户名!' },]} >                        
                                    <Input className="login-form-input" prefix={<img alt="账户图标" src={require('../../images/icon_user.png')}/>} placeholder="请输入用户名"/>
                            </Form.Item>
                            <Form.Item name='password' label='密码' rules={[{required:true, message:'请输入密码!'}]}>
                                <Input className="login-form-input" type='password' prefix={<img alt="密码图标" src={require('../../images/icon_user.png')}/>} placeholder="请输入密码"/>
                            </Form.Item>
                    <Form.Item>
                    <Button  htmlType="submit" type="primary" className="login-form-buttom">
                        登录
                    </Button>
                    </Form.Item>
                </Form>
            </div>
            </div>
        )
    }
}

export default Login;