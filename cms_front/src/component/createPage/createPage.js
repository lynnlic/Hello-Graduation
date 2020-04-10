import React, { Component } from 'react';
import {Input,  Select, Divider, Tree, Form, Button} from 'antd';
import Navigation from '../../container/navigation.js';
import {getPagesBySysid} from '../../action/systemAction.js';
import {transformTreeData} from '../../util/transformData.js';
import {getTemplateBySysid} from '../../action/templateAction.js';
import {getDataBySiteName} from '../../action/contentAction.js';
import AddContent from './addContent.js';
require('../../common.less');
require('./createPage.less');

const onFinish = values =>{
    console.log('values',values);
}

const onFinishFailed=null;

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
  };

class CreatePage extends Component {
    

    constructor(props){
        super(props);
        this.state={
            sites:[],
            pages:[],
            templates:[],
            datas:[]
        }
    }

    handleSelect(value){
        getPagesBySysid(value).then((res)=>{
            this.setState({
                sites:res.result.data[0],
                pages:res.result.data[1],
                total:res.result.data[1].length
            })
        });
        getTemplateBySysid(value).then((res)=>{
            this.setState({
                templates:res.result.data
            })            
        })
    }

    handleSiteSelect(value){
        console.log('valie',value)
        getDataBySiteName(value).then((res)=>{
            this.setState({
                datas:res.result.data
            })
        })
    }

    render(){
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
        const treeData=transformTreeData(this.state.sites,this.state.pages);
        const options=sysInfo.map((item, index)=>{
            return <Option value={item.sysId} key={item.sysId}>{item.sysName}</Option>
        })
        
        return(
            <div className="common_content_frame">
                <Navigation 
                    text="生成静态页"
                />
                <div className='createpage_frame'>
                    <div className='left'>
                        <Select
                            showSearch
                            className="createpage_select"
                            placeholder="选择系统"
                            optionFilterProp="children"
                            onSelect={this.handleSelect.bind(this)}
                            /*
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}*/
                        >
                            {options}
                        </Select>
                        <Tree 
                            treeData={treeData}
                            className="createpage_tree"
                            key='pageTree'
                        />
                    </div>
                    <Divider type="vertical" key='divider' style={{backgroundColor:'#17cccc',height:'100%'}} />
                    <div className='right'>
                        <h1>生成静态页面请求</h1>
                        <Form
                            {...layout}
                            onFinish={onFinish}
                            className="createPage_form"
                        >
                            <Form.Item label='所属系统:' name='sysName'>
                                <Select onSelect={this.handleSelect.bind(this)}>{options}</Select>
                            </Form.Item>
                            <Form.Item label='所属站点:' name='siteName'>
                                <Select
                                    onSelect={this.handleSiteSelect.bind(this)}
                                >
                                {this.state.sites.map((item)=>{
                                    return <Option value={item} key={item}>{item}</Option>
                                })}
                                </Select>
                            </Form.Item>
                            <Form.Item label='所用模板:' name='templateName'>
                                <Select>
                                {this.state.templates.map((item)=>{
                                    return <Option value={item.templateName} key={item.templateId}>{item.templateName}</Option>
                                })}
                                </Select>
                            </Form.Item>
                            <Form.Item label='访问路径:' name='url'>
                                <Input />
                            </Form.Item>
                            <Form.Item label='存储路径:' name='path'>
                                <Input />
                            </Form.Item>
                            <Form.Item label='填充内容:' name='content'>
                                <AddContent 
                                    data={this.state.datas}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button  type="primary" htmlType="submit">
                                    提交申请
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePage;