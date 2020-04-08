import React, { Component } from 'react';
import Navigation from '../../container/navigation.js';
import MainPage from './mainPage.js';
import SysDetail from './sysDetail.js';
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
            sysId:0,
            pages:[],
            sites:[],
        }
    } 

    onChangeFlag(){
        this.setState({
            flag:!this.state.flag
        })
    }

    getCurrentSysId(sysId){
        this.setState({
            sysId:sysId
        })
    }

    render(){
        return (
            <div className="common_content_frame">
                <Navigation 
                    text="生成系统管理"
                />
                 {this.state.flag?
                    <MainPage 
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