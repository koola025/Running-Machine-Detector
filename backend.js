
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
    console.log(data);

  }


/*
 * Parse JSON
 */
// let dataArray = [];
let count = 1;
let old_data;
let new_data;
function parseData(data){
  console.log(data)
  if (data.length > 0) new_data = getCreatedTime(data, 0);
	for(i = 1; i < data.length; i++)
	{
    old_data = new_data;
    new_data = getCreatedTime(data, i);

    old_moment = moment(old_data, "YYYY-MM-DD hh:mm:ss");
    new_moment = moment(new_data, "YYYY-MM-DD hh:mm:ss");

    old_js_time = old_moment.toDate();
    old_day = old_js_time.getDate();
    old_month = old_js_time.getMonth() + 1;
    old_year = old_js_time.getFullYear();

    new_js_time = new_moment.toDate();
    new_day = new_js_time.getDate();
    new_month = new_js_time.getMonth() + 1;
    new_year = new_js_time.getFullYear();

    if (old_day == new_day && old_month == new_month && old_year == new_year) {
      count++;
    }
    else {
      addData(massPopChart, old_js_time, count);
      count = 1;
    }

    // if (i < 5) console.log (year + "/" + month + "/" + day);
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
      dataset.backgroundColor= window.chartColors.lightBlue;
      dataset.borderColor = window.chartColors.blue;
  });

  chart.update();
}


/* 
 * 圖表相關
 * 使用 chart.js
 * https://www.chartjs.org/docs/latest/charts/
 */



let usagePerDay = document.getElementById('chart').getContext('2d');


//圖表的全域變數

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  lightBlue: 'rgba(54, 162, 235, 0.6)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';






//圖表Object
let massPopChart = new Chart(usagePerDay, {
  type:'line', //換後面這些就會出現不同的圖： bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels: [],
    datasets:[{
      label:'Count',
      // fill: false,
      pointBackgroundColor: window.chartColors.blue,
      backgroundColor: window.chartColors.yellow,
      borderColor: window.chartColors.blue,
      // steppedLine: true,
      data:[
        
      ],
      // backgroundColor:'rgba(255, 99, 132, 0.6)',      // 可自訂背景顏色
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
  fill: false,
  options:{
    title:{
      display:true,
      text:'Usage Per Day',
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
    },
    scales: {
      xAxes: [{
          type: 'time',
          time: {
              displayFormats: {'day': 'YYYY/MM/DD'},
              tooltipFormat: 'YYYY/MM/DD',
              unit: 'day',
              // round: 'true'
          }
      }]
    },
    elements: {
      line: {
          tension: 0, // disables bezier curves
      }
    }
  }
});