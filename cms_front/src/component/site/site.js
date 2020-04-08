import React, { Component } from 'react';
import { Form, Input, Button, Table} from 'antd';
import Navigation from '../../container/navigation.js';
import {getAllSite} from '../../action/siteAction.js';
require('../../common.less');

const onFinish = values =>{
    console.log('values',values);
}

const onFinishFailed=null;

class Site extends Component{
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
        getAllSite(this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getAllSite(page,pageSize).then((res)=>{
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
              dataIndex: 'siteId',
              key: 'siteId',
            },
            {
              title: '站点名',
              dataIndex: 'siteName',
              key: 'siteName',
            },
            {
              title: '所属系统',
              dataIndex: 'sysName',
              key: 'sysName',
            },
            {
              title: '站点描述',
              key: 'siteDescribe',
              dataIndex: 'siteDescribe',
            },
            {
                title: '创建时间',
                key: 'siteCreateTime',
                dataIndex: 'siteCreateTime',
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
            pageSize: this.state.pageSize,
        }

        return(
            <div className="common_content_frame">
                <Navigation 
                    text='站点管理'
                />
                    <Form
                        name="search_form"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="inline"
                        className="common_search_form_frame"
                    >                        
                        <Form.Item
                            label="系统名"
                            name="sysName"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="站点名"
                            name="siteName"
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

export default Site;