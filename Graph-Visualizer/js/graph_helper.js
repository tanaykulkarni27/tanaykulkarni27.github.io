import {get_goood_cords} from './geometry.js';

var graph = new Map();
var selected = [];
var values = [];

var node_cords = [];

export function clear_selection(){
    selected = [];
}
async function deploy(cords){
    var canvas = document.getElementById('canvas');// await get_canvas(x,y,width,height);
    document.getElementById('board').appendChild(canvas);
    canvas = canvas.getContext('2d');
    canvas.strokeStyle = '#182c40';
    canvas.beginPath();
    
    canvas.moveTo(cords[0][0],cords[0][1]);
    canvas.lineTo(cords[1][0],cords[1][1]);
    canvas.stroke();
}
function get_node(val,x,y){
    var node = document.createElement('div');
    node.setAttribute("onclick","selectNode(this)");
    node.setAttribute("onmousedown","onhold(this)");
    node.setAttribute("onmouse","leave_node(this)");
    node.id = val;
    node.className = 'node';
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.innerHTML = val;

    node_cords.push([x,y]);

    return node;
}

export async function add_node(node_val,x,y){
    var new_node = get_node(node_val,x,y);
    document.getElementById('board').appendChild(new_node);
    graph.set(new_node,new Set());
    values.push(new_node);
    return true;
}   
export async function add_edge(ele){
    selected.push(ele);
    if(selected.length == 2){
        if(!graph.get(selected[0]).has(selected[1])){
            graph.set(selected[0],graph.get(selected[0]).add(selected[1]));
            graph.set(selected[1],graph.get(selected[1]).add(selected[0]));
        }
        else{
            selected = [];
            return;
        }
        var good_cord = await get_goood_cords(selected[0],selected[1]);
        var x = document.getElementById('board').offsetLeft;
        var y =  document.getElementById('board').offsetTop;
        for(var i in good_cord){
            good_cord[i] = [good_cord[i][0] - x,good_cord[i][1] - y];
        }
        await deploy(good_cord);
        selected.shift();
        
        
    }
}

export function get_graph(){
    return [graph,values];
}

export async function visit(ele){
    ele.style.backgroundColor = 'rgb(185, 45, 185)';
    ele.style.color = 'white';
    await delay(1000);
    ele.style.backgroundColor = 'lightgreen';
    ele.style.color = '#182c40';
    
}

export function delay(ms){
    return new Promise(resolve=>{
        setTimeout(()=>{resolve('');},ms)
    })
}

export async function init(){
    for(var i in values){
        values[i].style.backgroundColor = 'cyan';
    }
}

export async function already_visited(ele){
    ele.style.backgroundColor = 'red';
    ele.style.color = 'white';
    await delay(1000);
    ele.style.backgroundColor = 'lightgreen';
    ele.style.color = '#182c40';
}

export function update_cords(idx,new_cords){
    node_cords[idx] = new_cords;
}


export function clear_canvas(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.clientWidth,canvas.height);
}

export async function redeploy(){
    var visited = new Map();
    for(var i in values){
        if(visited.has(values[i]))
            continue;
        var q = new Array();
        q.push([values[i],null])
        while(q.length != 0){
            var cur = q.shift();
            visited.set(cur[0],1);
            if(cur[1] != null){
                var good_cord = await get_goood_cords(cur[0],cur[1]);
                var x = document.getElementById('board').offsetLeft;
                var y =  document.getElementById('board').offsetTop;
                for(var i in good_cord){
                    good_cord[i] = [good_cord[i][0] - x,good_cord[i][1] - y];
                }
                await deploy(good_cord);
            }
            for(var i of graph.get(cur[0])){
                if(!visited.has(i)){
                    q.push([i,cur[0]]);
                }
            }
        }
    }  
}

export function clear_all(){
    graph = new Map();
    values = [];
    selected = [];
    node_cords = [];
}

export async function delete_node(node){
    for(var i in values){
        var tmp = graph.get(values[i]);
        tmp.delete(node);
        graph.set(values[i],tmp);
    }
    graph.delete(node);
    var node_val = parseInt(node.id);
    node_val--;
    
    // console.log('debug : ',values,'\ndebug : ',node_cords[0],node_cords[1]);
    for(var i = node_val;i + 1 < values.length;i++){
        var tmp = values[i];
        values[i] = values[i + 1];
        values[i + 1] = tmp;

        tmp = node_cords[i];
        node_cords[i] = node_cords[i + 1];
        node_cords[i + 1] = tmp;
    }
    values.pop();
    node_cords.pop();
    node_val++;
    node.remove();
    for(var i of values){
        if(parseInt(i.id) >node_val){
            i.id = parseInt(i.id) - 1;
            i.innerHTML = i.id;
        }
    }
}