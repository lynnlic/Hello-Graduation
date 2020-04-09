import React, { Component } from 'react';
import  { Form, Input, Button, Pagination, Card } from 'antd';
import {getSysDescribe} from '../../action/systemAction.js';
require('../../common.less');
require('./system.less');

const { Meta } = Card;

const onFinish = values =>{
    console.log('values',values);
}

const onFinishFailed=null;

class MainPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data:[],
            total:0,
            current:1,
            pageSize:6,
        }
    } 

    componentDidMount(){
        getSysDescribe(this.state.current,this.state.pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total
            });
        })
    }

    onChangePage(page,pageSize){
        getSysDescribe(page,pageSize).then((res)=>{
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

    getCurrentSysId(sysId){
        this.props.getCurrentSysId(sysId);
    }


    createCard(){
        let cards = [];
        if(this.state.data!==[]){            
            this.state.data.map((item,index)=>{
                if(item.sysId!==0){
                    var iconName=(item.sysIconPath||"").split('\\').pop();
                    cards.push(
                        <Card
                            key={item.sysId}
                            hoverable
                            style={{width:'230px'}}
                            cover={
                                <img alt={iconName+'图标'}
                                     className="card_cover_img"
                                     src={require('../../images/'+(iconName===''?'unset_icon.png':iconName))}
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
                        />
                    }
                >
                    <Meta title="&nbsp;&nbsp;&nbsp;增加新系统&nbsp;&nbsp;&nbsp;" />
                </Card>
            )
        }
        return cards;
    }


     render(){
         
         return(
            <div>
                <Form
                        name="search_form"
                        onFinish={onFinish}
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
            </div>
         )
     }
}

export default MainPage;