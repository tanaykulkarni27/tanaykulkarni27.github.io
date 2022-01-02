var snake = 0;
var directs = [[0,1],[0,-1],[-1,0],[1,0]];
var food_cords = new Array();
var typ = -1;
var ff = [0,0];
var score = 0;
var state = new Map();
function get_random_index(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
	// console.log([min,max]);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 
function generate_food(){
	typ = get_random_index(0,1);
	if(typ == 0){
		var index = get_random_index(parseInt(0),parseInt(parseInt(food_cords.length) - parseInt(1)));
		var x = food_cords[index][0];
		var y = food_cords[index][1];
		document.getElementById(x+':'+y).className = 'food';
		document.getElementById(x+':'+y).innerHTML = '<p style="color:white;backgorund-color:red;">R</p>';
		ff = [x,y];
		return;
	}
	var index = get_random_index(parseInt(0),parseInt(parseInt(food_cords.length) - parseInt(1)));
	var x = food_cords[index][0];
	var y = food_cords[index][1];
	document.getElementById(x+':'+y).className = 'food';
	document.getElementById(x+':'+y).innerHTML = '<p style="color:white;backgorund-color:red;">F</p>';
	ff = [x,y];
}
class __Snake{
	constructor(x,y){
		x = parseInt(x);
		y = parseInt(y);
		this.a = [[x,y]];
		this.tail = [x,y];
		this.len = 1;
	}
	add_node(){
		var x = this.tail[0];
		var y = this.tail[1];
		var i = 0;
		while(i < 4){
			var tmp_x = x + parseInt(directs[i]);
			var tmp_y = y + parseInt(directs[i]);
			if(tmp_x < 0 || tmp_y < 0 || tmp_x >= 10 || tmp_y >= 10)
				continue;
			if(this.a.indexOf([x,y]) == -1){
				x = tmp_x;
				y = tmp_y;
				break;
			}
			i++;
		}
		state.set(x+":"+y,1)
		this.a.push([x,y]);
		food_cords.splice(food_cords.indexOf([x,y]),1);	
		this.tail = [x,y];
		document.getElementById(x+':'+y).className = 'snake_body';
		this.len+= 1;
	}
	async move(direction){
		var x = this.a[0][0] + directs[direction][0];
		var y = this.a[0][1] + directs[direction][1];
		if(x < 0 || y < 0){
			alert("GAME OVER");
			location.reload();
		}
		if(x >= 10 || y >= 10){
			alert("GAME OVER");
			location.reload();	
		}
		if(state.has(x+":"+y)){
			alert("GAME OVER");
			location.reload();
		}
		document.getElementById(x+":"+y).className = 'snake_body';
		document.getElementById(this.a[this.len - 1][0]+":"+this.a[this.len - 1][1]).className = 'cell';
		food_cords.push(this.a[this.len - 1]);
		state.delete(this.a[this.len - 1][0]+":"+this.a[this.len - 1][1]);
		state.set(x+":"+y,1);
		this.a.pop();
		this.a.unshift([x,y]);
		this.tail = this.a[this.len - 1];
		food_cords.splice(food_cords.indexOf([x,y]),1);
		if(x == ff[0] && y == ff[1] && typ == 0){
			document.getElementById(x+":"+y).innerHTML = '';
			generate_food();
			document.getElementById(x+":"+y).className = 'snake_body';
			this.a.reverse();
		}
		else if(x == ff[0] && y == ff[1]){
			score++;
			document.getElementById('score').innerHTML = 'Score '+score;
			this.add_node();
			document.getElementById(x+":"+y).innerHTML = '';
			generate_food();
			document.getElementById(x+":"+y).className = 'snake_body';
		}
	}
}
function cell(id){
	return '<div id = "'+id+'" class="cell"></div>';;
}
document.addEventListener('keypress', (e)=>{
	if(e.keyCode == 97)
		snake.move(1);
	else if(e.keyCode == 100)
		snake.move(0);
	else if(e.keyCode == 115)
		snake.move(3);
	else if(e.keyCode == 119)
		snake.move(2);
});
function load(){
	var to_put = '';
	var i = 0;
	while(i < 10){
		var j = 0;
		while(j < 10){
			to_put += cell(i+':'+j);
			food_cords.push([i,j]);
			j++;
		}
		i++;
	}
	document.getElementById('board').innerHTML = to_put;
	document.getElementById('board').focus = true;
	document.getElementById('5:5').className = "snake_body";
	document.getElementById('0:0').className = "food";
	snake = new __Snake(5,5);
	state['5:5'] = 1;
	food_cords.splice(food_cords.indexOf([5,5]),1);
	generate_food();
	
}