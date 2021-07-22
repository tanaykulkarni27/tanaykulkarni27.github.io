var arranged_data = "";  
async function get_json(URL) {
        // var xhr = new XMLHttpRequest();
        // xhr.open("GET",URL);
        // xhr.setRequestHeader("Access-Control-Allow-Origin","*");
        // xhr.onreadystatechange = function(){
        //     if(xhr.readyState===4)
        //     console.log(xhr.responseText);
        // }
        // xhr.send();
     fetch(URL).then(function(res){
        return res.json(); 
     }).then(function(data){
        console.log(data);
     }).catch(error=>console.log("HELLO ERROR"));
}
function load(){
    var URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    URL = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=6eeec874600546b4be9d3b37d6697ab8"
    get_json(URL);
}
// "https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9"
/*
"https://newsapi.org/v2/everything?q=bitcoin&apiKey=6eeec874600546b4be9d3b37d6697ab8"
*/
