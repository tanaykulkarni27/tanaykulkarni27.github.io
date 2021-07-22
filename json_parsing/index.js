async function get_json(url) {
       var whole = "";
       try{
            const resp = await axios.get(url);
            const items = resp.data;
            for(let i = 0;i<items.length;i++){
                var each = items[i];
                var s = '<tr class = "cc">';
                s += '<td>'+each['userId']+'</td>';
                s += '<td>'+each['title']+'</td>';
                if( each['completed'] == false)
                    s += '<td>'+'NO'+'</td>';
                else
                    s += '<td>'+'YES'+'</td>';
                s += '</tr>'
                whole += s;
            }
        }
        catch(Errors){
            console.log(Errors);
        }
        document.getElementById('resp').innerHTML = '<table>'+whole+'</table>';
   
}
function load(){
    var URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    URL = "https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9";
    get_json(URL);
}
// "https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9"