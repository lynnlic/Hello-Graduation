import React, { Component, ReactDOM } from '../../../node_modules/react';
import  {Row, Col, Input, Select, Divider, Tree, Form, Button, message, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, WarningOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import Navigation from '../../container/navigation.js';
import {getPagesBySysid} from '../../action/systemAction.js';
import {transformTreeData} from '../../util/transformData.js';
import {getTemplateBySysid, getTagsByTemplateId} from '../../action/templateAction.js';
import {getDataBySiteId} from '../../action/contentAction.js';
import {uploadPageInfo,createNewPage,getSavedPageInfo, downloadFile, uploadEditPageInfo} from '../../action/createPageAction.js';
import {deletePage} from '../../action/pageAction.js';
import AddContent from './addContent.js';
require('../../common.less');
require('./createPage.less');

/*const onFinish = values =>{
    console.log('values',values);
}*/
//访问路径
var url=[''];
//存储路径
var path=['D:/cms']

const onFinishFailed=null;
//已提交但未生成的页面id
var unSavedPageId=[];

var createComponent=[];

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
  };

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
};
//选择好的tags和content
var selectedTags=[];

class CreatePage extends Component {
    formRef = React.createRef();
    //fields = this.formRef.current.setFields(['content','tags']);

    constructor(props){
        super(props);
        this.state={
            f:[],
            pages:[],
            templates:[],
            datas:[],
            sites:[],
            selectedSys:'',
            realUrl:'',//当前的访问路径
            realPath:'',//当前的存储路径
            realSysId:null,//当前选中的系统id
            realSiteId:null,
            realTemplateId:null,
            tags:[],
            addContent:[],
            selectedTags:[],
            savedPageinfo:{},//树形结构中的页面信息
            modalVisible:false,//下载提示框弹框是否可见
            sysSaveName:undefined,//当前系统用于存储的文件夹名称
            sysId:0,//当前选择的系统的id
            flag:true,//编辑还是新增的状态 true：新增 false：修改
        }
    }

    handleSelect(value,key){
        url[1]=key.key;
        path[1]=key.key;
        getPagesBySysid(value).then((res)=>{
            this.setState({
                sites:res.result.data[0],
                pages:res.result.data[1],
                total:res.result.data[1].length,
                selectedSys:key.children,
                realUrl:url.join('/'),
                realPath:path.join('/'),
                realSysId:value,
                sysSaveName:key.key,
                sysId:value
            })
        });
        getTemplateBySysid(value).then((res)=>{
            this.setState({
                templates:res.result.data
            })            
        })
    }

    //选择站点后获得内容
    handleSiteSelect(value,key){
        console.log('valusitee',value)
        url[2]=key.key;
        path[2]=key.key;
        getDataBySiteId(value).then((res)=>{
            this.setState({
                datas:res.result.data,
                realUrl:url.join('/'),
                realPath:path.join('/'),
                realSiteId:value,
                savedPageinfo:{},
                flag:true
            })
        })
    }

    //选择模板后获得tagList
    handleTemSelect(value){
        console.log('values',value);
        getTagsByTemplateId(value).then((res)=>{
            this.setState({
                tags:res.result.data.split(';'),
                realTemplateId:value,
                savedPageinfo:{},
                flag:true
            })
        })
    }

    handleTagsSelect(result){
        selectedTags=result;
        console.log('result',selectedTags);
    }

    //生成页面
    handleCreatePage(){
        console.log(unSavedPageId,'---',this.state.sysSaveName);
        if(this.state.sysSaveName){
            if(unSavedPageId.length>0){
                createNewPage(unSavedPageId).then((res)=>{
                    if(res.result.code==201){
                        getPagesBySysid(this.state.sysId).then((res)=>{
                            this.setState({
                                pages:res.result.data[1],
                            })
                        });
                        this.setDownloadModal();
                    }
                });
            } else if(unSavedPageId.length==0){
                this.setDownloadModal();
            }        
        } else {
            message.error('请先选择所属系统！');
        }
        
    }

