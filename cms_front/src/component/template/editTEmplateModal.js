import React, { Component } from 'react';
import {Select, Modal, Form, Input} from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class EditTemplateModal extends Component {

    formRef = React.createRef();

    

    handleValue(){
        this.formRef.current.validateFields().then((values)=>{
            this.props.handleEditValue(values);
        })
       
    }


    render(){
        console.log('---',this.props)
        return(
            <Modal
                title='修改模板信息'
                okText="提交"
                cancelText="取消"
                visible={this.props.visible}
                onOk={this.handleValue.bind(this)}
                onCancel={this.props.setVisible}
            >
                <Form {...layout} ref={this.formRef}>
                        <Form.Item
                            label="模板名称"
                            name="templateName"
                        >
                            <Input defaultValue={this.props.value.templateName?this.props.value.templateName:null}/>
                        </Form.Item>
                        <Form.Item
                            label="模板描述"
                            name="describe"
                        >
                            <Input defaultValue={this.props.value.describe?this.props.value.describe:null}/>
                        </Form.Item> 
                   </Form>
            </Modal>
        )
    }
}

export default EditTemplateModal;