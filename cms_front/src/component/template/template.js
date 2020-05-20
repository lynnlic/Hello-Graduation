import React, { Component } from 'react';
import { Form, Input, Button, Table, Select, message, Modal, Popconfirm} from 'antd';
import Navigation from '../../container/navigation.js';
import {getTemplateByCondition, loadLocalTemplate, AddTemplate, editTemFile, editTemplate, editState} from '../../action/templateAction.js';
import AddTemplateModal from './addTemplateModal.js';
import ReUploadModal from './reUploadModal.js';
import FileViewModal from '../../util/fileViewModal.js';
import EditTemplateModal from './editTemplateModal.js';
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
            pageSize:8,
            total:0,
            key: 0,
            addVisible:false,
            savePath:'D:\\cms\\template\\',
            searchSysId:undefined,
            searchTemplateName:undefined,
            searchState:undefined,
            fileVisible:false, //“查看模板框”是够可见
            fileData:'',
            type:'txt',
            parentId:JSON.parse(sessionStorage.getItem('user')).parent,
            uploadVisible:false,//重新上传模板框是否可见
            editVisible:false,//修改弹框是否可见
            editValue:{},//修改框中默认出现的数据
            editModalKey:0,//修改弹框的key值
        }
    }

    componentDidMount(){
        getTemplateByCondition(undefined,undefined,undefined, this.state.parentId,this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            })
        })
    }

    onChangePage=(page,pageSize)=>{
        getTemplateByCondition(this.state.searchSysId,this.state.searchTemplateName,this.state.searchState,this.state.parentId,page,pageSize).then((res)=>{
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
        getTemplateByCondition(values.sysId,values.templateName,values.state,this.state.parentId,1,this.state.pageSize).then((res)=>{
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

    /**
     * 新增弹框的是否可见
     */
    setVisible(){
        this.setState({
            addVisible:!this.state.addVisible,
            key:this.state.key+1
        })
    }

    /**
     * 查看模板的弹框
     */
    setFileVisible(){
        this.setState({
            fileVisible:!this.state.fileVisible,
            fileContentKey: this.state.key+1
        })
    }

    /**
     * 设置重新上传模板文件弹框是否可见
     * @param {*} record 
     */
    setUploadVisible(record){
        this.setState({
            uploadVisible:!this.state.uploadVisible,
            editTemId:record.templateId
        })
    }

    /**
     * 设置修改模板信息弹框是否可见
     * @param {*} record 
     */
    setEditVisible(record){
        if(record){
            this.setState({
                editVisible:!this.state.editVisible,
                editTemId:record.templateId,
                editValue:record,
                editModalKey:this.state.editModalKey+1
            })
        } else {
            this.setState({
                editVisible:!this.state.editVisible,
                editModalKey:this.state.editModalKey+1
            })
        }
    }

    handleAddValue(values,filePath,tagList){
        //登录者的id
        var id=JSON.parse(sessionStorage.getItem('user')).id;
        AddTemplate(values.templateName,values.sysId,values.describe,values.state,filePath,tagList,id)
        .then((res)=>{
            if(res.result.code==201){
                message.success(res.result.msg);
                this.setVisible();
                getTemplateByCondition(this.state.searchSysId,this.state.searchTemplateName,this.state.searchState,this.state.parentId,1,this.state.pageSize).then((res)=>{
                    this.setState({
                        data:res.result.data,
                        msg:res.result.msg,
                        code:res.result.code,
                        total:res.result.total,
                        current:1
                    })
                })
            } else {
                message.error(res.result.msg);
            }
        })
    }

    handleEditValue(values){
        editTemplate(values).then((res)=>{
            if(res.result.code==207){
                message.success(res.result.msg);
                this.setEditVisible();
                getTemplateByCondition(this.state.searchSysId,this.state.searchTemplateName,this.state.searchState,this.state.parentId,1,this.state.pageSize).then((res)=>{
                    this.setState({
                        data:res.result.data,
                        msg:res.result.msg,
                        code:res.result.code,
                        total:res.result.total,
                        current:1
                    })
                })
            } else {
                message.error(res.result.msg);
            }
        })
    }

    handleEditState(record){
        editState(record.templateId,record.state).then((res)=>{
            if(res.result.code==207){
                message.success(res.result.msg);
                getTemplateByCondition(this.state.searchSysId,this.state.searchTemplateName,this.state.searchState,this.state.parentId,1,this.state.pageSize).then((res)=>{
                    this.setState({
                        data:res.result.data,
                        msg:res.result.msg,
                        code:res.result.code,
                        total:res.result.total,
                        current:1
                    })
                })
            } else {
                message.error(res.result.msg);
            }
        })

    }

    loadLoaclFile(path ){
        var type=path.split('.').pop();
        loadLocalTemplate(path).then(res=>{
            if(res.result.code==203){
                message.error(res.result.msg)
            } else if(res.result.code==200){
                this.setState({
                    fileVisible:true,
                    fileData:res.result.data,
                    type:type
                })
            }
        })
    }

    reUploadFile(fileData){
        editTemFile(this.state.editTemId, fileData).then((res)=>{
            if(res.result.code==203){
                message.error(res.result.msg)
            } else if(res.result.code==200){
                message.success(res.result.msg)
                getTemplateByCondition(this.state.searchSysId,this.state.searchTemplateName,this.state.searchState,this.state.parentId,1,this.state.pageSize).then((res)=>{
                    this.setState({
                        data:res.result.data,
                        msg:res.result.msg,
                        code:res.result.code,
                        total:res.result.total,
                        current:1
                    })
                })
            }
        })
    }

    render(){
        const sysInfo=JSON.parse(sessionStorage.getItem('sysName'));
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
            /*{
              title: '存放路径',
              dataIndex: 'templatePath',
              key: 'templatePath',
            },*/
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
              render: (text, record) =>{
                  return (
                      <span>
                        <a style={{ marginRight: 16 }} onClick={this.setEditVisible.bind(this, record)}>编辑 {record.name}</a>
                        <a style={{ marginRight: 16 }} onClick={this.setUploadVisible.bind(this, record)}>重新上传 </a>
                        {record.state==0?
                        <Popconfirm
                            title='确定锁定该模板吗？'
                            onConfirm={this.handleEditState.bind(this,record)}
                            cancelText='取消'
                            okText='确定'
                        >
                            <a style={{ marginRight: 25 }}>锁定模板</a>
                        </Popconfirm>
                        :
                        <Popconfirm
                            title='确定解锁该模板吗？'
                            onConfirm={this.handleEditState.bind(this,record)}
                            cancelText='取消'
                            okText='确定'
                        >
                            <a style={{ marginRight: 25 }}>解锁模板</a>
                        </Popconfirm>
                    }
                        <a onClick={this.loadLoaclFile.bind(this,record.templatePath)}>查看模板</a>
                      </span>
                  )
              } 
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
                <AddTemplateModal 
                    setVisible={this.setVisible.bind(this)}
                    visible={this.state.addVisible}
                    handleAddValue={this.handleAddValue.bind(this)}
                    key={this.state.key}
                />
                <FileViewModal 
                    fileVisible={this.state.fileVisible}
                    fileData={this.state.fileData}
                    setFileVisible={this.setFileVisible.bind(this)}
                    title='查看模板'
                    type={this.state.type}
                    key={this.state.fileContentKey}
                />
                <ReUploadModal
                    visible={this.state.uploadVisible}
                    reUploadFile={this.reUploadFile.bind(this)}
                    setVisible={this.setUploadVisible.bind(this)}
                />
                <EditTemplateModal 
                    visible={this.state.editVisible}
                    setVisible={this.setEditVisible.bind(this)}
                    handleEditValue={this.handleEditValue.bind(this)}
                    value={this.state.editValue}
                />
            </div>
        )
    }
}

export default Template;