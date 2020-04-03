import React, { Component } from 'react';
import  {Spin, Form, Input, Button, Pagination, Card } from 'antd';
import Navigation from '../../container/navigation.js';
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
        }
    } 

    onChange=(page,pageSize)=>{
        this.props.onChangePage(page,pageSize);
    }

    onChangeFlag(){
        this.props.onChangeFlag();
    }

    getCurrentSysId(sysId){
        this.props.getCurrentSysId(sysId);
    }

    createCard(){
        let cards = [];
        if(this.props.data!=[]){            
            this.props.data.map((item,index)=>{
                if(item.sysId!==0){
                    var iconName=(item.sysIconPath||"").split('\\').pop();
                    var path='../../images/'+(iconName===''?'unset_icon.png':iconName);
                    cards.push(
                        <Card
                            key={item.sysId}
                            hoverable
                            style={{width:'230px'}}
                            cover={
                                <img alter={iconName+'图标'}
                                     className="card_cover_img"
                                     src={require('../../images/'+(iconName===''?'unset_icon.png':iconName))}
                                />}
                            actions={[
                                <div>
                                    <img style={{width: 20}} src={require('../../images/look_detail_icon.png')} />
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
        if(this.props.total<=(this.props.pageSize*this.props.current)){
            cards.push(
                <Card
                    hoverable
                    style={{ width: 230 }}
                    cover={
                        <img alter="增加新系统"
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
                    current={this.props.current}
                    pageSize={this.props.pageSize}
                    onChange={this.onChange}
                    total={this.props.total}
                    className="sys_pagination"
                />
            </div>
         )
     }
}

export default MainPage;