    /**
     * 点击树形中的页面名称获得页面信息
     * @param {*} selectedKeys 
     * @param {*} e 
     */
    handleTreeSelect(selectedKeys, e){
        console.log('---selectedKeys',selectedKeys)
        if(selectedKeys.length>0){
            //选中的页面的id
            var selectedId=selectedKeys[0];
            getSavedPageInfo(selectedKeys[0]).then((res)=>{
                this.setState({
                    savedPageinfo:res.result.data,
                    flag:false
                })
            });
        } else {//取消选中
            this.setState({
                savedPageinfo:{},
                flag:true
            })
        }
    }

    /**
     * 右击删除
     * @param {*} e 
     */
    deletePage(e){
        var pageId=e.node.key;
        var pagePath=e.node.pagePath;
        if(e.node.selected){
            Modal.confirm({
                title:'确认删除此页面吗？',
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    deletePage(pageId,pagePath).then((res)=>{
                        if(res.result.code==204){
                            message.success(res.result.msg);
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            })
        }
    }

    downloadPages(){
        downloadFile(this.state.sysSaveName);
        this.setDownloadModal();
    }

    setDownloadModal(){
        this.setState({
            modalVisible:!this.state.modalVisible
        })
    }

    onChangeFileName=e=>{
        url[3]=e.target.value+'.html';
        path[3]=e.target.value+'.html';
        this.setState({
            realUrl:url.join('/'),
            realPath:path.join('/'),
            realName:e.target.value
        })
    }

    onFinish = values =>{
        console.log('form-value',values);        
        //登录者的id
        var id=JSON.parse(sessionStorage.getItem('user')).id;
        var obj = {
            sysId:this.state.realSysId,
            siteId:this.state.realSiteId,
            templateId:this.state.realTemplateId,
            'content':selectedTags,
            'url':this.state.realUrl,
            'path':this.state.realPath,
            'cId':id,
            pageFileName:this.state.realName
        }
        uploadPageInfo(obj).then((res)=>{
            if(res.result.code==201){
                message.success(res.result.msg);
                getPagesBySysid(this.state.sysId).then((res)=>{
                    this.setState({
                        sites:res.result.data[0],
                        pages:res.result.data[1],
                        realPath:''
                    })
                });
                this.formRef.current.resetFields();
            } else {
                message.error(res.result.msg);
            }
        })
    }

    onEditFinish(){
        uploadEditPageInfo(this.state.savedPageinfo.pageId,selectedTags).then((res)=>{
            if(res.result.code==207){
                message.success(res.result.msg);
                getPagesBySysid(this.state.realSysId).then((res)=>{
                    this.setState({
                        sites:res.result.data[0],
                        pages:res.result.data[1],
                        realPath:''
                    })
                });
                this.formRef.current.resetFields();
            } else {
                message.error(res.result.msg);
            }
        })
    }

    render(){
        const sysInfo=JSON.parse(sessionStorage.getItem('sysName'));
        const treeData=transformTreeData(this.state.sites,this.state.pages);
        unSavedPageId=[]
        //给Tree增加图标结构
        treeData.map((item,index)=>{
            item.children.map((i)=>{
                if(i.state!=1){
                    unSavedPageId.push(i.key);
                    Object.assign(i,{icon:<WarningOutlined />})
                    Object.assign(item,{icon:<WarningOutlined />})
                }
            })
        })

        const options=sysInfo.map((item, index)=>{
            return <Option value={item.sysId+''} key={item.sysSaveName}>{item.sysName}</Option>
        })
        const siteOptions=this.state.sites.map((item)=>{
            return <Option value={item.siteId+''} key={item.siteUrl}>{item.siteName}</Option>
        })
        const contentOptions=this.state.datas.map((item)=>{
            return <Option value={item.id+''} key={item.id}>{item.title}</Option>
        })
        const tagsOptions=this.state.tags.map((item)=>{
            return <Option value={item} key={item}>{item}</Option>
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
                            showIcon
                            treeData={treeData}
                            className="createpage_tree"
                            key='pageTree'
                            onSelect={this.handleTreeSelect.bind(this)}
                            onRightClick={this.deletePage.bind(this)}
                        />
                        <Input type="button" value="生成页面" onClick={this.handleCreatePage.bind(this)}/>
                    </div>
                    <Divider type="vertical" key='divider' style={{backgroundColor:'#17cccc',height:'100%'}} />
                    <div className='right'>
                        <h1>生成静态页面请求</h1>
                        <Form
                            {...layout}
                            onFinish={this.onFinish.bind(this)}
                            className="createPage_form"
                            ref={this.formRef}
                            name="control-ref"
                        >
                            <Form.Item label='所属系统:'>
                                <Select                                    
                                    onSelect={this.handleSelect.bind(this)}
                                    name='sysSelect'
                                    value={this.state.savedPageinfo.systemId?this.state.savedPageinfo.systemId+'':this.state.realSysId}
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item label='所属站点:'>
                                <Select
                                    onSelect={this.handleSiteSelect.bind(this)}
                                    name='siteId'
                                    value={this.state.savedPageinfo.siteId?this.state.savedPageinfo.siteId+'':undefined}
                                    disabled={!this.state.flag}
                                >
                                    {siteOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label='所用模板:'>
                                <Select 
                                    onSelect={this.handleTemSelect.bind(this)}
                                    value={this.state.savedPageinfo.templateId?this.state.savedPageinfo.templateId+'':undefined}
                                    disabled={!this.state.flag}
                                >
                                {this.state.templates.map((item)=>{
                                    return <Option value={item.templateId+''} key={item.templateId}>{item.templateName}</Option>
                                })}
                                </Select>
                            </Form.Item>
                            <Form.Item label='页面名称:'>
                                <Input 
                                    onChange={this.onChangeFileName.bind(this)}
                                    name="pageFileName"
                                    value={this.state.savedPageinfo.fileName?this.state.savedPageinfo.fileName:undefined}
                                    disabled={!this.state.flag}
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
                                    value={this.state.realPath.length>0?this.state.realPath:(this.state.savedPageinfo?this.state.savedPageinfo.path:undefined)}
                                    disabled
                                />
                            </Form.Item>
                            <span className="right_addContent_text">&nbsp;添加内容:</span>
                            {this.state.flag?
                                <Form.List name='content'>
                                {(fields, {add, remove})=>{                                   
                                    return(
                                        <div>
                                            {fields.map((field,index)=>{
                                                return(
                                                    <div>
                                                            <AddContent 
                                                                data={this.state.datas}
                                                                tags={this.state.tags}
                                                                field={field}
                                                                handleTagsSelect={this.handleTagsSelect.bind(this)}
                                                            />
                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                style={{ margin: '0 8px' }}
                                                                onClick={() => {
                                                                    remove(field.name);
                                                                }}
                                                                />
                                                            ) : null}
                                                </div>
                                                )
                                            })}
                                        
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                style={{ width: '100%',marginLeft: '73px'}}
                                                >
                                                <PlusOutlined /> 继续添加
                                            </Button>
                                        </Form.Item>
                                        </div>
                                        )
                                    }}                                
                                </Form.List>
                            :
                            <div>
                                {
                                 this.state.savedPageinfo.content.map((item,index)=>{
                                     console.log('------',this.state.savedPageinfo)
                                     return (
                                        <AddContent 
                                            editData={this.state.savedPageinfo.content[index].dataId}
                                            editTags={this.state.savedPageinfo.content[index].tag}
                                            data={this.state.savedPageinfo.dataList}
                                            tags={this.state.savedPageinfo.tagList.split(';')}
                                            flag={!this.state.flag}
                                            handleTagsSelect={this.handleTagsSelect.bind(this)}
                                        />
                                     )
                                 })
                                }
                            </div>
                        }
                        <Form.Item>
                            {this.state.flag?
                                <Button  type="primary" htmlType="submit">
                                    提交申请
                                </Button>
                            :
                                <Button  type="primary" onClick={this.onEditFinish.bind(this)}>
                                    提交修改
                                </Button>
                            }
                        </Form.Item>
                        </Form>
                    </div>
                </div>
                <div id='downloadDiv' style={{display:'none'}}></div>
                <Modal 
                    visible={this.state.modalVisible}
                    onOk={this.downloadPages.bind(this, event)}
                    footer={null}
                    title='下载确认框'
                >
                    <p>页面已成功生成！</p>
                    <p>请选择现在下载页面或是等所有页面都修改完毕再下载</p>
                    <Button
                        onClick={this.setDownloadModal.bind(this)}
                    >
                        暂不下载
                    </Button>
                    <Button
                        type="primary"
                        onClick={(record) => this.downloadPages(record)}
                        className="download_confirm_now"
                    >
                        现在下载
                    </Button>
                </Modal>
            </div>
        )
    }
}

export default CreatePage;