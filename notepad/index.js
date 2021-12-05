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
	something_func().then(rt=>{
		document.write(rt);
	});
}

// ["B" tanay ]
// ["A" tanay ]
// ["I" tanay ]
