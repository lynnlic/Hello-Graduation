import React, { Component } from 'react';
import { Form, Input, Button, Table} from 'antd';
import Navigation from '../../container/navigation.js';
import {getAllUser} from '../../action/userAction.js';
require('../../common.less');

const onFinish = values =>{
    console.log('values',values);
}

const onFinishFailed=null;

class User extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            current:1,
            pageSize:5,
            total:0
        }
    }

    componentDidMount(){
        getAllUser(this.state.current,this.state.pageSize).then((res)=>{
            console.log('this---',this)
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getAllUser(page,pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:page
            })
        });
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
                        onFinish={onFinish}
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
                            <Button className="common_button_width common_button_add">
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
            </div>
        )
    }
}

export default User;