function f() {
		document.getElementById('main_page').style.display = 'none';
		document.getElementById('documentation').style.visibility = 'visible';
}
function close_form(){
	document.getElementById('main_page').style.display = 'block';
	document.getElementById('documentation').style.display = 'none';
}
function append_url(){
	document.getElementById('txt').value += '["URL:https://"]';
}
function append_bold(){
	document.getElementById('txt').value += '["B"]';
}
function append_underline(){
	document.getElementById('txt').value += '["A"]';
}
function append_italic(){
	document.getElementById('txt').value += '["I"]';
}
async function something_func(){
	return new Promise((rt)=>{
		var x = []
		x['<b>'] = '</b>';
		x['<i>'] = '</i>';
		x['<ins>'] = '</ins>';
		var txt = document.getElementById('txt').value;
		while(txt.includes('/\\n/')){
			txt = txt.replace('/\\n/','<br>');	
		}
		while(txt.includes('["B"')){
			txt = txt.replace('["B"','<b>')
		}
		while(txt.includes('["A"')){
			txt = txt.replace('["A"','<ins>')		
		}
		while(txt.includes('["I"')){
			txt = txt.replace('["I"','<i>');
		}
		var tmp = new Array();
		var to_put = "";
		var n = txt.length;
		for(var i = 0;i < n;i++){	
			 if(txt.substr(i,3) == '<b>'){
				tmp.push('<b>');
			}
			if(txt.substr(i,3) === '<i>'){
				tmp.push('<i>');
			}
			if(txt.substr(i,5) === '<ins>'){
				tmp.push('<ins>');
			}
			if(txt[i] == ']' && tmp.length != 0){
				to_put += x[tmp[tmp.length - 1]];
				tmp.pop();
			}			
			else{
				to_put += txt[i];	
			}		
		}	
		rt(to_put);
	});
}
function decode(){
	something_func().then(txt=>{
		var to_put = "";
		for(var i = 0;i < txt.length;i++){
			var FLIP_FLOP = false;
			if(txt.substr(i,6) == '["URL:'){
				var j= i + 6;
				var URL = "";
				while(j < txt.length && txt[j] != '"'){
					URL += txt[j];
					j++;
				}
				URL = '<a href="'+URL+'">';
				j++;
				var inner_txt = "";
				while(j < txt.length && txt[j] != ']'){
					inner_txt += txt[j];
					j++;
				}
				if(txt[j] == ']'){
					URL += inner_txt + '</a>';
					FLIP_FLOP = true;
					i = j;
					to_put += URL;
				}
			}
			if(!FLIP_FLOP){
				to_put += txt[i];
			}
		}
		document.getElementById('PREVIEW').innerHTML = to_put;
	});
}
