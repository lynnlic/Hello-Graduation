import React, { Component } from 'react';
import { Form, Input, Button, Table, message} from 'antd';
import Navigation from '../../container/navigation.js';
import {addUser, getUserByCondition} from '../../action/userAction.js';
import AddUserModal from './addUserModal.js';
require('../../common.less');

const onFinishFailed=null;

class User extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            current:1,
            pageSize:5,
            total:0,
            addVisible:false,
            key:0,
            searchAccount:undefined,
            searchName:undefined,
            parentId:JSON.parse(sessionStorage.getItem('user')).parent
        }
    }

    componentDidMount(){
        getUserByCondition(undefined,undefined,this.state.parentId,this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total==0?1:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getUserByCondition(this.state.searchAccount,this.state.searchName,this.state.parentId,page,pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total==0?1:res.result.total,
                current:page
            })
        });
    }

    setVisible(){
        this.setState({
            addVisible:!this.state.addVisible,
            key:this.state.key+1
        })
    }

    handleAddVlaue(values){
        var addValues=Object.assign(values, {parentId:this.state.parentId});
        addUser(addValues).then((res)=>{
            if(res.result.code==201){
                message.success(res.result.msg);
            } else {
                message.error(res.result.msg);
            }            
        }).then(
            getUserByCondition(this.state.searchAccount,this.state.searchName,this.state.parentId,1,this.state.pageSize).then((res)=>{
                this.setState({
                    data:res.result.data,
                    msg:res.result.msg,
                    code:res.result.code,
                    total:res.result.total==0?1:res.result.total,
                    current:1
                })
            })
        )       
        this.setVisible();
    }

    onFinish = values =>{
        getUserByCondition(values.account,values.name,this.state.parentId,1,this.state.pageSize).then((res)=>{
            console.log(res);
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total==0?1:res.result.total,
                current:1,
                searchAccount:values.account,
                searchName:values.name
            })
        })
    }

    render(){
        const columns = [
            {
              title: '序号',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '用户姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '用户账户',
              dataIndex: 'account',
              key: 'account',
            },
            {
              title: '用户状态',
              key: 'state',
              dataIndex: 'state',
              render:(text,record)=>{
                  if(record.state===1){
                    return(
                        <span>启用</span>
                    )
                  } else {
                    return(
                        <span>禁用</span>
                    )
                  }                  
              }
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                  <a style={{ marginRight: 16 }}>编辑 {record.name}</a>
                  <a>Delete</a>
                </span>
              ),
            },
          ];
          const pagination={
              simple: true,
              total: this.state.total,
              size:'small',
              onChange: this.onChangePage,
              current: this.state.current,
              pageSize: this.state.pageSize
          }

        return(
            <div className="common_content_frame">
                <Navigation 
                    text='用户管理'
                />
                    <Form
                        name="search_form"
                        onFinish={this.onFinish.bind(this)}
                        onFinishFailed={onFinishFailed}
                        layout="inline"
                        className="common_search_form_frame"
                    >                        
                        <Form.Item
                            label="用户账号"
                            name="account"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="用户姓名"
                            name="name"
                        >
                            <Input />
                        </Form.Item>                        
                            <Button type="primary" htmlType="submit" className="common_button_width">
                                搜  索
                            </Button>
                            <Button className="common_button_width common_button_add" onClick={this.setVisible.bind(this)}>
                                新  增
                            </Button>                        
                    </Form>
                <div className="common_table_frame">
                    <Table 
                        bordered 
                        columns={columns} 
                        dataSource={this.state.data?this.state.data:[]}
                        pagination={pagination}
                    />                      
                </div>
                <AddUserModal 
                    setVisible={this.setVisible.bind(this)}
                    visible={this.state.addVisible}
                    handleAddVlaue={this.handleAddVlaue.bind(this)}
                    key={this.state.key}
                />
            </div>
        )
    }
}

export default User;