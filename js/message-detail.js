var token = pubSysStorage.getData('token');
var deviceId = pubSysStorage.getData('deviceId');
var messageDeatil = {
	checkPeriod: function () {
		var data = {
			'access-token': token,
			device: deviceId
		}
		doAjaxRequest('paymentAccept', data, function(checkResult) {
			if (checkResult.flag == "fail" && checkResult.msg.indexOf("approval is not available") > 0) {
				pubSysStorage.saveData("period", checkResult.msg);
			} else {
				pubSysStorage.saveData("period", "");
			}
		})
	},
	paymentAccept: function(id, requency, messageId) {
		var data = {
			'access-token': token,
			id: id,
			'email_invoice_frequency': requency,
			device: deviceId,
			'message_id': messageId
		}
		doAjaxRequest('paymentAccept', data, function(result) {
			if (result.flag == "success") {
				document.getElementById("approve").style.display = "none";
				document.getElementById("acceptButton").style.display = "none";
				document.getElementById("rejectButton").style.display = "none";
			}
		})
	},
	paymentReject: function(id, reason, messageId) {
		var data = {
			'access-token': token,
			id: id,
			'account_problems': reason,
			device: deviceId,
			'message_id': messageId
		}
		doAjaxRequest('paymentReject', data, function(result) {
			if (result.flag == "success") {
			} else {
				/*showAlert('Error', function(){
				}, "YeahMobiAPP", "OK" );*/
			}
		})
	}
}