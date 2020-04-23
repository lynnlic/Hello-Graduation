import React, { Component } from 'react';
import {Select, Form, Input, Button, Table, message} from 'antd';
import Navigation from '../../container/navigation.js';
import {addSite, getSiteByCondition} from '../../action/siteAction.js';
import AddSiteModal from './addSiteModal.js';
require('../../common.less');

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const onFinishFailed=null;

class Site extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            current:1,
            pageSize:5,
            total:0,
            addVisible:false,
            key:0,
            searchSysId:undefined,
            searchName:undefined
        }
    }

    componentDidMount(){
        getSiteByCondition(undefined,undefined,this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getSiteByCondition(this.state.searchSysId,this.state.searchName,page,pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:page
            })
        });
    }

    /**设置新增站点弹框是否可见 */
    setVisible(){
        this.setState({
            addVisible:!this.state.addVisible,
            key:this.state.key+1
        })
    }

    handleAddVlaue(values){
        addSite(values).then((res)=>{
            if(res.result.code==201){
                message.success(res.result.msg);
            } else {
                message.error(res.result.msg);
            } 
        }).then(
            getSiteByCondition(undefined,undefined,1,this.state.pageSize).then((res)=>{
                console.log(res);
                this.setState({
                    data:res.result.data,
                    msg:res.result.msg,
                    code:res.result.code,
                    total:res.result.total,
                    current:1
                })
            })
        );
        this.setVisible();

    }

    onFinish = values =>{
        console.log('values',values);
        getSiteByCondition(values.sysId,values.siteName).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:1,
                searchSysId:values.sysId,
                searchName:values.siteName
            })
        })
    }

    render(){
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
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
              title: '路径名',
              dataIndex: 'siteUrl',
              key: 'siteUrl',
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
                            label="站点名"
                            name="siteName"
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
                <AddSiteModal 
                    setVisible={this.setVisible.bind(this)}
                    visible={this.state.addVisible}
                    handleAddVlaue={this.handleAddVlaue.bind(this)}
                    key={this.state.key}
                />
            </div>
        )
    }
}

export default Site;