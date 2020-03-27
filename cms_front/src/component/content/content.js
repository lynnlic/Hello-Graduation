import React, { Component } from 'react';
import { Form, Input, Button, Table, Tag} from 'antd';
import Navigation from '../../container/navigation.js';
import {getAllData} from '../../action/contentAction.js';
require('../../common.less');
require('./content.less');

const onFinish = values =>{
    console.log('values',values);
}

const onFinishFailed=null;

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            msg:''
        }
    }

    componentDidMount(){
        getAllData().then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg
            })
        })
    }

    render(){
        const dataSource=this.state.data?this.state.data:[];
        console.log('dataSource',dataSource)
        const columns = [
            {
              title: '序号',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '标题',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: '存储路径',
              dataIndex: 'path',
              key: 'path',
            },
            {
              title: '对应标签',
              key: 'tag',
              dataIndex: 'tag',
            },
            {
                title: '所属站点',
                dataIndex: 'siteName',
                key: 'siteName',
            },
            {
                title: '所属系统',
                dataIndex: 'sysName',
                key: 'sysName',
            },
            {
              title: '创建时间',
              dataIndex: 'dataCreateTime',
              key: 'dataCreateTime',
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

        return(
            <div className="common_content_frame">
                <Navigation 
                    text='内容管理'
                />
                <div className="search_form_frame">
                    <Form
                        name="search_form"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="inline"
                    >
                        <Form.Item
                            label="内容标题"
                            name="contentTitle"                        
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="站点名"
                            name="siteName"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="系统名称"
                            name="sysName"
                        >
                            <Input />
                        </Form.Item>
                        
                            <Button type="primary" htmlType="submit" className="button_width">
                                搜  索
                            </Button>
                            <Button className="button_width button_add">
                                新  增
                            </Button>
                        
                    </Form>
                </div>
                <div className="table_frame">
                    <Table 
                        bordered 
                        columns={columns} 
                        dataSource={this.state.data?this.state.data:[]}
                    />  
                </div>
            </div>
        )
    }
}

export default Content;