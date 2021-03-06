var token = pubSysStorage.getData('token');
var deviceId = pubSysStorage.getData('deviceId');
var keyWords = "";
var offerContent = {
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
					if (plus.webview.currentWebview() != "offer-list.html") {
						offerContent.goToList(result);
					}
				} else {
					closeWaiting();
					showAlert('No result found', function(){
					}, "YeahMobiAPP", "OK");
				}
			}
		})
	},
	goToList:function(result) {
		mui.openWindow({
			id : "offer-list.html",
			url: "offer-list.html",
			preload: false,
			waiting:{
		      	autoShow: false,//自动显示等待框，默认为true
		      	title:'Loading...'//等待对话框上显示的提示内容
		   },
		   extras:{
				data: result,
				keyWords:keyWords
		   },
		   show:{
		      	autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      	AnimationTypeShow:"slide-in-right"
		   },
		});
		closeWaiting();
	}
}
