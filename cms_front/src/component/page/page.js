import React, { Component } from 'react';
import { Form, Input, Button, Table, Tag} from 'antd';
import Navigation from '../../container/navigation.js';
require('../../common.less');

const onFinish = values =>{
    console.log('values',values);
}

const onFinishFailed=null;

class Page extends Component{
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
              dataIndex: 'pageId',
              key: 'pageId',
            },
            {
              title: '页面名称',
              dataIndex: 'pageName',
              key: 'pageName',
            },
            {
                title: '访问路径',
                dataIndex: 'url',
                key: 'url',
              },
            {
              title: '存储路径',
              dataIndex: 'pagePath',
              key: 'pagePath',
            },
            {
              title: '所属站点',
              key: 'siteName',
              dataIndex: 'siteName',
            },
            {
                title: '所属系统',
                key: 'sysName',
                dataIndex: 'sysName',
              },
              {
                title: '所用模板',
                key: 'templateName',
                dataIndex: 'templateName',
              },
              {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
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
                    text='生成页管理'
                />
                    <Form
                        name="search_form"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="inline"
                        className="common_search_form_frame"
                    >                        
                        <Form.Item
                            label="页面名称"
                            name="templateName"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="所属系统"
                            name="state"
                        >
                            <Input />
                        </Form.Item>       
                        <Form.Item
                            label="所用模板"
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

export default Page;