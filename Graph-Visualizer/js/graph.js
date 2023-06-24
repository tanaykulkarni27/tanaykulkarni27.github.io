import {add_edge,add_node,clear_selection, init,update_cords,clear_canvas,redeploy,clear_all,delete_node} from './graph_helper.js';
import { dfs} from './Algorithms/Graph/dfs.js';
import { bfs} from './Algorithms/Graph/bfs.js';
var node_val = 1;
var allow_add_node = false;
var allow_selection = false;
var run_algo = false;
var to_move = null;
var allow_delete = false;

var type_query = '?type=bfs';

$(document).ready(()=>{

    document.getElementById('board').style.width = (document.getElementById('navigation').offsetWidth * 0.7) + 'px';
    document.getElementById('board').style.height = (screen.height * 0.7) + 'px';
    document.getElementById('board').innerHTML += `<canvas id="canvas" width="${(screen.width * 0.7)}" height="${(screen.height * 0.7)}" ></canvas>`;

    const queryParams = new URLSearchParams(type_query)
    var graph_type = queryParams.get('type');

    document.getElementById('title').innerHTML = "Graph traversal visualizer";

});

$('#Add_node').on('click',()=>{
    run_algo = false;
    allow_selection = false;
    allow_delete = false;
    document.getElementById('Start').style.color = 'white';
    document.getElementById('Add_edge').style.color = 'white';
    document.getElementById('Delete_node').style.color = 'white';
    allow_add_node = !allow_add_node;
    document.getElementById('Add_node').style.color = 'white';
    if(allow_add_node)
        document.getElementById('Add_node').style.color = 'lightgreen';
    clear_selection();
});

$('#Start').on('click',()=>{
    run_algo = !run_algo;
    document.getElementById('Start').style.color = 'white';
    if(run_algo){
        document.getElementById('Start').style.color = 'lightgreen';    
    }
    allow_delete = false;
    allow_selection = false;
    allow_add_node = false;
    document.getElementById('Add_edge').style.color = 'white';
    document.getElementById('Add_node').style.color = 'white';
    document.getElementById('Delete_node').style.color = 'white';
    clear_selection();
});

$('#board').on('click',async (e)=>{
    if(allow_add_node){
        await add_node(node_val,e.clientX,e.clientY);
        allow_add_node = false;
        document.getElementById('Add_node').style.color = 'white';
        node_val++;
    }
});

$('#Add_edge').on('click',()=>{
    allow_delete = false;
    allow_add_node = false;
    run_algo = false;
    document.getElementById('Start').style.color = 'white';
    document.getElementById('Add_node').style.color = 'white';
    document.getElementById('Delete_node').style.color = 'white';
    
    allow_selection = !allow_selection;
    if(allow_selection){
        document.getElementById('Add_edge').style.color = 'lightgreen';
    }else{
        document.getElementById('Add_edge').style.color = 'white';
        clear_selection();
    }
});
window.selectNode = async (e)=>{
    if(run_algo){
        const queryParams = new URLSearchParams(type_query)
        var sorting_type = queryParams.get('type');
        if(sorting_type == 'dfs')
            dfs(e);
        else if(sorting_type == 'bfs')
            bfs(e);
    }
    else if(allow_selection)
        await add_edge(e);
    else if(allow_delete){
        console.log('delete called');
        await delete_node(e);
        await clear_canvas();
        // document.getElementById('board').innerHTML = '';
        node_val--;
        await redeploy();       
    }
};

$('#reset').on('click',()=>{
    allow_add_node = false;
    run_algo = false;    
    allow_selection = false;
    allow_delete = false;
    document.getElementById('Start').style.color = 'white';
    document.getElementById('Add_node').style.color = 'white';
    document.getElementById('Add_edge').style.color = 'white';
    document.getElementById('Delete_node').style.color = 'white';
    clear_selection();
    init();
});

window.onhold = (e)=>{
    to_move = e;
}
window.onmouseup = (e)=>{
    to_move = null;
}

$('#board').on('mousemove',(e)=>{
    if(to_move == null)
        return;
    if(e.clientY > document.getElementById('board').offsetTop + document.getElementById('board').offsetHeight)
        return;
    if(e.clientX > document.getElementById('board').offsetLeft + document.getElementById('board').offsetWidth)
        return;
    if(e.clientY < document.getElementById('board').offsetTop)
        return;
    if(e.clientX < document.getElementById('board').offsetLeft)
        return;

    allow_add_node = false;
    run_algo = false;    
    allow_selection = false;
    document.getElementById('Start').style.color = 'white';
    document.getElementById('Add_node').style.color = 'white';
    document.getElementById('Add_edge').style.color = 'white';
    clear_selection();
    to_move.style.top = e.clientY + 'px';
    to_move.style.left = e.clientX + 'px';
    window.getSelection().removeAllRanges(); 
    update_cords(parseInt(to_move.id),[e.clientX,e.clientY]);
    clear_canvas();
    redeploy(); 
});

$('#clear').on('click',()=>{
    clear_all();
    document.getElementById('board').innerHTML = '';
    redeploy();
    node_val = 1; 
    allow_add_node = false;
    run_algo = false;    
    allow_selection = false;
    allow_delete = false;
    document.getElementById('Start').style.color = 'white';
    document.getElementById('Add_node').style.color = 'white';
    document.getElementById('Add_edge').style.color = 'white';
    document.getElementById('Delete_node').style.color = 'white';
    clear_selection();
});

// delete
$('#Delete_node').on('click',(e)=>{
    e = document.getElementById('Delete_node');

    allow_add_node = false;
    run_algo = false;    
    allow_selection = false;
    document.getElementById('Start').style.color = 'white';
    document.getElementById('Add_node').style.color = 'white';
    document.getElementById('Add_edge').style.color = 'white';
    clear_selection();
    allow_delete = !allow_delete;
    if(allow_delete){
        e.style.color = 'lightgreen';
    }else{
        e.style.color = 'white';
    } 
});

$('#sorting_type').on('change',async (e)=>{
    type_query = "?type=" + $('#sorting_type').val();
}); 