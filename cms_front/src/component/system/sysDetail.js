import React, { Component } from 'react';
import {PageHeader, Table,Divider, Tree} from 'antd';
import {getSysDetail, getPagesBySysid} from '../../action/systemAction.js';
require('../../common.less');
require('./system.less');

class SysDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            current:1,
            pageSize:5,
            tableData:[],
            detailData:[],
            sysId:0,
            sites:[],
            pages:[],
            total:0,
            selectedKeys:[]
        }
    }

    componentDidMount(){
        console.log('sysid',this.props.sysId)
        getSysDetail(this.props.sysId).then((res)=>{
            this.setState({
                detailData:res.result.data,
                sysId:this.props.sysId
            })
        }).then(
            getPagesBySysid(this.props.sysId).then((res)=>{
                this.setState({
                    sites:res.result.data[0],
                    pages:res.result.data[1],
                    tableData:res.result.data[1],
                    total:res.result.data[1].length
                })
            })
        )
    }

    onChangeFlag(){
        this.props.onChangeFlag();
    }

    transformTreeData(sites,pages){
        var siteTree = [];
        sites.map((item, index)=>{
            siteTree.push({title:item,key:index,children:[],selectable: false});
        })
        for(var page of pages){
            var position=0;
            siteTree.map((item,index)=>{
                if(item.title===page.siteName) position=index;
            })
            siteTree[position].children.push({title:page.pageName,key:page.pageId})
        }
        localStorage.setItem('treeInfo',siteTree);
        return siteTree;
    }

    onSelect=(selectedKeys,e)=>{
        var temp=[];
        if(selectedKeys.length!==0){
            for(var key of selectedKeys){
                var tempTableData=[];
                this.state.pages.map((item,index)=>{
                    if(key===item.pageId){
                        tempTableData=item;
                    } 
                })
                temp.push(tempTableData)
            }
            this.setState({
                tableData:temp,
                current:1,
                total:selectedKeys.length,
                selectedKeys:selectedKeys,
                copytableData:temp
            })
        } else {
            this.setState({
                tableData:this.state.pages,
                copytableData:this.state.pages,
                current:1,
                total:this.state.pages.length,
                selectedKeys:[]
            })
        }
    }

    onChangePage=(page,pageSize)=>{
        let tableData=[];
        if(this.state.selectedKeys.length>0){
            tableData=this.state.copytableData.slice((page-1)*pageSize,page*pageSize);
        } else {
            tableData=this.state.pages.slice((page-1)*pageSize,page*pageSize);
        }        
        this.setState({
            current:page,
            tableData:tableData
        })
    }

    render(){        
        const treeData=this.transformTreeData(this.state.sites,this.state.pages);
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
            }
          ];

          const pageColumns=[{
            title:'序号',
            key:'id',
            dataIndex:'id',
            render:(text,record,index)=>{
                return index+1;
                }
            },{
                title:'页面名称',
                key:'pageName',
                dataIndex:'pageName'
            },{
                title:'所属站点',
                key:'siteName',
                dataIndex:'siteName'
            },{
                title:'存放位置',
                key:'pagePath',
                dataIndex:'pagePath'
            },{
                title:'创建时间',
                key:'createTime',
                dataIndex:'createTime'
            }];
            const pagination={
                simple: true,
                total: this.state.total,
                size:'small',
                onChange: this.onChangePage,
                current: this.state.current,
                pageSize: this.state.pageSize
            }

        return(
            <div className="sys_detail_frame">
                <PageHeader
                    className="site-page-header"
                    onBack={this.onChangeFlag.bind(this)}
                    title="返回"
                    key='pageHeader'
                />
                <div className="common_table_frame">
                    <Table 
                        bordered 
                        columns={columns} 
                        dataSource={this.state.detailData?this.state.detailData:[]}
                        pagination={false}
                        key='detailTable'
                    />  
                </div>
                <Divider key='divider1' style={{backgroundColor:'#17cccc'}} />
                <div className="sys_tree_line_frame">
                    <Tree 
                        treeData={treeData}
                        className="system_tree_frame"
                        onSelect={this.onSelect.bind(this)}
                        multiple={true}
                        key='pageTree'
                    />
                    <Divider key='divider2' style={{backgroundColor:'#17cccc',height:'100%'}}  type="vertical" />
                    <div className="sys_pages_table">
                        <Table 
                            bordered
                            columns={pageColumns}
                            dataSource={this.state.tableData}
                            pagination={pagination}
                            key='pageTable'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default SysDetail;