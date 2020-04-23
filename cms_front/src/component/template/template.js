import React, { Component } from 'react';
import { Form, Input, Button, Table, Select} from 'antd';
import Navigation from '../../container/navigation.js';
import {getAllTemplate,getTemplateByCondition} from '../../action/templateAction.js';
import AddTemplateModal from './addTemplateModal.js';
require('../../common.less');

const onFinishFailed=null;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class Template extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            current:1,
            pageSize:4,
            total:0,
            addVisible:false,
            searchSysId:undefined,
            searchTemplateName:undefined,
            searchState:undefined
        }
    }

    componentDidMount(){
        getTemplateByCondition(undefined,undefined,undefined,this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getTemplateByCondition(this.state.searchSysId,this.state.searchTemplateName,this.state.searchState,page,pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:page
            })
        });
    }

    onFinish = values =>{
        console.log('values',values);
        getTemplateByCondition(values.sysId,values.templateName,values.state,1,this.state.pageSize).then((res)=>{
            console.log('res',res)
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:1,
                searchSysId:values.sysId,
                searchTemplateName:values.templateName,
                searchState:values.state
            })
        });
    }

    setVisible(){
        this.setState({
            addVisible:!this.state.addVisible,
            key:this.state.key+1
        })
    }

    handleAddValue(values){
        //this.setVisible();
        console.log('...',values);
    }

    render(){
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
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
                title: '所属系统',
                dataIndex: 'sysName',
                key: 'sysName',
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
                render:(text,record)=>{
                    if(record.state==0){
                        return (
                            <span>启用</span>
                        )
                    } else {
                        return (
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
            pageSize: this.state.pageSize,
        }

        return(
            <div className="common_content_frame">
                <Navigation 
                    text='模板管理'
                />
                    <Form
                        {...layout}
                        name="search_form"
                        onFinish={this.onFinish.bind(this)}
                        onFinishFailed={onFinishFailed}
                        layout="inline"
                        className="common_search_form_frame"
                    >     
                        <Form.Item
                            label="系统名"
                            name="sysId"
                        >
                            <Select allowClear="true">
                                {sysInfo.map((item, index)=>{
                                    return <Select.Option value={item.sysId} key={item.sysSaveName}>{item.sysName}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>                   
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
                            <Select allowClear="true">
                                <Select.Option value='0' key='0'>启用</Select.Option>
                                <Select.Option value='1' key='1'>禁用</Select.Option>
                            </Select>
                        </Form.Item>                        
                            <Button type="primary" htmlType="submit" className="common_button_width">
                                搜  索
                            </Button>
                            <Button className="common_button_width common_button_add" onClick={this.handleAddValue.bind(this)}>
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
                <AddTemplateModal 
                    setVisible={this.setVisible.bind(this)}
                    visible={this.state.addVisible}
                    handleAddValue={this.handleAddValue.bind(this)}
                    key={this.state.key}
                />
            </div>
        )
    }
}

export default Template;