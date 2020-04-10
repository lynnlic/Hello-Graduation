import React, { Component } from 'react';
import {Select} from 'antd';

export default class AddContent extends Component {

    render(){
        const options=this.props.data.map((item)=>{
            return <Option value={item.id} key={item.id}>{item.title}</Option>
        })
        return(
            <div>
                <span>内容：</span>
                <Select >
                    {options}
                </Select>
                <span>或者</span>
            </div>
        )
    }
}