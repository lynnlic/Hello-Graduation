import React, { Component } from 'react';
import  { Form, Input, Button, Pagination, Card, message} from 'antd';
import {addSystem, getSysDescribeByCondition} from '../../action/systemAction.js';
import AddSystemModal from './addSystemModal.js';
import {url} from '../../constants/config.js';
require('../../common.less');
require('./system.less');

const { Meta } = Card;

const onFinishFailed=null;

class MainPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data:[],
            total:0,
            current:1,
            pageSize:6,
            addVisible:false,
            loading: true,
            key:1,
            parentId:JSON.parse(sessionStorage.getItem('user')).parent
        }
    } 

    componentDidMount(){
        getSysDescribeByCondition(undefined,undefined,this.state.parentId,1,this.state.pageSize).then((res)=>{
            console.log(res);
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                loading: res.isFetching
            });
        })
    }

    onChangePage(page,pageSize){
        getSysDescribeByCondition(undefined, undefined, this.state.parentId, page, pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:page
            });
        })
    }

    onChangeFlag(){
        this.props.onChangeFlag();
    }

    /**
     * 查看详情时获取点前点击的系统id
     * @param {*} sysId 
     */
    getCurrentSysId(sysId){
        this.props.getCurrentSysId(sysId);
    }

    createCard(){
        let cards = [];
        console.log('!!!!',this.state.data)
        if(this.state.data!==[]){            
            this.state.data.map((item,index)=>{
                if(item.sysId!==0){
                    var iconName=(item.sysIconPath||"").split('/').pop();
                    console.log('iconname',url+'/icon/'+iconName)
                    cards.push(
                        <Card
                            loading={this.state.loading}
                            key={item.sysId}
                            hoverable
                            style={{width:'230px'}}
                            cover={
                                <img alt={iconName+'图标'}
                                     src={url+'/icon/'+iconName}
                                />}
                            actions={[
                                <div>
                                    <img alt={"查看详情按钮"} style={{width: 20}} src={require('../../images/look_detail_icon.png')} />
                                    <Button type="link" 
                                            onClick={()=>{this.onChangeFlag(this);this.getCurrentSysId(item.sysId)}}>
                                            <span>查看详情</span>
                                    </Button>
                                    
                                </div>
                            ]}
                        >
                            <Meta 
                                title={item.sysName}
                                description={item.sysUrl}
                            />
                        </Card>
                    )
                }
            })
        }
        if(this.state.total<=(this.state.pageSize*this.state.current)){
            cards.push(
                <Card
                    hoverable
                    key='add'
                    style={{ width: 230 }}
                    cover={
                        <img alt="增加新系统"
                            className="card_cover_img"
                            src={require('../../images/add_system_icon.png')}
                            onClick={this.setAddVisible.bind(this)}
                        />
                    }                   
                >
                    <Meta title="&nbsp;&nbsp;&nbsp;增加新系统&nbsp;&nbsp;&nbsp;" />
                </Card>
            )
        }
        return cards;
    }

    handleAdd(values, path){
        var creatorId=JSON.parse(sessionStorage.getItem('user')).id;
        addSystem(values,path,this.creatorId)
        .then((res)=>{
            if(res.result.code===201){
                message.success(res.result.msg);
                this.setAddVisible();
            } else {
                message.error(res.result.msg);
            }
        })
        .then(()=>{
            getSysDescribeByCondition(undefined, undefined, this.state.parentId, 1, this.state.pageSize).then((res)=>{
                this.setState({
                    data:res.result.data,
                    msg:res.result.msg,
                    code:res.result.code,
                    total:res.result.total,
                    loading: res.isFetching,
                    key:this.state.key+1
                });
            })
        })
    }

    setAddVisible(){
        this.setState({
            addVisible: !this.state.addVisible
        })
    }

    //搜索
    onFinish = values =>{
        console.log('values',values);
        getSysDescribeByCondition(values.sysName, values.url, this.state.parentId).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                loading: res.isFetching,
                key:this.state.key+1
            })
        })
    }

    render(){
        return(
            <div>
                <Form
                    name="search_form"
                    onFinish={this.onFinish.bind(this)}
                    onFinishFailed={onFinishFailed}
                    layout="inline"
                    className="common_search_form_frame"
                >                        
                    <Form.Item
                        label="系统名称："
                        name="sysName"
                    >
                        <Input />
                    </Form.Item>     
                    <Form.Item
                        label="网址："
                        name="url"
                    >
                        <Input />
                    </Form.Item>                 
                    <Button type="primary" htmlType="submit" className="common_button_width">
                        搜  索
                    </Button>                    
                </Form>
                <div className="card_sys_describe">
                    {this.createCard()}
                </div>
                <Pagination 
                    simple 
                    small
                    current={this.state.current}
                    pageSize={this.state.pageSize}
                    onChange={this.onChangePage.bind(this)}
                    total={this.state.total}
                    className="sys_pagination"
                />
                <AddSystemModal 
                    visible={this.state.addVisible}
                    handleAddVlaue={this.handleAdd.bind(this)}
                    setVisible={this.setAddVisible.bind(this)}
                    key={this.state.key}
                />
            </div>
         )
     }
}

export default MainPage;