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

    handleSubmit(values){
        if(values.account){
            const promise = login(values);
            promise.then((res)=>{
                this.setState({
                    user: res.result
                })
                localStorage.setItem('user', res.result);               
            }).then(()=> {
                console.log(this.state.user)
                const code = this.state.user.code;
                if(code === 0){//登陆成功
                    location.assign('/home');
                } else {
                    Modal.error({
                        title:"登录失败",
                        content:this.state.user.msg
                    })
                }
                //if(this.state.user.)
            })      
            
        }
    }

    render(){
        const onFinish = values =>{
            if(this.handleSubmit){
                this.handleSubmit(values);
            }else {//handleSubmit函数还不存在，因为会渲染两次
                console.log('oo');
            }
        }

        return (
            <div className="  login-frame-bg-image">
            <div className="login-frame">
                

                <Form onFinish={onFinish}>
                <div className="login-text">用 户 登 录</div>
                            <Form.Item 
                                name='account' 
                                label='账号'                            
                                rules={ [{required: true, message: '请输入用户名!' },]} >                        
                                    <Input className="login-form-input" prefix={<img src={require('../../images/icon_user.png')}/>} placeholder="请输入用户名"/>
                            </Form.Item>
                            <Form.Item name='password' label='密码' rules={[{required:true, message:'请输入密码!'}]}>
                                <Input className="login-form-input" type='password' prefix={<img src={require('../../images/icon_user.png')}/>} placeholder="请输入密码"/>
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