import React, { Component } from 'react';
import {Card, Pagination} from 'antd';
import {ZoomInOutlined} from '@ant-design/icons';
import Navigation from '../../container/navigation.js';
import {getSysDescribe} from '../../action/systemAction.js';
require('../../common.less');
require('./system.less');

const { Meta } = Card;

class System extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data:[],
            current:1,
            pageSize:6,
            total:0
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

    onChange=(page,pageSize)=>{
        console.log('page',page,'pageSize',pageSize);
        getSysDescribe(page,pageSize).then((res)=>{
            this.setState({
                data:res.result.data,
                msg:res.result.msg,
                code:res.result.code,
                total:res.result.total,
                current:page
            })
        });
    }

    createCard(){
        let cards = [];
        if(this.state.data!=[]){
            
            this.state.data.map((item,index)=>{
                console.log('item',item);
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
                                    <span>查看详情</span>
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
        return cards;
    }

    render(){
        return (
            <div className="common_content_frame">
                <Navigation 
                    text="生成系统管理"
                />
                <div className="card_sys_describe">
                    {this.createCard()}
                </div>
                <Pagination 
                    simple 
                    small
                    current={this.state.current}
                    pageSize={this.state.pageSize}
                    onChange={this.onChange}
                    total={this.state.total}
                    className="sys_pagination"
                />
            </div>
        )
    }
}

export default System;