import React, { Component } from 'react';
import  {Row, Col, Select, Form, message } from 'antd';

var selectedTags=[];
//用于判断当前tag是否已被点击
var isTagSelect=[];

export default class AddContent extends Component {
    state={
        selected:[],
        contentId:0,
        editTags:this.props.editTags
    }

    componentDidMount(){
        this.props.tags.map((item,index)=>{
            isTagSelect[index]=true;
        })
    }

    handContentSelect(values){
        this.setState({
            contentId:values,
            editTags:null
        })

    }

    handTagSelect(values,key){
        console.log('key',key, '----values',values)
        this.setState({
            editTags:values
        })
        /*if(this.state.contentId==0){
            message.error('请先选择内容再选择标签！');
        }*/
        var flag=true;
        /*if(selectedTags.length!=0){
            for(var tag in selectedTags){
                if(selectedTags[tag].tagName==values){
                    message.error('请不要重复选择标签！');
                    flag=false;
                    break;                    
                }
            }
        }*/
        if(this.state.contentId!=0&&(selectedTags.length==0||flag)){
            var obj={
                contentId:this.state.contentId,
                tagName:values
            }
            selectedTags.push(obj);
        }
        this.props.handleTagsSelect(selectedTags);
    }


    render(){
        console.log('props',this.props)
        const options=this.props.data.map((item)=>{
            return <Option value={item.id} key={item.id}>{item.title}</Option>
        })
        const tagsOptions=this.props.tags.map((item, index)=>{
            return <Option value={item} key={index}>{item}</Option>
        })

        return(
            <div>
                <Form.Item label='内容' {...this.props.field} >
                    <Select onSelect={this.handContentSelect.bind(this)} value={this.props.editData?this.props.editData:null}>
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item label='标签'>
                    <Select onSelect={this.handTagSelect.bind(this)}
                        value={this.state.editTags?this.state.editTags:null}
                    >
                        {tagsOptions}
                    </Select>
                </Form.Item>
            </div>
        )
    }
}