import React, { Component } from 'react';
import {Input, Modal} from 'antd';

const { TextArea } = Input;

class FileViewModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            flag:true,//true:预览状态 false：编辑状态
            textValue:'',//文本框内容
        }
    }

    handleValue = value => {
        console.log(value.target);
        if(!this.state.flag){//编辑状态下
            this.props.handleFileEdit(this.state.textValue);
        }
        //this.props.setFileVisible();
    }

    handleEdit = e => {
        this.setState({
            textValue: e.target.value,
            flag:false
        })
    }


    render(){
        return (
            <Modal
                visible={this.props.fileVisible}
                onOk={this.handleValue.bind(this)}
                onCancel={this.props.setFileVisible}
                title={this.props.title}
                key={this.props.key}
                okText={this.state.flag?"预览完成":"提交修改"}  
                cancelText={this.state.flag?"取消预览":"取消修改"}  
            >
            {this.props.type==='txt'?
                <TextArea 
                    rows={4} 
                    autoSize
                    defaultValue={this.props.fileData}
                    onChange={this.handleEdit.bind(this)}
                />
                :
                <img width='100%' height='100%' src={this.props.img?require('D:\\cms\\data\\bg.jpg'):''} />
            }
                
            </Modal>
        )
    }
}

export default FileViewModal;