export function transformTreeData(sites,pages){
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
    localStorage.setItem('treeInfo',JSON.stringify(siteTree));
    return siteTree;
}