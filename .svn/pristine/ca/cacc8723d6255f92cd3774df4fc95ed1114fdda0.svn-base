var settingContent = {
	loadUserInfo: function() {
		var data = {
			"access-token": pubSysStorage.getData("token"),
			"device": pubSysStorage.getData("deviceId"),
		};
		doAjaxRequest('setting', data, function(info) {
				if (info.flag === "success") {
					getElements("#email", true).innerText = info.data.user.email;
					getElements("#name", true).innerText = info.data.user.first_name + info.data.user.last_name;
				}/* else {
					showAlert('Network connection timeout.Please login again', function(){
						unbindDevice(function() {
							logout();
						});
					}, "YeahMobiAPP", "OK");
				}*/
		});
	},
}
