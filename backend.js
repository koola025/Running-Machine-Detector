function init() {
    console.log("here");

    // $.getJSON('http://anyorigin.com/get?url=http%3A//webapp.armadealo.com/home.json&callback=?', function(data){
    //     $('#output').html(data.contents);
    // });
    // fetch("https://iot.martinintw.com/api/v1/data/12345617", {'mode': 'no-cors'}).then(function(response) {
    //   return response.json();
    // }).then(function(myJson) {
    //   console.log(myJson);
    // });
    // console.log(data);
}
$.ajax({
    url: 'https://iot.martinintw.com/api/v1/data/12345617',
    type: 'GET',
    dataType: "json",
    mode: 'no-cors'
});

window.onload = function () {
    init();
};


// let data = {}; 
// function setup() {
//     data = loadJSON("https://iot.martinintw.com/api/v1/data/12345617");
//     console.log(data);
// }

// function draw() {
//   ellipse(50, 50, 80, 80);
// }