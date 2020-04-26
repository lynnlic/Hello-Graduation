import React, { Component } from 'react';
import {Input, Modal} from 'antd';

const { TextArea } = Input;

class FileContentModal extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleValue = value => {
        console.log(value);
    }


    render(){

        return (
            <Modal
                visible={this.props.fileVisible}
                onOk={this.handleValue.bind(this)}
                onCancel={this.props.setFileVisible}
                title="模板预览"
            >
                <TextArea rows={4} value={this.props.fileData}/>
            </Modal>
        )
    }
}

export default FileContentModal;