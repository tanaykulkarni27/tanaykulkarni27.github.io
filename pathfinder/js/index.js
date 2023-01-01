var status = 0;
var ls_chg = 0;
function waitforme(ms)  {
	return new Promise( resolve => {
	    setTimeout(()=> {resolve('')} ,ms );
	});
}
async function getNodes(){
	return new Promise((arr)=>{
		targets = new Array(3);
		for(var i = 0;i < 15;i++){
			for(var j = 0;j < 50;j++){
				var cs = document.getElementById(i+':'+j).className;
				if(cs == 'start' || cs == 'Spath'){
					targets[0] = [i,j];
					document.getElementById(i+':'+j).className = 'start';
				}
				else if(cs == 'end' || cs == 'Epath'){
					targets[2] = [i,j];
					document.getElementById(i+':'+j).className = 'end';
				}else if(cs == 'weigh'  || cs == 'Wpath'){
					targets[1] = [i,j];
					document.getElementById(i+':'+j).className = 'weigh';
				}else if(cs != 'wall'){
					document.getElementById(i+":"+j).className = 'cell';
				}
			}
		}	
		visit = new Array(15);
		for(var i = 0;i < 15;i++){
			visit[i] = new Array(50);
			visit[i].fill(0);
		}
		visited = new Array(15);
		for(var i = 0;i < 15;i++){
			visited[i] = new Array(50);
			visited[i].fill(0);
		}
		arr(targets);
	});
}
async function BFS(should_i){
		var path = new Map();
		getNodes().then(async (targets)=>{
			var q = [[targets[0][0],targets[0][1]]]
			var found = -1;
			//~ var visit = new Map();
			while(q.length != 0){
				var x = q[0][0];
				var y = q[0][1];
				visit[x][y] = 1;
				var xid = x+":"+y;
				if(document.getElementById(xid).className == 'weigh'){ found = 1;break;}
				q.shift();
				var offset = [[0,1],[0,-1],[1,0],[-1,0]];
				for(var i in offset){
					var tmpx = parseInt(x) + parseInt(offset[i][0])
					var tmpy = parseInt(y) + parseInt(offset[i][1])
					var iid = tmpx+":"+tmpy;
					if(tmpx < 0 || tmpx >= 15 || tmpy < 0 || tmpy > 49){
						continue;
					}else if(visit[tmpx][tmpy] == 1 || document.getElementById(iid).className == "wall"){ 	continue; }
					else{
						path[iid] = xid;
						visit[tmpx][tmpy] = 1;
						q.push([tmpx,tmpy]);
						if(document.getElementById(iid).className == 'cell'){
							if(should_i == 0)
								await waitforme(25);			
							document.getElementById(iid).className = "visited_cell";
						}	
					}					
				}
			}	
			
			if(found == -1){
				return;
			}
			var found = -1;
			var q = [[targets[2][0],targets[2][1]]];
			var path_2 = new Map();
			while(q.length > 0){
				var x = q[0][0];
				var y = q[0][1];
				q.shift();
				var xid = x+":"+y
				if(document.getElementById(xid).className == "weigh"){ found = 1;break; }
				var offset = [[0,1],[0,-1],[1,0],[-1,0]];
				for(var i in offset){
					var tmpx = x + offset[i][0];
					var tmpy = y + offset[i][1];
					var iid = tmpx+":"+tmpy;
					if(tmpx > 14 || tmpx < 0 || tmpy > 49 || tmpy < 0)
						continue;
					if(visited[tmpx][tmpy] == 1 || document.getElementById(iid).className == "wall") 
						continue;
					path_2[iid] = xid;
					visited[tmpx][tmpy] = 1;
					q.push([tmpx,tmpy]);
					if(document.getElementById(iid).className == 'cell'){
						if(should_i == 0)
							await waitforme(25);			
						document.getElementById(iid).className = "visited_cell";
					}
				}
			}
			if(found == -1)
				return;
			var act = new Array();
			var tmp = targets[1][0]+":"+targets[1][1];
			while(tmp != targets[0][0]+":"+targets[0][1]){
				act.push(tmp);
				tmp = path[tmp];
				//~ alert(tmp);
			}
			act = act.reverse();
			for(var i in act){
				if(should_i == 0)
					await waitforme(30);
				if(document.getElementById(act[i]).className == "weigh"){
					document.getElementById(act[i]).className = "Wpath";
				}else if(document.getElementById(act[i]).className == "start"){
					document.getElementById(act[i]).className == "Spath"
				}
				else if(document.getElementById(act[i]).className == "weigh"){
					document.getElementById(act[i]).className == "Wpath"
				}
				else if(document.getElementById(act[i]).className == "end"){
					document.getElementById(act[i]).className == "Epath"
				}
				else{
					document.getElementById(act[i]).className = "path";
				}
			}
			document.getElementById(tmp).className = "Spath";
			var tmp  = targets[1][0]+":"+targets[1][1];
			while(tmp != targets[2][0]+":"+targets[2][1]){
				if(should_i == 0)
					await waitforme(30);
				if(document.getElementById(tmp).className == 'Spath')
					document.getElementById(tmp).className = 'Spath';
				else if(document.getElementById(tmp).className == 'Wpath')
					document.getElementById(tmp).className = 'Wpath';
				else if(document.getElementById(tmp).className == 'Epath')
					document.getElementById(tmp).className = 'Epath';
				else
					document.getElementById(tmp).className = 'path';
				tmp = path_2[tmp];
			}			
			document.getElementById(tmp).className = 'Epath';
			ls_chg = 1;
	});	
	
}
function change_type(current){
	if(status == 0)
		return;
	if(status == 1 && (current.className != 'cell' && current.className != 'visited_cell' && current.className != 'path'))
		return;
	if(status == 2 && (current.className != 'cell' && current.className != 'visited_cell' && current.className != 'path'))
		return;
	if(status == 3 && (current.className != 'cell' && current.className != 'visited_cell' && current.className != 'path'))
		return;
	if(status == 4 && (current.className == 'cell' || current.className == 'visited_cell' || current.className == 'path')){
		current.className = 'wall';
		return;
	}
	if(status == 4 && current.className == 'wall'){
		current.className = 'cell';
		return;
	}
	for(var i = 0;i < 15;i++){
		for(var j = 0;j < 50;j++){
			if(status == 1){
				if(document.getElementById(i+":"+j).className == "start" || document.getElementById(i+":"+j).className == "Spath"){
					document.getElementById(i+":"+j).className = 'cell';
					document.getElementById(i+":"+j).innerHTML = '';
					current.className = 'start';
					if(ls_chg == 1)
						BFS(ls_chg);
					return;
				}	
			}else if(status == 2){
				if(document.getElementById(i+":"+j).className == "end" || document.getElementById(i+":"+j).className == "Epath"){
					document.getElementById(i+":"+j).className = 'cell';
					document.getElementById(i+":"+j).innerHTML = '';
					current.className = 'end';
					if(ls_chg == 1)
						BFS(ls_chg);
					return;
				}	
			}
			else if(status == 3){
				if(document.getElementById(i+":"+j).className == "weigh" || document.getElementById(i+":"+j).className == "Wpath"){
					document.getElementById(i+":"+j).innerHTML = '';
					document.getElementById(i+":"+j).className = 'cell';
					current.className = 'weigh';
					if(ls_chg == 1)
						BFS(ls_chg);
					return;
				}	
			}
		}
	}
}
function chg(i){
	if(status != 0){
		status = 0;
		return;
	}
	if(i.className === 'start' || i.className === 'Spath')
		status = 1;
	else if(i.className === 'end' || i.className === 'Epath')
			status = 2;
	else if(i.className === 'weigh' || i.className === 'Wpath')
		status = 3;
	else{
		status = 4;
	}
}
function load(){
	document.getElementById('x').click();
	var to_put = "";
	for(var i = 0;i < 15;i++){
		for(var j = 0;j < 50;j++){
			var iid = i+":"+j;
			if(i == 0 && j == 0)
				to_put += '<button id="'+iid+'" onclick="chg(this)" onmouseover="change_type(this)" class="start"></button>';	
			else if(i == 5 && j == 13)
				to_put += '<button id="'+iid+'" onclick="chg(this)" onmouseover="change_type(this)" class="weigh"></button>';	
			else if(i == 14 && j == 39)
				to_put += '<button id="'+iid+'" onclick="chg(this)" onmouseover="change_type(this)" class="end"></button>';	
			else
				to_put += '<button id="'+iid+'" onclick="chg(this)" onmouseover="change_type(this)" class="cell"></button>';	
		}
	}
	document.getElementById("row").innerHTML = to_put;
}

function load_tutorial(){
	document.getElementById('x').click();
	document.getElementById('what is').style.display = 'block';
	document.getElementById('howto').style.display = 'none';
}