var token = pubSysStorage.getData('token');
var deviceId = pubSysStorage.getData('deviceId');
var effectiveTime = "";
var offerStatus = {
	pickDate: function (){
		plus.nativeUI.pickDate( function(e){
			var d = e.date;
			document.getElementById("selectDate").innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-"+ d.getDate();
		},function(e){
		});
	},
	pickTime:function (){
		plus.nativeUI.pickTime( function(e){
			var t = e.date;
			if (t.getMinutes() < 10) {
				var getMinutes = "0" + t.getMinutes();
			} else {
				var getMinutes = t.getMinutes();
			}
			document.getElementById("selectTime").innerText = t.getHours() + ":" + getMinutes;
		},function(e){
		});
	},
	defaultDateTime:function() {
		var myDate = new Date();
		document.getElementById("selectDate").innerText = myDate.getFullYear() + "-" +  (myDate.getMonth() + 1) + "-" + myDate.getDate();
		if (myDate.getMinutes() < 10) {
			document.getElementById("selectTime").innerText = myDate.getHours() + ":0" +  myDate.getMinutes();
		} else {
			document.getElementById("selectTime").innerText = myDate.getHours() + ":" +  myDate.getMinutes();
		}
	},
	statusModal: function() {
		//点击status，弹出status弹窗
		mui("#offerStatusContent").on("tap", "#status", function() {
			document.getElementById("statusBox").style.display = "block";
			mui("#statusBox .mui-table-view-cell").each(function() {
				if(this.classList.contains('mui-active')) {
					effectiveTime = this.innerText;
				}
			});
		})
		//status弹窗点选事件
		mui("#statusBox").on("tap", ".mui-table-view-cell", function() {
			status = this.getAttribute("data-value");
			mui("#statusBox .mui-table-view-cell").each(function() {
				if(this.classList.contains('mui-active')) {
					this.classList.remove('mui-active');
				}
			});
			this.className = "mui-table-view-cell mui-active";
			statusValue.innerText = status;
		})
		document.getElementById("statusConfirm").addEventListener("tap", function() {
			document.getElementById("statusBox").style.display = "none";
		})
	},
	effectiveTime: function() {
		// 点击effectiveTime，弹窗
		mui("#offerStatusContent").on("tap", "#effectiveTime", function() {
			document.getElementById("effectiveTimeBox").style.display = "block";
		})
		//effectiveTime弹窗点选事件
		mui("#effectiveTimeBox").on("tap", ".mui-table-view-cell", function() {
			var dataValue = this.getAttribute("data-value");
			effectiveTime = this.innerText;
			mui("#effectiveTimeBox .mui-table-view-cell").each(function() {
				if(this.classList.contains('mui-active')) {
					this.classList.remove('mui-active');
				}
			});
			this.className = "mui-table-view-cell mui-active";
			effTimeValue.innerText = effectiveTime;
			effTimeValue.setAttribute("data-value", dataValue);
		})
		document.getElementById("effTimeConfirm").addEventListener("tap", function() {
			if (effectiveTime.indexOf("time") > 0) { //如果是custom，关闭弹窗，选择日期
				offerStatus.defaultDateTime();
				document.getElementById("date").style.display = "block";
				document.getElementById("time").style.display = "block";
			} else {
				document.getElementById("date").style.display = "none";
				document.getElementById("time").style.display = "none";
			}
			document.getElementById("effectiveTimeBox").style.display = "none";
		})
	},
	confirm: function(ids, status, method, run_time) {
		var data = {
			"access-token": token,
			"device": deviceId,
			"ids": ids,
			"status":status,
			"method":method,
			"run_time":run_time
		}
		doAjaxRequest('setStatus', data, function(result) {
			if (result.flag == "success") {
				closeWaiting();
				var webview = plus.webview.getWebviewById("offer-detail.html");
				webview.reload(true);
				showAlert("Saved successfully", function() {
				}, "YeahMobiAPP", "OK");
			} else {
				closeWaiting();
				showAlert("Effective time can not be less than the current time", function() {
				}, "YeahMobiAPP", "OK");
			}
		})
	},
	offerCountAff: function(ids) {
		var data = {
			"access-token": token,
			"device": deviceId,
			"offer_id": ids
		}
		doAjaxRequest('offerCountAff', data, function(response) {
			if (response.flag == "success") {
				if (response.data.aff_count > 0) {
					document.getElementById("offerCountAff").innerText = response.data.aff_count;
					document.getElementById("traffic").style.display = "block";
				}
			}
		})
	}
}
