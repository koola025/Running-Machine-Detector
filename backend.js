
/*
 * 取得現在日期時間
 */
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;      // January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
// document.write(today);



/*
 * 讀取MQTT取資料 (記得先裝chrome擴充)
 * 使用 p5.js
 * https://p5js.org/examples/
 */
let data = {} ; 
function setup() {
    //讀取跑步機sensor的所有資料並呼叫 parseData(data)
    data = loadJSON("https://iot.martinintw.com/api/v1/data/12345614",parseData);
}


/*
 * Parse JSON
 */
// let dataArray = [];
function parseData(data){
	for(i = 0; i < data.length; i++)
	{
    created_at = getCreatedTime(data,i);
    console.log (created_at);
    // dataArray.push(created_at);
    addData(massPopChart, created_at, 1);
    
  }
  // console.log (dataArray);
}


/*
 * Parse 時間
 */
function getCreatedTime(data,num)
{
  return data[num].created_at;
}


/*
 * 加一筆資料到圖表中
 */
function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}


/* 
 * 範例圖表
 * 使用 chart.js
 * https://www.chartjs.org/docs/latest/charts/
 */
let myChart = document.getElementById('chart').getContext('2d');


//圖表的全域變數
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';


//圖表Object
let massPopChart = new Chart(myChart, {
  type:'bar', //換後面這些就會出現不同的圖： bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels: [],
    datasets:[{
      label:'Population',
      data:[
        
      ],
      //backgroundColor:'green',      //可自訂背景顏色
      backgroundColor:[
        // 'rgba(255, 99, 132, 0.6)',
        // 'rgba(54, 162, 235, 0.6)',
        // 'rgba(255, 206, 86, 0.6)',
        // 'rgba(75, 192, 192, 0.6)',
        // 'rgba(153, 102, 255, 0.6)',
        // 'rgba(255, 159, 64, 0.6)',
        // 'rgba(255, 99, 132, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display:true,
      text:'Largest Cities In Massachusetts',
      fontSize:25
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layout:{
      padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }
});