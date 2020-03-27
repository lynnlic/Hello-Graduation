import React, { Component } from 'react';
import { Divider } from 'antd';
import {PushpinOutlined} from '@ant-design/icons';

require('./container.less');

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:""
        }
    }

    render(){
        return(
            <div className='navigation_frame'>
                <PushpinOutlined /><span>{this.props.text}</span>
                <Divider style={{margin:'0 0', backgroundColor:'#17cccc'}} />
            </div>
        )
    }

}

export default Navigation;