function get_json(url) {
   url = 'https://cors-anywhere.herokuapp.com/'+url;
   const axios = require('axios').default;
   axios.get(url)
        .then(function (response) {
        // handle success
        console.log(response);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        // always executed
        });
}
function load(){
        get_json("https://appfeeds.moneycontrol.com/jsonapi/market/marketmap&format=&type=0&ind_id=9");
   
}
