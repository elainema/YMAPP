var login = {
	resetForm: function() {
		getElements('#loginForm', true).reset();
	},
	
	validateForm: function() {
		var account = getElements("#email", true).value;
		var psd = getElements('#password', true).value;
		var device;
		if (pubSysStorage.getData('deviceId')) {
			device = pubSysStorage.getData('deviceId');
		} else {
			device = plus.push.getClientInfo().clientid;
			pubSysStorage.saveData("deviceId", device);
		}
		if(account != "" && psd != ""){
			return {email: account, password: psd};
		}
		return false;
	},
	
	doLogin: function() {
		var data = login.validateForm();
		if(data) {
			showWaiting("Loading...");
			var ajaxStart = doAjaxRequest('login', data, login.successCallback);
			if(!ajaxStart) {
				closeWaiting();
			}
		}
		else {
			showAlert('Please confirm the account and password to login again!', function(){}, "YeahMobiAPP", "OK");
		}
	},
	
	doAutoLogin: function(callback) {
		if (pubSysStorage.getData("keepLogin") == 1 && pubSysStorage.getData("token")) {
			var localAccount = pubSysStorage.getData("account");
			var localPsd = pubSysStorage.getData("password");
			getElements("#email", true).value = localAccount;
			getElements("#password", true).value = localPsd;
			multiLoginCheck(callback);
		}
	},
	
	successCallback: function(response) {
		if(pubSysStorage.getData('unbindFlag')) {
			pubSysStorage.saveData('unbindFlag', 0);
			timerEvent.removeEvent('unbindDevice');
		}
		var keepLogin = getElements("#keepLogin", true).checked;
		var account = getElements("#email", true).value;
		var psd = getElements('#password', true).value;
		loginWebview = plus.webview.currentWebview().id;
		if (keepLogin == true) {
			keepLogin = 1;
		} else {
			keepLogin = 0;
		}
		closeWaiting();
		if (response.flag === "success") {
			pubSysStorage.saveData({
				token: decodeURIComponent(response.data.token),
				account: account,
				password: psd,
				keepLogin: keepLogin,
				loginWebview: loginWebview,
				role : response.data.user.role
			});
			gotoMessage();
		} else {
			showAlert('Please confirm the account and password to login again!', function(){
				getElements('#password', true).value = '';
			}, "YeahMobiAPP", "OK" );
		}
	},
};
