import React, { Component } from 'react';
import {Input,  Select, Divider, Tree, Form, Button} from 'antd';
import Navigation from '../../container/navigation.js';
import {getPagesBySysid} from '../../action/systemAction.js';
import {transformTreeData} from '../../util/transformData.js';
import {getTemplateBySysid} from '../../action/templateAction.js';
import {getDataBySiteId} from '../../action/contentAction.js';
import AddContent from './addContent.js';
require('../../common.less');
require('./createPage.less');

/*const onFinish = values =>{
    console.log('values',values);
}*/
//访问路径
var url=[''];
//存储路径
var path=['C:\\result']

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
            datas:[],
            selectedSys:'',
            realUrl:'',
            realPath:''
        }
    }

    handleSelect(value,key){
        console.log('value',value,'key',key)
        url[1]=key.key;
        path[1]=key.key;
        getPagesBySysid(value).then((res)=>{
            this.setState({
                sites:res.result.data[0],
                pages:res.result.data[1],
                total:res.result.data[1].length,
                selectedSys:key.children,
                realUrl:url.join('/'),
                realPath:path.join('\\')
            })
        });
        getTemplateBySysid(value).then((res)=>{
            this.setState({
                templates:res.result.data
            })            
        })
    }

    handleSiteSelect(value,key){
        url[2]=key.key;
        path[2]=key.key;
        getDataBySiteId(value).then((res)=>{
            this.setState({
                datas:res.result.data,
                realUrl:url.join('/'),
                realPath:path.join('\\')
            })
        })
    }

    onChangeFileName=e=>{
        url[3]=e.target.value+'.html';
        path[3]=e.target.value+'.html';
        this.setState({
            realUrl:url.join('/'),
            realPath:path.join('\\')
        })

    }

    onFinish = values =>{
        console.log('values',values);
    }



    render(){
        console.log('url',this.state.url)
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
        const treeData=transformTreeData(this.state.sites,this.state.pages);
        const options=sysInfo.map((item, index)=>{
            return <Option value={item.sysId} key={item.sysSaveName}>{item.sysName}</Option>
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
                            //optionFilterProp="children"
                            onSelect={this.handleSelect.bind(this)}
                            value={this.state.selectedSys}
                            key='sysSelect'
                            name='sysSelect'
                        >
                            {options}
                        </Select>
                        <Tree 
                            treeData={treeData}
                            className="createpage_tree"
                            key='pageTree'
                        />
                        <Input type="button" value="生成页面" />
                    </div>
                    <Divider type="vertical" key='divider' style={{backgroundColor:'#17cccc',height:'100%'}} />
                    <div className='right'>
                        <h1>生成静态页面请求</h1>
                        <Form
                            {...layout}
                            onFinish={this.onFinish.bind(this)}
                            className="createPage_form"
                        >
                            <Form.Item label='所属系统:' >
                                <Select                                    
                                    onSelect={this.handleSelect.bind(this)}
                                    value={this.state.selectedSys} 
                                    key='sysSelect'
                                    name='sysSelect'
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item label='所属站点:' name='siteName'>
                                <Select
                                    onSelect={this.handleSiteSelect.bind(this)}
                                >
                                {this.state.sites.map((item)=>{
                                    return <Option value={item.siteId} key={item.siteUrl}>{item.siteName}</Option>
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
                            <Form.Item label='页面名称:' name='pageFileName'>
                                <Input 
                                    onChange={this.onChangeFileName.bind(this)}
                                    name="pageFileName"
                                />
                            </Form.Item>
                            <Form.Item label='访问路径:'>
                                <Input 
                                    value={this.state.realUrl}
                                    name='url'
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item label='存储路径:' >
                                <Input 
                                    value={this.state.realPath}
                                    disabled
                                />
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