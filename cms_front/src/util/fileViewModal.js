import React, { Component } from 'react';
import {Input, Modal} from 'antd';

const { TextArea } = Input;

class FileViewModal extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleValue = value => {
        console.log(value);
        this.props.setFileVisible();
    }


    render(){
        console.log('...fs',this.props)
        return (
            <Modal
                visible={this.props.fileVisible}
                onOk={this.handleValue.bind(this)}
                onCancel={this.props.setFileVisible}
                title={this.props.title}
                key={this.props.key}
                okText="预览完成"
                cancelText="取消预览"
            >
            {this.props.type==='txt'?
                <TextArea rows={4} value={this.props.fileData}/>:
                <img width='100%' height='100%' src={this.props.img?require('D:\\cms\\data\\bg.jpg'):''} />
            }
                
            </Modal>
        )
    }
}

export default FileViewModal;