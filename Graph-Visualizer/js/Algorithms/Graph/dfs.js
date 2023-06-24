import {get_graph,visit,init,already_visited} from "../../graph_helper.js";
var graph = null;
export async function dfs(start_node){
    await init();
    var detailed = get_graph();
    graph = detailed[0];
    console.log(graph);
    console.log(detailed[1]);
    var visited = new Map();
    await dfs_helper(start_node,visited);
}
async function dfs_helper(cur_node,visited){
    var stack = new Array();
    stack.push(cur_node);
    while(stack.length != 0){
        var cur = stack.pop();
        visited.set(cur,1);
        await visit(cur);
        for(var ele of graph.get(cur)) {
            if(!visited.has(ele))
                await stack.push(ele);
        };
    }
}