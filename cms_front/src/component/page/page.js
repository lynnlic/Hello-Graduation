import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Input, Button, Table, Select, message} from 'antd';
import Navigation from '../../container/navigation.js';
import {getAllPage,getPagesByCondition,deletePage} from '../../action/pageAction.js'
require('../../common.less');
require('./page.less');

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const onFinishFailed=null;

class Page extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            current:1,
            pageSize:5,
            total:0,
            searchPageName:undefined,
            searchSysId:undefined
        }
    }

    componentDidMount(){
        getAllPage(this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getAllPage(page,pageSize).then((res)=>{
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
        getPagesByCondition(values.name,values.sysId).then((res)=>{
            console.log(res);
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total==0?1:res.result.total,
                current:1,
                searchPageName:values.name,
                searchSysId:values.sysId
            })
        })
    }

    addPage(){ 
        document.getElementsByClassName("ant-menu-item")[6].classList.add("ant-menu-item-selected");
        document.getElementsByClassName("ant-menu-item")[0].classList.add("ant-menu-item-selected");
        document.getElementsByClassName("ant-menu-item")[5].classList.remove("ant-menu-item-selected");
    }

    loadLoaclFile(pagePath){
        console.log('..',pagePath)

    }

    deletePage(pageId,pagePath){
        deletePage(pageId,pagePath).then((res)=>{
            if(res.result.code==204){
                message.success(res.result.msg);
            } else {
                message.error(res.result.msg)
            }
        }).then(
            getPagesByCondition(this.state.searchPageName,this.state.searchSysId).then((res)=>{
                this.setState({
                    data:res.result.data,
                    msg:res.result.msg,
                    code:res.result.code,
                    total:res.result.total==0?1:res.result.total,
                    current:1
                })
            })
        )
    }

    render(){
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
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
                dataIndex: 'fileName',
                key: 'fileName',
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
                  <a onClick={this.deletePage.bind(this,record.pageId,record.pagePath)}>删除页面 </a>
                  <a  onClick={this.loadLoaclFile.bind(this,record.pageId,record.pagePath)}>查看模板</a>
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
                    text='生成页管理'
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
                            label="页面名称"
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="所属系统"
                            name="sysId"
                        >
                            <Select allowClear="true">
                                {sysInfo.map((item, index)=>{
                                    return <Select.Option value={item.sysId} key={item.sysSaveName}>{item.sysName}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>                    
                        <Button type="primary" htmlType="submit" className="common_button_width">
                            搜  索
                        </Button>
                        <Link to='/home/createPage'>
                            <Button style={{width: '100%'}} className="common_button_width common_button_add" onClick={this.addPage.bind(this)}>
                                新  增
                            </Button> 
                        </Link>                       
                    </Form>
                <div className="common_table_frame">
                    <Table 
                        bordered 
                        columns={columns} 
                        dataSource={this.state.data?this.state.data:[]}
                        pagination={pagination}
                        id="page_table"
                    />  
                </div>
            </div>
        )
    }
}

export default Page;