var speed  = [650, 640, 630, 620, 610, 600, 590, 580, 570, 560, 550, 540, 530, 520, 510, 500, 490, 480, 470, 460, 450, 440, 430, 420, 410, 400, 390, 380, 370, 360, 350, 340, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
var ARR = [];
function getRandomNUM(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function waitforme(ms)  {
	return new Promise( resolve => {
	    setTimeout(()=> {resolve('')} ,ms );
	});
}

// Quick sort start

async function quick_sort(l,r){
	if(r<=l)
		return;
	document.getElementById(r).style.backgroundColor = "pink"; // old position of pivot	
	var pivot = ARR[r];
	var i = l-1;
	for(let j = l;j<r;j++){
		await waitforme(speed[ARR.length-5]);
			document.getElementById(j).style.backgroundColor = "blue";
		if(ARR[j] < pivot){
			i++;
				if(i != j){
				await waitforme(speed[ARR.length-5]+50);
					document.getElementById(i).style.backgroundColor = "orange"; // small element than pivot
				await waitforme(speed[ARR.length-5]+50);
					document.getElementById(j).style.backgroundColor = "yellow";   // ORIGINL PLACE small element than pivot
				}
			var tmp = ARR[i];
			document.getElementById(i).style.height = ARR[j]+"px";
			document.getElementById(j).style.height = ARR[i]+"px";			
			ARR[i] = ARR[j];
			ARR[j] = tmp;
			if(ARR.length < 37){
				document.getElementById(i).innerHTML = ARR[i];
				document.getElementById(j).innerHTML = ARR[j];			
			}
			await waitforme(speed[ARR.length-5]);
			document.getElementById(i).style.backgroundColor = "cyan";
//			await waitforme(speed[ARR.length-5]);
	//		document.getElementById(j).style.backgroundColor = "cyan";
		}
		await waitforme(speed[ARR.length-5]);
			document.getElementById(j).style.backgroundColor = "cyan";
	}
	var j = r;
	i+=1;
	await waitforme(speed[ARR.length-5]);	
	document.getElementById(i).style.backgroundColor = "#8cff66"; // new position of pivot
//	await waitforme(100);			

	document.getElementById(r).style.height = ARR[i]+"px"; 
	document.getElementById(i).style.height = ARR[r]+"px"; 
	await waitforme(speed[ARR.length-5]);		
    document.getElementById(i).style.backgroundColor = "cyan";
	document.getElementById(j).style.backgroundColor = "cyan";		
	var tmp = ARR[i];
	ARR[i] = ARR[r];
	ARR[r] = tmp;
	if(ARR.length < 37){
		document.getElementById(i).innerHTML = ARR[i];
		document.getElementById(j).innerHTML = ARR[j];			
	}
	
	var p = i;
	await quick_sort(l,p-1);
	await quick_sort(p+1,r);	   		
}
function quicksort(){
	quick_sort(0,ARR.length-1);
}
function pp(){
	console.log(ARR);
	for(let i = 0;i<ARR.length;i++){
		document.getElementById(i).style.height = ARR[i]+"px";
	}			
}
// Quick sort end
// selection sort start
async function selection_sort(){
	for(let i = 0;i<ARR.length;i++){
		var small = i;
		await waitforme(100);		
		document.getElementById(i).style.backgroundColor = "#8cff66";
		for(let j =i+1;j<ARR.length;j++){
			document.getElementById(j).style.backgroundColor = "blue";
			if(ARR[small] > ARR[j]){
			await waitforme(speed[ARR.length-5]+50);
					await waitforme(speed[ARR.length-5]);
					document.getElementById(j).style.backgroundColor = "orange";
					await waitforme(speed[ARR.length-5]);
					if(small != i)
						document.getElementById(small).style.backgroundColor = "cyan";
					small = j;
			}
			await waitforme(speed[ARR.length-5]);
			document.getElementById(j).style.backgroundColor = "cyan";
		}
		var tmp = ARR[small];
		ARR[small] = ARR[i];
		ARR[i] = tmp; 
		if(small != i){
				await waitforme(speed[ARR.length-5]);
					document.getElementById(i).style.backgroundColor = "red";
					document.getElementById(small).style.backgroundColor = "red";
				await waitforme(speed[ARR.length-5]);
					document.getElementById(small).style.height = ARR[small]+"px";
					document.getElementById(i).style.height = ARR[i]+"px";

				await waitforme(speed[ARR.length-5]);
					document.getElementById(small).style.backgroundColor = "#8cff66";
					document.getElementById(i).style.backgroundColor = "#8cff66";
					document.getElementById(small).style.backgroundColor = "cyan";
					document.getElementById(i).style.backgroundColor = "cyan";
		}
		document.getElementById(small).style.backgroundColor = "cyan";
		document.getElementById(i).style.backgroundColor = "cyan";
		if(ARR.length < 37){
			document.getElementById(small).innerHTML = ARR[small];
			document.getElementById(i).innerHTML = ARR[i];
		}
		
	}
	sorted = "DONE";
}
// selection sort end
async function load() {
	ARR = new Array();
	var INDEX = 0;
	var TO_PUT = "";
	var sz = document.getElementById('size').value;
	for(let i = 0;ARR.length < sz;i++){
		var height = getRandomNUM(50,500);
		var ok = true;
		for(let j in ARR)
			if(j == height)
				ok = false;
		if(ok){
			ARR.push(height)
			if(sz < 37){
			 	TO_PUT +='<div id="'+INDEX+'" class = "BAR" style="height:'+height+'px;width: 28px;">'+height+'</div>';
			 }else{
			 	TO_PUT +='<div id="'+INDEX+'" class = "BAR" style="height:'+height+'px;width: 15px;">'+'</div>';
			 }
			INDEX++;
		}
	}
	document.getElementById('board').innerHTML = TO_PUT;
}
