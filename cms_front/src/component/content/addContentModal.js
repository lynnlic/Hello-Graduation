import React, { Component } from 'react';
import { Button, Select, Modal, Form, Input, Upload } from 'antd';
import {getPagesBySysid} from '../../action/systemAction.js';
import { UploadOutlined } from '@ant-design/icons';
import {contentUploadUrl} from '../../constants/config.js';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class AddContentModal extends Component {
    formRef = React.createRef();

    constructor(props){
        super(props);
        this.state = {
            sites: [],
            filePath:''
        }
    }

    handleValue(){
        this.formRef.current.validateFields().then((values)=>{
            console.log('values',this.state);
            this.props.handleAddVlaue(values,this.state.filePath);
        })
    }

    handleChange = info => {
        console.log('info',info);
        if(info.file.status==='done'){
            console.log(info.file.response);
            this.setState({
                filePath:info.file.response.data
            })
            sessionStorage.setItem('file',JSON.stringify(info.file))
        }
    }

    handleSelect(value,key){
        getPagesBySysid(value).then((res)=>{
            console.log('res',res);
            this.setState({
                sites:res.result.data[0],
            })
        });
    }

    render(){
        const sysInfo=JSON.parse(sessionStorage.getItem('sysName'));
        //文件上传格式
        const props = {
            accept: '.txt,.jpg',
            action: contentUploadUrl,
            name: 'content'            
        }
        return (
            <div>
                <Modal
                    title='新增内容'
                    visible={this.props.visible}
                    onOk={this.handleValue.bind(this)}
                    onCancel={this.props.setVisible}
                    key={this.props.key}
                    okText="提交"
                    cancelText="取消"
                >
                    <Form {...layout} ref={this.formRef}>
                        <Form.Item
                            label="内容标题"
                            name="contentName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="内容描述"
                            name="contentDescribe"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="内容上传"
                            rules={[{ required: true }]}
                        >
                            <Upload 
                                {...props}
                                onChange={this.handleChange}
                            >
                                <Button>
                                    <UploadOutlined /> 上传内容
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="所属系统"
                            name="sysId"
                            rules={[{ required: true }]}
                        >
                            <Select onSelect={this.handleSelect.bind(this)}>
                                {sysInfo.map((item, index)=>{
                                    return <Select.Option value={item.sysId} key={item.sysSaveName}>{item.sysName}</Select.Option>
                                })}
                            </Select>
                        </Form.Item> 
                        <Form.Item label='所属站点:' name='siteId' rules={[{ required: true }]}>
                                <Select >
                                {this.state.sites.map((item)=>{
                                    return <Option value={item.siteId} key={item.siteUrl}>{item.siteName}</Option>
                                })}
                                </Select>
                            </Form.Item>                         
                   </Form>
                </Modal>
            </div>
        )
    }
}

export default AddContentModal;