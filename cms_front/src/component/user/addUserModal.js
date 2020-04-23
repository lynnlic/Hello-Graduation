import React, { Component } from 'react';
import  {Select, Modal, Form, Input } from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class AddUserModal extends React.Component {
    formRef = React.createRef();

    hideModal(){
        this.formRef.current.validateFields().then((values)=>{
            this.props.handleAddVlaue(values);
        })
        
    }
    
    render(){
        return(
            <div>
                <Modal
                    title='新增用户'
                    visible={this.props.visible}
                    onOk={this.hideModal.bind(this)}
                    onCancel={this.props.setVisible}
                    okText="提交"
                    cancelText="取消"
                >
                    <Form {...layout} ref={this.formRef}>
                        <Form.Item
                            label="用户名"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item> 
                        <Form.Item
                            label="账户名"
                            name="account"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item> 
                        <Form.Item
                            label="用户状态"
                            name="state"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                <Select.Option value='1' key='1'>启用</Select.Option>
                                <Select.Option value='0' key='0'>禁用</Select.Option>
                            </Select>
                        </Form.Item>   
                   </Form>
                </Modal>
            </div>
        )
    }
}

export default AddUserModal;