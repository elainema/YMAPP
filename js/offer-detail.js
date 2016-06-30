var token = pubSysStorage.getData('token');
var deviceId = pubSysStorage.getData('deviceId');
var offerDetail = {
	load: function(offerId) {
		var data = {
			"access-token": token,
			"device": deviceId,
			"k": offerId
		}
		doAjaxRequest('search', data, function(result) {
			if (result.flag == "success") {
				closeWaiting();
				if (result.data) {
					//渲染
					var html = template('offerDeatil', result);
					var capsDeatil = template('capsDeatil', result);
					document.getElementById("offerChanges").innerHTML = html;
					document.getElementById("capsDetail").innerHTML = capsDeatil;
				} else {
					showAlert('No result found', function(){
						plus.webview.getWebviewById("offer-detail.html").close();
						plus.webview.getWebviewById("offer-list.html").close();
					}, "YeahMobiAPP", "OK");
				}
			}
		})
	}
}
