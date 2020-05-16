import React, { Component } from 'react';
import  {Modal, Form, Input } from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class EditUserModal extends Component {
    formRef = React.createRef();

    handleEditValue(){
        this.formRef.current.validateFields().then((values)=>{
            this.props.handleEditValue(Object.assign(values, {id:this.props.data.id}));
            //this.props.handleAddVlaue(values);
        })
        
    }


    render(){
        console.log('--',this.props.data)


        return(
            <Modal
                visible={this.props.visible}
                title='修改用户信息'
                onOk={this.handleEditValue.bind(this)}
                onCancel={this.props.setEditVisible}
                okText='提交修改'
                cancelText='取消修改'
                key={this.props.key}
            >
                <Form {...layout} ref={this.formRef}>
                        <Form.Item
                            label="用户名"
                            name="name"
                        >
                            <Input defaultValue={this.props.data?this.props.data.name:null}/>
                        </Form.Item> 
                        <Form.Item
                            label="账户名"
                            name="account"
                        >
                            <Input defaultValue={this.props.data?this.props.data.account:null}/>
                        </Form.Item>
                   </Form>
            </Modal>
        )
    }
}

export default EditUserModal;