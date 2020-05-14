export function transformTreeData(sites,pages){
    //debugger
    var siteTree = [];
    sites.map((item, index)=>{
        siteTree.push({title:item.siteName,key:index,children:[],selectable: false});
    })
    for(var page of pages){
        var position=0;
        siteTree.map((item,index)=>{
            if(item.title===page.siteName) position=index;
        })
        if(siteTree[position]){
            siteTree[position].children.push({
                title:page.pageName,
                key:page.pageId,
                state:page.state
                //icon:page.state!=1?<img src='../images/dot.png'/>:''
            })
        }        
    }
    sessionStorage.setItem('treeInfo',JSON.stringify(siteTree));
    return siteTree;
}