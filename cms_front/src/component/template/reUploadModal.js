import React, { Component } from 'react';
import {Modal, Input, Upload, message, Button} from 'antd';
import {uploadUrl} from '../../constants/config.js';
import { UploadOutlined } from '@ant-design/icons';

class ReUploadModal extends Component {
    state={
        tags:undefined,
        filePath:undefined
    }

    handleChange = info => {
        if(info.file.status==='done'){
            console.log(info.file.response);
            if(info.file.response.code==200){
                message.success('更新成功！');
                this.props.reUploadFile(info.file.response.data);
            }
            this.setState({
                tags:info.file.response.data.tagList.join(';'),
                filePath:info.file.response.data.filePath
            })
            sessionStorage.setItem('file',JSON.stringify(info.file))
        }
    }

    render(){
        //文件上传格式
        const props = {
            accept: '.txt',
            action: uploadUrl,
            name: 'file'            
        }
        return(
            <Modal
                visible={this.props.visible}
                title='重新上传模板文件'
                okText="关闭"
                onCancel={this.props.setVisible}
                onOk={this.props.setVisible}
                key={this.props.key}
            >
                模板上传：<Upload 
                    {...props}
                    onChange={this.handleChange}
                >
                    <Button>
                        <UploadOutlined /> 上传模板
                    </Button>
                </Upload>
                标签列表：
                <Input 
                    value={this.state.tags}
                />
            </Modal>
        )
    }
}

export default ReUploadModal;