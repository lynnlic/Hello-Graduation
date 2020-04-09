import React, { Component } from 'react';
import {Select, Table,Divider, Tree} from 'antd';
import Navigation from '../../container/navigation.js';
require('../../common.less');
require('./createPage.less');

class CreatePage extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    handleChange(value, key){
        console.log(value,'....',key)
    }

    handleSelect(value, key){
        console.log(',,,',value,'....',key)
    }

    render(){
        const sysInfo=JSON.parse(localStorage.getItem('sysName'));
        const options=sysInfo.map((item, index)=>{
            return <Option value={item.sysName} key={item.sysId}>{item.sysName}</Option>
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
                            style={{ width: 200 }}
                            placeholder="选择系统"
                            optionFilterProp="children"
                            onSelect={this.handleSelect.bind(this)}
                            /*
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}*/
                        >
                            {options}
                        </Select>
                    </div>
                    <Divider type="vertical" key='divider' style={{backgroundColor:'#17cccc',height:'100%'}} />
                    <div className='right'></div>
                </div>
            </div>
        )
    }
}

export default CreatePage;