import React, { Component } from 'react';
import { Button, Select, Modal, Form, Input, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {iconUploadUrl} from '../../constants/config';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class AddSystemModal extends Component {

    formRef = React.createRef();

    state = {
        loading: false,
    };

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

    beforeUpload(file){
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传jpg或png格式图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片必须小于2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    
    handleChange = info =>{
        if (info.file.status === 'uploading') {
                this.setState({ 
                    loading: true 
                });
                return;
            }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>{
                this.setState({
                    imageUrl,
                    loading: false,
                    path: info.file.response.data
                })
            });
        }
    }

    handleValue(){
        this.formRef.current.validateFields().then((values)=>{
            console.log('add',values)
            //this.props.handleAddVlaue(values,this.state.path);
        })
    }


    render(){
        //上传按钮
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        //上传的图片的路径--用base64表示
        const { imageUrl } = this.state;
        //输入框前缀
        const selectBefore = (
            <Select defaultValue="http://" className="select-before">
              <Option value="http://">http://</Option>
              <Option value="https://">https://</Option>
            </Select>
          );
        //输入框后缀
        const selectAfter = (
            <Select defaultValue=".com" className="select-after">
              <Option value=".com">.com</Option>
              <Option value=".jp">.jp</Option>
              <Option value=".cn">.cn</Option>
              <Option value=".org">.org</Option>
            </Select>
          );

        return (
            <div>
                <Modal
                    title='新增系统'
                    visible={this.props.visible}
                    onOk={this.handleValue.bind(this)}
                    onCancel={this.props.setVisible}
                    key={this.props.key}
                    okText="提交"
                    cancelText="取消"
                >
                    <Form {...layout} ref={this.formRef}>
                        <Form.Item
                            label="系统名称"
                            name="sysName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="系统图标"
                            rules={[{ required: true }]}
                        >
                            <Upload
                                name="icon"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={this.beforeUpload.bind(this)}
                                onChange={this.handleChange}
                                action={iconUploadUrl}
                            >
                                {imageUrl ? <img src={imageUrl} alt="系统图标" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="网址"
                            name="url"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="存储名"
                            name="saveName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="版权"
                            name="copyRight"
                        >
                            <Input />
                        </Form.Item> 
                        <Form.Item 
                            label='联系电话:' 
                            name='phone' 
                        >
                            <Input />
                        </Form.Item> 
                        <Form.Item 
                            label='联系邮箱:' 
                            name='email' 
                        >
                            <Input />
                        </Form.Item>                        
                   </Form>
                </Modal>
            </div>
        )
    }
}

export default AddSystemModal;