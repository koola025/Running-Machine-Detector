// function init() {
//     console.log("here");
//     loadJSON("https://iot.martinintw.com/api/v1/data/12345614?fbclid=IwAR1avxnTvuTGdlLdTC9B8-1pQhIAgx6T-jEQG_jlypHPAOgmYiUKzmtq2UA", data, 'jsonp');
//     // $.getJSON('http://anyorigin.com/get?url=http%3A//webapp.armadealo.com/home.json&callback=?', function(data){
//     //     $('#output').html(data.contents);
//     // });
//     console.log(data);
// }
// // $.ajax({
// //     url: 'https://iot.martinintw.com/api/v1/data/12345617',
// //     type: 'GET',
// //     dataType: "json",
// // });

// window.onload = function () {
//     init();
// };
let data = {}; 
function setup() {
    data = loadJSON("https://iot.martinintw.com/api/v1/data/12345617");
    console.log(data);
}

function draw() {
  ellipse(50, 50, 80, 80);
}