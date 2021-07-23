var scp = document.createElement('script');
scp.src = 'SECURE.js';
document.head.appendChild(scp);
function load(){
    var URL = get_link();
    var gp = [['NAMES','VALUES']];
    axios.get(URL).then(res=>{
        var arr = res.data['items'];
        for(let i = 0;i<arr.length;i++){
            gp.push([arr[i]['NAME'],arr[i]['VALUE']]);
        }
        google.charts.load("current", {packages:["bar"]});
        const x = function(){
            var view = new google.visualization.arrayToDataTable(gp);
            var options = {
                title: "           ",
                width: 'device-width',
                height: 'device-height',
                 bars: 'vertical',
                bar: {groupWidth: "100%"},
                legend: { position: "none" },
            };
            var chart = new google.charts.Bar(document.getElementById("TAB"));
            chart.draw(view, google.charts.Bar.convertOptions(options));
            // chart.draw(view,options);   
        };
        google.charts.setOnLoadCallback(x);
        // console.log(gp);
    }).catch(error=>{
        console.log(error);
    });

}