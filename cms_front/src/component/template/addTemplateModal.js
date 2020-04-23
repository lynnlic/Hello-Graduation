import React, { Component } from 'react';
import { Button, Select, Modal, Form, Input, Upload } from 'antd';
import {uploadUrl} from '../../constants/config.js';
import { UploadOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};



class AddTemplateModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            tags:[]
        }
    }

    formRef = React.createRef();

    handleValue(){
        this.formRef.current.validateFields().then((values)=>{
            /*this.props.handleAddValue(values);*/
            console.log(values)
        })
       
    }

    handleChange = info => {
        if(info.file.status==='done'){
            console.log(info.file.response);
            this.setState({
                tags:info.file.response.data
            })
        }
    }
    
    render(){
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
        //文件上传格式
        const props = {
            accept: '.txt',
            action: uploadUrl,
            name: 'file'            
        }
        console.log('state',this.state);
        return(
            <div>
                <Modal
                    title='新增模板'
                    visible={this.props.visible}
                    onOk={this.handleValue.bind(this)}
                    onCancel={this.props.setVisible}
                    okText="提交"
                    cancelText="取消"
                >
                    <Form {...layout} ref={this.formRef}>
                        <Form.Item
                            label="模板名称"
                            name="templateName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="所属系统"
                            name="sysId"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                {sysInfo.map((item, index)=>{
                                    return <Select.Option value={item.sysId} key={item.sysSaveName}>{item.sysName}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>  
                        <Form.Item
                            label="模板上传"
                            rules={[{ required: true }]}
                        >
                            <Upload 
                                {...props}
                                onChange={this.handleChange}
                            >
                                <Button>
                                    <UploadOutlined /> 上传模板
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="存储路径"
                            name="templatePath"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item> 
                        <Form.Item
                            label="模板描述"
                            name="describe"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item> 
                        <Form.Item
                            label="标签集合"
                            id="tags"
                        >
                            <Input name="tags" value={this.state.tags}/>
                        </Form.Item>
                        <Form.Item
                            label="模板状态"
                            name="state"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                <Select.Option value='0' key='0'>启用</Select.Option>
                                <Select.Option value='1' key='1'>禁用</Select.Option>
                            </Select>
                        </Form.Item>   
                   </Form>
                </Modal>
            </div>
        )
    }
}

export default AddTemplateModal;