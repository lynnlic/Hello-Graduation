import React, { Component } from 'react';
import {Layout, Menu, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Routes from '../../router.js';
import {getSysNameByUserState} from '../../action/homeAction';
require('./homepage.less');

const {Header,Sider,Content, Footer} =Layout;

class Home extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        var cid=JSON.parse(sessionStorage.getItem('user')).id;
        getSysNameByUserState(cid).then((res)=>{
            sessionStorage.setItem('sysName',JSON.stringify(res.result.data))
        })
    }
    
    quit(){
        location.replace('/');
        sessionStorage.clear();
    }

    render(){
        const userInfo=JSON.parse(sessionStorage.getItem("user"));
        return(
            <div className="home_frame">
                <Layout>
                    <Header>
                        <div className="head">
                            <div className="head_title">
                                <span className="head_title_chinese">网站内容管理系统</span>
                                <span className="head_title_english">Content Management System</span>
                            </div>
                            <div className="head_userInfo">
                                <span>Hi,{userInfo.name}</span>
                                <PoweroffOutlined className="head_userInfo_icon" onClick={this.quit.bind(this)}/>
                            </div>
                        </div>
                    </Header>
                    <Layout className="home_below">
                        <Sider trigger={null} collapsible width='150'>                             
                            <Menu mode='inline'>    
                                <Menu.Item key='1' className='home_createPage'><Link to="/home/createPage">生成静态页</Link></Menu.Item>                
                                {userInfo.state!=3?
                                    //为超级管理员、某系统管理员
                                    <Menu.Item key='3'><Link to="/home/sys">生成系统管理</Link></Menu.Item>:
                                    //某系统的普通用户
                                    null
                                }
                                <Menu.Item key='2'><Link to="/home/template">模板管理</Link></Menu.Item>
                                <Menu.Item key='4'><Link to="/home/site">站点管理</Link></Menu.Item>
                                <Menu.Item key='5'><Link to="/home/content">内容管理</Link></Menu.Item>
                                <Menu.SubMenu key='6' title='生成页管理'>
                                    <Menu.Item key='7'><Link to="/home/page">生成页信息</Link></Menu.Item> 
                                    <Menu.Item key='1'><Link to="/home/createPage">生成静态页</Link></Menu.Item>
                                </Menu.SubMenu> 
                                {userInfo.state!=3?
                                    //为超级管理员、某系统管理员
                                    <Menu.Item key='8'><Link to="/home/user">用户管理</Link></Menu.Item>:
                                    //某系统的普通用户
                                    null
                                }                                                         
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className="home_content" >{Routes}</div>                                
                            </Content>
                        </Layout>
                    </Layout> 
                    <Footer style={{ textAlign: 'center',height:0,paddingTop:0 }}>CMS ©2020 Created by lynnlic</Footer>   
                </Layout>
            </div>
        )
    }
}

export default Home;
