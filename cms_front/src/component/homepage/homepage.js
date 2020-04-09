import React, { Component } from 'react';
import {Layout, Menu, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Routes from '../../router.js';
import {getAllSysName} from '../../action/homeAction';
require('./homepage.less');

const {Header,Sider,Content, Footer} =Layout;

class Home extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        getAllSysName().then((res)=>{
            localStorage.setItem('sysName',JSON.stringify(res.result.data))
        })
    }

    render(){
        return(
            <div className="home_frame">
                <Layout>
                    <Header>
                        <div className="head">
                            <PoweroffOutlined />
                        </div>
                    </Header>
                    <Layout className="home_below">
                        <Sider trigger={null} collapsible width='150'>                             
                            <Menu mode='inline'>     
                                <Menu.Item key='1'><Link to="/home/createPage">生成静态页</Link></Menu.Item>                          
                                <Menu.Item key='2'><Link to="/home/template">模板管理</Link></Menu.Item>
                                <Menu.Item key='3'><Link to="/home/sys">生成系统管理</Link></Menu.Item>
                                <Menu.Item key='4'><Link to="/home/site">站点管理</Link></Menu.Item>
                                <Menu.Item key='5'><Link to="/home/content">内容管理</Link></Menu.Item>
                                <Menu.Item key='6'><Link to="/home/page">生成页管理</Link></Menu.Item>                                
                                <Menu.Item key='7'><Link to="/home/user">用户管理</Link></Menu.Item>                                    
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
