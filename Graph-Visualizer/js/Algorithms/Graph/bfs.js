import { get_graph,visit } from "../../graph_helper.js"

export async function bfs(start){
    var graph = get_graph()[0];
    var q = new Array();
    var visited = new Map();
    q.push(start);
    while(q.length != 0){
        var cur = q.shift();
        visited.set(cur,1);
        await visit(cur);
        for(var ele of graph.get(cur)) {
            if(!visited.has(ele))
                await q.push(ele);
        };
    }
}