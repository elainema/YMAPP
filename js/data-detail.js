var role = pubSysStorage.getData('role');
var dataDeatil = {
	load: function(sort) {
		if (sort == "conversions" || sort == "Conversions") {
			sort = "conversion";
			document.getElementById("allAccounts").innerText = "Conversions";
		} else if (sort == "clicks" || sort == "Clicks") {
			sort = "click";
			document.getElementById("allAccounts").innerText = "Clicks";
		} else if ((sort == "Cost" || sort == "cost") && role =="AFF") {
			document.getElementById("allAccounts").innerText = "Accounts receivable";
		} else {
			document.getElementById("allAccounts").innerText = sort;
		}
		sort = sort.toLowerCase().replace(/[ ]/g,"");
		var token = pubSysStorage.getData('token');
		var deviceId = pubSysStorage.getData("deviceId");
		var data = {
			"access-token": token,
			"device": deviceId,
			"cate" : sort
		};
		
		doAjaxRequest('data', data, function(result) {
			var Html;
			if (result.flag == "success") {
				closeWaiting();
				if (result.data.graph) {
					//渲染
					Html = template('renderDetail', result);
					document.getElementById("detail").innerHTML = Html;
				} else {
					document.getElementById("detail").innerHTML = "No data";
				}
				if (result.data.master != 0 && result.data.master != "0.00%") {
					document.getElementById("detailNumber").innerText = result.data.master;
				} else {
					document.getElementById("detailNumber").innerText = "No data";
				}
			}
		});
	},
	hideSort : function() {
		document.getElementById("mui-backdrop").style.visibility = "hidden";
		document.getElementById("trigle").className = "downtrigle";
		/*document.getElementById("sorted").style.color = "#53bbf5";*/
		document.getElementById("sortedName").style.color = "#000";
		document.getElementById("trigle").style.color = "#53bbf5";
		document.getElementById("trigle").className = "downtrigle";
	}
}