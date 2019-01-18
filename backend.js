
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
    labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    datasets:[{
      label:'Population',
      data:[
        617594,
        181045,
        153060,
        106519,
        105162,
        95072
      ],
      //backgroundColor:'green',      //可自訂背景顏色
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
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




/*
 * 讀取MQTT取資料 (記得先裝chrome擴充)
 * 使用 p5.js
 * https://p5js.org/examples/
 */
let data = {} ; 
function setup() {
    data = loadJSON("https://iot.martinintw.com/api/v1/data/12345614",parseData);
    //目前讀完只有顯示在console，待parse並放到圖中
    //console.log(data);
	
	
}
function parseData(data){
	//console.log(data[0].created_at);
	//console.log(data.length);
	for(i = 0; i < data.length; i++)
	{
		getCreatedTime(data,i);
	}
	
}

function getCreatedTime(data,num)
{
	created_at = data[num].created_at;
	console.log(created_at);
}






