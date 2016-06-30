var token = pubSysStorage.getData('token');
var deviceId = pubSysStorage.getData('deviceId');
var myData = new Array;
var chartWidth = screen.width/window.devicePixelRatio;
var role = pubSysStorage.getData('role');
var dataArray = [];

//格式化时间戳
var formatDateTime = {
	string2time: function(time) {
	    var datetime = new Date(time);
	    var year = datetime.getFullYear();
	    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	    return month + "." + date;
	}
} 
var dataContent = {
	load: function() {
		var data = {
			"access-token": token,
			"device": deviceId
		}
		doAjaxRequest('data', data, function(result) {
			var allnumber= document.getElementById("number")
			var alla = document.getElementById("clicks");
			var allb = document.getElementById("conversions");
			if (result.flag == "success") {
				if (result.data.master != null) {
					allnumber.innerText = result.data.master;
				} else {
					allnumber.innerText = "No data";
				}
				
				if (result.data.a != null) {
					alla.innerText = result.data.a;
				} else {
					alla.innerText  = "No data";
				}
				
				if (result.data.b != null) {
					allb.innerText = result.data.b;
				} else {
					allb.innerText = "No data";
				}
				
				if (result.data.master <= 0 && result.data.a <= 0 && result.data.b <= 0) {
					allnumber.innerText = "No data";
					alla.innerText  = "No data";
					allb.innerText = "No data";
				}
				if (result.data.graph) {
					var lineChartData = {};
					var xData = [];
					var yData = [];
					if (result.data.graph.x){
						var dataY = result.data.graph.y;
						for (var x = 0; x < result.data.graph.x.length; x++) {
							var LabelX = formatDateTime.string2time(result.data.graph.x[x] * 1000);
							var dataYPoint = dataY[x];
							xData.push([LabelX]);
							yData.push([dataYPoint]);
						}
					}
					
					//yData = [0,0,0,0,0,0,0];
					lineChartData = {
						labels : xData,
						datasets : [{
							data: yData,
							fillColor : "rgba(193,225,224,0.5)",
							strokeColor : "rgba(0,204,200,1)",
							pointColor: "rgba(50,210,201,1)",
							pointStrokeColor : "#fff",
							pointHighlightFill : "#fff",
							pointHighlightStroke : "rgba(0,204,200,1)"
						}]
					}
					var ctx = document.getElementById("canvas").getContext("2d");
					new Chart(ctx).Line(lineChartData, {
						responsive: true,
						animation: false,
						scaleFontColor: "#b9b9b9",
						scaleIntegersOnly: false,
						tooltipFillColor: "rgba(0,0,0,1)",
						bezierCurve:false
					});
					
					if (role == "AFF") {
						document.getElementById("chartName").innerHTML = "<span class='mui-tooltip'>&nbsp;</span>CR";
					} else if (role == "AM"){
						document.getElementById("chartName").innerHTML = "<span class='mui-tooltip'>&nbsp;</span>Conversions";
					} else {
						document.getElementById("chartName").innerHTML = "<span class='mui-tooltip'>&nbsp;</span>Revenue";
					}
					document.getElementById("chartName").style.display = "block";
				}
			}
		});
	},
	areaName: function() {
		var numbername = document.getElementById("numbername");
		var leftarea = document.getElementById("leftarea");
		var	rightarea = document.getElementById("rightarea");
		var leftIcon = document.getElementById("leftIcon");
		var rightIcon = document.getElementById("rightIcon");
		if (role == "AM") {
			numbername.innerText = "Profit";
			leftarea.innerText = "Revenue";
			rightarea.innerText = "Conversions";
			leftIcon.className = "icon-revenue";
			rightIcon.className = "icon-conversions";
		} else if (role == "BD") {
			numbername.innerText = "Revenue";
			leftarea.innerText = "CR";
			rightarea.innerText = "Conversions";
			leftIcon.className = "icon-cr";
			rightIcon.className = "icon-conversions";
		} else {
			numbername.innerText = "Accounts receivable";
			leftarea.innerText = "Clicks";
			rightarea.innerText = "Conversions";
			leftIcon.className = "icon-click";
			rightIcon.className = "icon-conversions";
		}
	}
}
