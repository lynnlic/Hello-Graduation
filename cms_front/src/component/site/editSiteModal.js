import React, { Component } from 'react';
import  {Select, Modal, Form, Input } from 'antd';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class EditSiteModal extends Component {
    formRef = React.createRef();

    handleEditlaue(){
        this.formRef.current.validateFields().then((values)=>{
            console.log('editvalue',values)
            this.props.handleEditVlaue(values);
        })
    }

    render(){

        return(
            <Modal
                title='修改站点信息'
                visible={this.props.visible}
                onOk={this.handleEditlaue.bind(this)}
                onCancel={this.props.setVisible}
                okText="提交"
                cancelText="取消"
            >
                <Form {...layout} ref={this.formRef}>
                    <Form.Item
                        label="站点名"
                        name="siteName"
                    >
                        <Input defaultValue={this.props.value.siteName?this.props.value.siteName:null}/>
                    </Form.Item>
                    <Form.Item
                        label="路径名"
                        name="siteUrl"
                    >
                        <Input defaultValue={this.props.value.siteUrl?this.props.value.siteUrl:null}/>
                    </Form.Item>   
                    <Form.Item
                        label="站点描述"
                        name="siteDescribe"
                    >
                        <Input defaultValue={this.props.value.siteDescribe?this.props.value.siteDescribe:null}/>
                    </Form.Item> 
               </Form>
            </Modal>
        )
    }
}

export default EditSiteModal;