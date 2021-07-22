async function get_json(url) {
       var whole = '<table class = "cc"><td class="cc">SHOP NAME</td><td class="cc">MARKET CAPTURE</td><td class="cc">THERE SITE</td>';
       try{

            const resp = await axios.get(url);
            const items = resp.data;
            var arr = items["item"];
            for(let i = 0;i<arr.length;i++){
                var each = arr[i];
                var s = '<tr class = "cc">';
                s += '<td class = "cc">'+each['shortname']+'</td>';
                s += '<td class = "cc">'+each['mktcap']+'</td>';
                s += '<td class = "cc">'+'<a href = "'+each['url']+'">'+'VISIT'+'</a></td>';
                
                s += '</tr>'
                whole += s;
            }
        }
        catch(Errors){
            console.log(Errors);
        }
        document.getElementById('resp').innerHTML = whole+'</table>';
   
}
function load(){
    var URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    URL = "https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9";
    get_json(URL);
}
// "https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9"
