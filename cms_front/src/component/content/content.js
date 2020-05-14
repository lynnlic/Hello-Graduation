import React, { Component } from 'react';
import { Form, Input, Button, Table,Select,message} from 'antd';
import Navigation from '../../container/navigation.js';
import {getDataByCondition,loadLocalContent,addContent} from '../../action/contentAction.js';
import FileViewModal from '../../util/fileViewModal.js';
import AddContentModal from './addContentModal.js';
require('../../common.less');
require('./content.less');

const onFinishFailed=null;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            msg:'',
            current:1,
            pageSize:8,
            total:0,
            fileVisible:false,
            key:0,
            img:undefined,
            addVisible:false,
            parentId:JSON.parse(sessionStorage.getItem('user')).parent
        }
    }

    componentDidMount(){
        getDataByCondition(undefined,undefined,undefined,this.state.parentId,this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getDataByCondition(this.state.searchTitle,this.state.searchSite,this.state.searchSysId,this.state.parentId,page,pageSize).then((res)=>{
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
        getDataByCondition(values.contentTitle,values.siteName,values.sysId,this.state.parentId).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:1,
                searchTitle:values.contentTitle,
                searchSite:values.siteName,
                searchSysId:values.sysId
            })
        })
    }

    setFileVisible(){
        this.setState({
            fileVisible:!this.state.fileVisible,
            fileContentKey: this.state.key+1
        })
    }

    setAddVisible(){
        this.setState({
            addVisible:!this.state.addVisible,
            fileContentKey: this.state.key+1
        })
    }

    loadLoaclFile(path,type){
        if(type!=='txt'){
            this.setState({
                img:path,
                fileVisible:true,
                type:type
            })
        } else {
            loadLocalContent(path,type).then((res)=>{
                if(res.result.code==203){
                    message.error(res.result.msg)
                } else if(res.result.code==200){
                    if(type==='txt'){
                        this.setState({
                            fileVisible:true,
                            fileData:res.result.data,
                            type:type
                        })
                    } 
                }
            })
        }  
    }

    handleAddVlaue(values,path){
        console.log('values',values,'---path',path);
        var userId=JSON.parse(sessionStorage.getItem("user")).data.id;
        addContent(values,path,userId).then((res)=>{
            console.log('----',res);
            if(res.result.code===201){
                message.success(res.result.msg);
            } else {
                message.error(res.result.msg);
            }
        }).then(()=>{
            this.setAddVisible();
            getDataByCondition(this.state.searchTitle,this.state.searchSite,this.state.searchSysId,this.state.parentId,1,this.state.pageSize).then((res)=>{
                this.setState({
                    data:res.result.data,
                    msg:res.result.msg,
                    code:res.result.code,
                    total:res.result.total,
                    current:1
                })
            })
        });
    }

    render(){
        const sysInfo=JSON.parse(sessionStorage.getItem('sysName'));
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
              title: '文件类型',
              dataIndex: 'path',
              key: 'path',
              render:(text,record)=>{
                  console.log('text',record);
                  var index=text.lastIndexOf('.');
                  var result=text.substring(index+1,text.length);
                  Object.assign(record,{'type':result});
                  return result;
              }
            },
            {
                title: '内容描述',
                key: 'describe',
                dataIndex: 'describe',
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
                  <a>删除 </a>
                  <a onClick={this.loadLoaclFile.bind(this,record.path,record.type)}>查看内容</a>
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
                    text='内容管理'
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
                            <Button className="common_button_width common_button_add" onClick={this.setAddVisible.bind(this)}>
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
                <FileViewModal 
                    fileVisible={this.state.fileVisible}
                    title='内容浏览'
                    fileData={this.state.fileData}
                    setFileVisible={this.setFileVisible.bind(this)}
                    key={this.state.key}
                    img={this.state.img}
                    type={this.state.type}
                />
                <AddContentModal 
                    visible={this.state.addVisible}
                    key={this.state.fileContentKey}
                    setVisible={this.setAddVisible.bind(this)}
                    handleAddVlaue={this.handleAddVlaue.bind(this)}
                />
            </div>
        )
    }
}

export default Content;