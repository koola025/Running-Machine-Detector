
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
let day = {};
let time = {};
let hour = {};
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
    day[i] = created_at.split(" ")[0];
    time[i] = created_at.split(" ")[1];
    // dataArray.push(created_at);
    addData(massPopChart, created_at, 1);
    
  }
  // console.log (dataArray);
  hourStats(data);
}

function hourStats(data){
  // var i;
  // for(i = 7; i <= 22; i++){
  //   hourStatsChart.data.labels.push(i);
  //   hourStatsChart.data.datasets.forEach((dataset) => {
  //     dataset.data.push(0);
  //   });
  // }

  // for(i = 0; i < time.length; i++){
  //   hour[i] = time[i].split(":")[0];
  //   console.log(hour[i]);
  //   hourStatsChart.data.datasets[0].data[hour[i]-7] += 1;
  // }
  // hourStatsChart.update();

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
		if(data[i].created_at[11] == '0' &&  data[i].created_at[12] == '7')
			count[7] ++;
		else if(data[i].created_at[11] == '0' &&  data[i].created_at[12] == '8')
			count[8] ++;
		else if(data[i].created_at[11] == '0' &&  data[i].created_at[12] == '9')
			count[9] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '0')
			count[10] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '1')
			count[11] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '2')
			count[12] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '3')
			count[13] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '4')
			count[14] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '5')
			count[15] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '6')
			count[16] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '7')
			count[17] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '8')
			count[18] ++;
		else if(data[i].created_at[11] == '1' &&  data[i].created_at[12] == '9')
			count[19] ++;
		else if(data[i].created_at[11] == '2' &&  data[i].created_at[12] == '0')
			count[20] ++;
		else if(data[i].created_at[11] == '2' &&  data[i].created_at[12] == '1')
			count[21] ++;
		else if(data[i].created_at[11] == '2' &&  data[i].created_at[12] == '2')
			count[22] ++;
		
	}
	 addData(hourStatsChart,"07", count[7]);
	 addData(hourStatsChart,"08", count[8]);
	 addData(hourStatsChart,"09", count[9]);
	 addData(hourStatsChart,"10", count[10]);
	 addData(hourStatsChart,"11", count[11]);
	 addData(hourStatsChart,"12", count[12]);
	 addData(hourStatsChart,"13", count[13]);
	 addData(hourStatsChart,"14", count[14]);
	 addData(hourStatsChart,"15", count[15]);
	 addData(hourStatsChart,"16", count[16]);
	 addData(hourStatsChart,"17", count[17]);
	 addData(hourStatsChart,"18", count[18]);
	 addData(hourStatsChart,"19", count[19]);
	 addData(hourStatsChart,"20", count[20]);
	 addData(hourStatsChart,"21", count[21]);
	 addData(hourStatsChart,"22", count[22]);
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
let hourChart = document.getElementById('hour').getContext('2d');


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
// 07 ~ 22
let hourStatsChart = new Chart(hourChart, {
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
      text:'每小時使用人數',
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