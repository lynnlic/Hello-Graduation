import React, { Component } from 'react';
import {Card, Pagination,Form, Input, Button} from 'antd';
import {ZoomInOutlined} from '@ant-design/icons';
import Navigation from '../../container/navigation.js';
import MainPage from './mainPage.js';
import SysDetail from './sysDetail.js';
import {getSysDescribe, getSysDetail, getPagesBySysid} from '../../action/systemAction.js';
require('../../common.less');
require('./system.less');

class System extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data:[],
            detailData:[],
            current:1,
            pageSize:6,
            total:0,
            flag:true,//true:主界面 false：查看详情页
            sysId:0
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

    shouldComponentUpdate(nextProps, nextState){
        console.log('nextState',nextState)
        if((nextState.detailData.length!=this.state.detailData.length)||(nextState.data.length!=this.state.data.length)){
            return true;
        }
        return false;
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
        this.setState({
            flag:!this.state.flag,
            detailData:[]
        })
    }

    getCurrentSysId(sysId){
        getSysDetail(sysId).then((res)=>{
            this.setState({
                detailData:res.result.data,
                sysId:sysId
            })
        }).then(
            getPagesBySysid(sysId).then((res)=>{
                console.log(',,,,',res)
                this.setState({
                    pages:this.result.data
                })
            })
        )
        
    }

    
    render(){
        return (
            <div className="common_content_frame">
                <Navigation 
                    text="生成系统管理"
                />
                {this.state.flag?
                    <MainPage 
                        data={this.state.data}
                        msg={this.state.msg}
                        current={this.state.current}
                        total={this.state.total} 
                        pageSize={this.state.pageSize}   
                        onChangePage={this.onChangePage.bind(this)}
                        onChangeFlag={this.onChangeFlag.bind(this)}
                        getCurrentSysId={this.getCurrentSysId.bind(this)}
                    />
                    :
                    <SysDetail 
                        onChangeFlag={this.onChangeFlag.bind(this)}
                        detailData={this.state.detailData}
                        sysId={this.state.sysId}
                    />}
            </div>
        )
    }
}

export default System;