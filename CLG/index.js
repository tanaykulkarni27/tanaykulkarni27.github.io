var dist_to_taluka = new Map();
function load(){
	fetch('https://tanaykulkarni27.github.io/cities.json')
	.then(res=>res.json())
	.then((data)=>{
		dist_to_taluka = new Map();
		for(var i in data){
			document.getElementById("dists").innerHTML += '<option value=\"'+data[i].name+'\">'+data[i].name+'</option>';
			var x = new Array();
			for(var j in data[i].tahasil)
				x.push(data[i].tahasil[j]);
			dist_to_taluka[data[i].name] = x;
		}
	});
	
}
function nxt(ii){
	for(var i in ii.options){
		if(ii.options[i].selected == true){
			if(ii.options[i].value == 'none'){
				alert("PLEASE SELECT VALID OPTION");
				return;
			}
			var obj = document.getElementById("tlks");
			obj.innerHTML = '<option value="none">None</option>';
			for(var j in dist_to_taluka[ii.options[i].value]){
				obj.innerHTML += '<option value="'+dist_to_taluka[ii.options[i].value][j]+'">'+dist_to_taluka[ii.options[i].value][j]+'</options>';
			}
			obj.style.display="block";
			return;
		}
	}
}
function validate(){
	var name = document.getElementById("fname");
	var address = document.getElementById("addr");
	var pin = document.getElementById("pncd");
	var email = document.getElementById("email");
	var phone_number = document.getElementById("nmb");
	var password_1 = document.getElementById("pwd");
	var password_2 = document.getElementById("pwd2");
	if(name.value.length == 0){
		alert("NAME CANNOT BE EMPTY");
		name.style.borderColor = "red";	
		return false;
	}
	if(address.value.length == 0){
		alert("ADDRESS CANNOT BE EMPTY");
		name.style.borderColor = "red";	
		return false;
	}
	if(pin.value.length != 6){
		alert("INVALID PINCODE");
		pin.style.borderColor = "red";
		return false;
	}
	if(email.value.length == 0){
		alert("EMAIL CANNOT BE EMPTY");
		pin.style.borderColor = "red";
		return false;
	}
	else{
		var ok = -1;
		if(email.value.search('@') == -1){ alert("EMAIL MUST CONTAIN \"@\""); ok = 1; }
		else if(email.value.search(" ") != -1){ alert("EMAIL CAN'T CONTAIN SPACES"); ok = 1;}
		else if(email.value.substr(email.value.length - 5 + 1,email.value.length - 1) != '.com'){
			alert("EMAIL MUST END WITH \".com\"");
			ok = 1;
		}
		if(ok == 1){
			email.style.borderColor = "red";
			return false;
		}
		
	}
	if(phone_number.value.length != 10){
			alert("INVALID MOBILE NUMBER");
			phone_NUMBER.style.borderColor = "red";
			return false;
	}
	if(password_1.value.length < 6){
			alert("PASSWORD MUST CONTAINS ALTEAST 6 CHARACTERS");
			password_1.style.borderColor = "red";
			return false;
	}
	if(password_2.value.length < 6){
			alert("PASSWORD MUST CONTAINS ALTEAST 6 CHARACTERS");
			password_2.style.borderColor = "red";
			return false;
	}
	if(password_1.value !=  password_2.value){
		alert("PASSWORD DIDN'T MATCHED");
		password_2.style.borderColor = "red";
		password_1.style.borderColor = "red";
		return false;
	}
	var obj = document.getElementById("tlks");
	for(var i in obj.options){
		if(obj.options[i].selected){
			if(obj.options[i].value == 'none'){
				alert("PLEASE SELECT VALID OPTION");
				return false;
			}
		}
	}
	return true;
}
function handle(i){
	if(i.id == "show"){
		document.getElementById("pwd").type = "text";
		document.getElementById("hide").style.display = "block";
		i.style.display = "none";
		return;
	}else{
		document.getElementById("pwd").type = "password";
		document.getElementById("show").style.display = "block";
		i.style.display = "none";
		return;
	}
}
