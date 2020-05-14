import React, { Component } from 'react';
import  {Row, Col, Select, Form, message } from 'antd';

var selectedTags=[];
//用于判断当前tag是否已被点击
var isTagSelect=[];

export default class AddContent extends Component {
    state={
        selected:[],
        contentId:0,
    }

    componentDidMount(){
        this.props.tags.map((item,index)=>{
            isTagSelect[index]=true;
        })
    }

    handContentSelect(values){
        this.setState({
            contentId:values
        })
    }

    handTagSelect(values,key){
        console.log('key',key)
        if(this.state.contentId==0){
            message.error('请先选择内容再选择标签！');
        }
        var flag=true;
        if(selectedTags.length!=0){
            for(var tag in selectedTags){
                if(selectedTags[tag].tagName==values){
                    message.error('请不要重复选择标签！');
                    flag=false;
                    break;                    
                }
            }
        }
        if(this.state.contentId!=0&&(selectedTags.length==0||flag)){
            var obj={
                contentId:this.state.contentId,
                tagName:values
            }
            selectedTags.push(obj);
        }
        this.props.handleTagsSelect(selectedTags);
    }

    beforeTagSelect(values){
        console.log('****',values)
        return false;
    }
    

    render(){
        const options=this.props.data.map((item)=>{
            return <Option value={item.id} key={item.id}>{item.title}</Option>
        })
        const tagsOptions=this.props.tags.map((item, index)=>{
            return <Option value={item} key={index}>{item}</Option>
        })
        console.log('fieldsss',this.props.tags)
        return(
            <div>
                <Form.Item label='内容' {...this.props.field} >
                    <Select onSelect={this.handContentSelect.bind(this)}>
                        {options}
                    </Select>
                </Form.Item>
                <Form.Item label='标签'>
                    <Select onSelect={this.handTagSelect.bind(this)}
                        onChange={this.beforeTagSelect.bind(this)}
                    >
                        {tagsOptions}
                    </Select>
                </Form.Item>
            </div>
        )
    }
}