var arranged_data = "";  
function get_json_2(URL) {
    var whole = '<table class = "cc"><td class="cc">SR.NO</td><td class="cc">SHORTNAME</td><td class="cc">MARKET CAPTURE</td><td class="cc">MORE INFO</td>';
    var setting =  
    fetch(URL,{
        header:{
            'mode': 'no-cors',
            'Access-Control-Allow-Origin': '*'    
        }
        
    }).then(response=>{
        return response.json();
    }).then(items=>{
        var arr = items["item"];
            let cnt = 0;
            let j = 1;
            for(let i = arr.length-1;i>=0;i--){
                var each = arr[i];
                var s = '<tr class = "cc">';
                s += '<td class = "cc">'+j+'</td>';
                s += '<td class = "cc">'+each['shortname']+'</td>';
                s += '<td class = "cc">'+each['mktcap']+'</td>';
                s += '<td class = "cc">'+'<a href = "'+each['url']+'">'+'MORE'+'</a></td>';
                s += '</tr>'
                whole += s;
                // if(cnt < 10)
                //     gp.push([each['shortname'],each['mktcap']]);
                cnt+=1;
                j++;
            }
            document.getElementById('tbl').innerHTML = whole;
    }).catch(error=>{
        console.log(error);
    });
    // alert(whole);

}
async function get_json(url) {
       var whole = '<table class = "cc"><td class="cc">SR.NO</td><td class="cc">SHORTNAME</td><td class="cc">MARKET CAPTURE</td><td class="cc">MORE INFO</td>';
       // 'Company Name',
       gp = [['Company Names','Market Capture',]];
       try{
            const resp = await axios.get(url);
            const items = resp.data;
            console.log(items); 
            /*
            */
        }
        catch(Errors){
            console.log(Errors);
        }
        google.charts.load('current', {'packages':['bar']});
        var options = {
            width:"device-width",
            height:"device-height"
        };
        var drawChart = ()=>{
            var data = google.visualization.arrayToDataTable(gp);            
            var chart = new google.charts.Bar(document.getElementById('cht'));
            chart.draw(data, google.charts.Bar.convertOptions(options))
        };
        
        google.charts.setOnLoadCallback(drawChart,options);
        arranged_data = whole;
}
var ok = 1;
function add(i){
    var btx = i;
    var ids = document.getElementById('tbl');
    if(ok === 1){
        ids.innerHTML = arranged_data;
        btx.innerHTML = "HIDE ALL 50";
        ok = 0;
    }else{
        btx.innerHTML = "SHOW ALL 50";
        ids.innerHTML = "";
        ok = 1;
    }
}
function load(){
    var URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    URL = "https://cors-anywhere.herokuapp.com/appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9";
    // URL = "https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9";
    get_json_2(URL);
}
// "https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9"
/*


Access-Control-Allow-Origin: *
*/
