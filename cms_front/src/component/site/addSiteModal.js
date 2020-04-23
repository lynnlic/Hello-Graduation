import React, { Component } from 'react';
import  {Select, Modal, Form, Input } from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class AddSiteModal extends React.Component {
    formRef = React.createRef();

    hideModal(){
        this.formRef.current.validateFields().then((values)=>{
            this.props.handleAddVlaue(values);
        })
        
    }
    
    render(){
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
        return(
            <div>
                <Modal
                    title='新增站点'
                    visible={this.props.visible}
                    onOk={this.hideModal.bind(this)}
                    onCancel={this.props.setVisible}
                    okText="提交"
                    cancelText="取消"
                >
                    <Form {...layout} ref={this.formRef}>
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
                            label="站点名"
                            name="siteName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="路径名"
                            name="siteUrl"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>   
                        <Form.Item
                            label="站点描述"
                            name="siteDescribe"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item> 
                   </Form>
                </Modal>
            
            </div>
        )
    }
}

export default AddSiteModal;