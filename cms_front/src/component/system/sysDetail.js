import React, { Component } from 'react';
import {Form, Input, Button, PageHeader, Table,Divider, Tree} from 'antd';
require('../../common.less');
require('./system.less');

class SysDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {

        }
    }

    onChangeFlag(){
        this.props.onChangeFlag();
    }

    render(){
        console.log('detail',this.props.sysId)
        const columns = [
            {
              title: '系统名称',
              dataIndex: 'sysName',
              key: 'sysName',
            },
            {
              title: '网址',
              dataIndex: 'sysUrl',
              key: 'sysUrl',
            },
            {
              title: '存储名',
              dataIndex: 'sysSaveName',
              key: 'sysSaveName',
            },
            {
              title: '版权',
              key: 'sysCopyRight',
              dataIndex: 'sysCopyRight',
            },
            {
                title: '联系电话',
                key: 'sysPhone',
                dataIndex: 'sysPhone',
              },
              {
                title: '联系邮箱',
                key: 'sysEmail',
                dataIndex: 'sysEmail',
              },
            {
              title: '创建时间',
              key: 'sysCreateTime',
              dataIndex:'sysCreateTime'
            },
          ];
        return(
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={this.onChangeFlag.bind(this)}
                    title="返回"
                />
                <div className="common_table_frame">
                    <Table 
                        bordered 
                        columns={columns} 
                        dataSource={this.props.detailData?this.props.detailData:[]}
                        pagination={false}
                    />  
                </div>
                <Divider style={{backgroundColor:'#17cccc'}} />
                <Tree 
                    ///treeData={treeData}
                />
            </div>
        )
    }
}

export default SysDetail;