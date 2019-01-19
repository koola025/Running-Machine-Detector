
/*
 * 取得現在日期時間 * * * * * * * * * * * * * * * * * * * *
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
 * 讀取MQTT取資料 (記得先裝chrome擴充) * * * * * * * * * * * * 
 * 使用 p5.js
 * https://p5js.org/examples/
 */
let data = {} ; // 讀回來的JSON object

// 讀回來的所有資料的日期、時間、小時
let day = {}; 
let time = {};
let hour = {};
function setup() {
    //讀取跑步機sensor的所有資料並呼叫 parseData(data)
    data = loadJSON("https://iot.martinintw.com/api/v1/data/12345614",parseData);
}



function resetChart(){
  // removeData(massPopChart);
  // removeData(hourStatsChart);

  // massPopChart.clear();
  // hourStatsChart.clear();
  
  // massPopChart.reset();
  // hourStatsChart.reset();
  // massPopChart.update();
  // setup();

  loadJSON("https://iot.martinintw.com/api/v1/data/12345614",lastUsed);
}

/*
 * 計算上一筆資料跟現在距離幾毫秒 * * * * * * * * * * * * * * *
 */

function lastUsed(data){
  created_at = getCreatedTime(data,data.length-1);
  // var last = new Date("2019-01-18 22:49:37");
  var last = new Date(created_at);
  var now = new Date();
  console.log(now.valueOf() - last.valueOf());
  if(now.valueOf() - last.valueOf() < 600000) console.log("10分鐘內有人用過");
  else console.log("10分鐘內沒人用過");
}



/*
 * 作圖：每日用量 * * * * * * * * * * * * * * * * * * * * * * 
 */
let count = 1;
let old_data;
let new_data;
function makeUsagePerDay(data) {
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
  }
}
  
/*
 * 作圖：小時統計 * * * * * * * * * * * * * * * * * * * * * * 
 */
function hourStats(data){
  var count = []; 

  count[7] = 0;
	count[8] = 0;
	count[9] = 0;
	count[10] = 0;
	count[11] = 0;
	count[12] = 0;
	count[13] = 0;
	count[14] = 0;
	count[15] = 0;
	count[16] = 0;
	count[17] = 0;
	count[18] = 0;
	count[19] = 0;
	count[20] = 0;
	count[21] = 0;
	count[22] = 0;
	for(i = 0; i < data.length; i++)
	{
    hour[i] = time[i].split(":")[0];

		if(hour[i] == "07")
			count[7] ++;
		else if(hour[i] == "08")
			count[8] ++;
		else if(hour[i] == "09")
      count[9] ++;
    else count[hour[i]]++;		
  }
  
  for(i=7;i<=22;i++){
    addData(hourStatsChart,i, count[i]*100/data.length);
  } 
}

function removeData(chart) {
  var i;
  for(i=0;i<chart.data.labels.length;)
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}



/*
 * Parse JSON * * * * * * * * * * * * * * * * * * * * * * 
 */
function parseData(data){
  // console.log(data)
  makeUsagePerDay(data);
  for(i = 0; i < data.length; i++)
	{
    created_at = getCreatedTime(data,i);
    day[i] = created_at.split(" ")[0];
    time[i] = created_at.split(" ")[1];
  }
  hourStats(data);
  // lastUsed(data);
  
}


/*
 * Parse created_at * * * * * * * * * * * * * * * * * * *
 */
function getCreatedTime(data,num)
{
  return data[num].created_at;
}


/*
 * 加一筆資料到圖表中 (會設成藍色) * * * * * * * * * * * * * * 
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
 * 圖表相關 * * * * * * * * * * * * * * * * * * * * * * * *
 * 使用 chart.js
 * https://www.chartjs.org/docs/latest/charts/
 */


let hourChart = document.getElementById('hour').getContext('2d');
let usagePerDay = document.getElementById('chart').getContext('2d');

// 定義顏色
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

// 圖表的全域變數
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';


// 圖表Object: 每天用量
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

// 圖表Object: 小時累計 (07 ~ 22)
let hourStatsChart = new Chart(hourChart, {
  type:'bar', //換後面這些就會出現不同的圖： bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels: [],
    datasets:[{
      label:'使用率(%)',
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
      text:'尖峰時段預測',
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