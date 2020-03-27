import React, { Component } from 'react';
import { Form, Input, Button, Table, Tag} from 'antd';
import Navigation from '../../container/navigation.js';
require('../../common.less');

const onFinish = values =>{
    console.log('values',values);
}

const onFinishFailed=null;

class Template extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    render(){

        const columns = [
            {
              title: '序号',
              dataIndex: 'templateId',
              key: 'templateId',
            },
            {
              title: '模板名称',
              dataIndex: 'templateName',
              key: 'templateName',
            },
            {
              title: '存放路径',
              dataIndex: 'templatePath',
              key: 'templatePath',
            },
            {
              title: '模板描述',
              key: 'describe',
              dataIndex: 'describe',
            },
            {
                title: '标签集合',
                key: 'templateTags',
                dataIndex: 'templateTags',
              },
              {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
              },
              {
                title: '模板状态',
                key: 'state',
                dataIndex: 'state',
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
                    text='模板管理'
                />
                    <Form
                        name="search_form"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="inline"
                        className="common_search_form_frame"
                    >                        
                        <Form.Item
                            label="模板名称"
                            name="templateName"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="模板状态"
                            name="state"
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
                    />  
                </div>
            </div>
        )
    }
}

export default Template;