var token = pubSysStorage.getData('token');
var deviceId = pubSysStorage.getData('deviceId');
var keyWords = "";
var offerList = {
	search: function(k) {
		var data = {
			"access-token": token,
			"device": deviceId,
			"k": k
		}
		keyWords = k;
		doAjaxRequest('search', data, function(result) {
			if (result.flag == "success") {
				if (result.data) {
					closeWaiting();
					//渲染
					var Html = template('offerList', result);
					document.getElementById("renderArea").innerHTML = Html;
				} else {
					closeWaiting();
					document.getElementById("renderArea").innerHTML = "";
					showAlert('No result found', function(){
						plus.webview.getWebviewById("offer-list.html").close();
						//plus.webview.getWebviewById("subpage/offer-content.html").reload(true);
					}, "YeahMobiAPP", "OK");
				}
			}
		})
	}
}