var token = pubSysStorage.getData('token');
var deviceId = pubSysStorage.getData('deviceId');
var offerGeo = {
	geoModal: function() {
		var itemValue = "";
		//var itemCode = "";
		var item = "";
		var removeItem = "";
		var allGeos = document.getElementById('geoes').innerHTML;
		//点击geo，弹出geo弹窗
		mui("#offerGeoContent").on("tap", "#selectGeo", function() {
			document.getElementById("geoBox").style.display = "block";
		})
		//geo弹窗点选事件，选中当前项添加到geo列表
		mui("#geoBox").on("tap", ".mui-table-view-cell", function() {
			var tapppedValue = this.getAttribute("data-value");
			var defaultItem = document.getElementById("All");
			
			//all和所有选项互斥 
			if (defaultItem.classList.contains('mui-active')){
				defaultItem.classList.remove('mui-active');
				defaultItem.style.backgroundColor = "#fff";
			}
			if (tapppedValue == "All") {
				mui("#geoBox .mui-table-view-cell").each(function() {
					this.style.backgroundColor = "#fff";
					if (this.classList.contains('mui-active')) {
						this.classList.remove('mui-active');
					}
				});
				this.className = "mui-table-view-cell mui-active";
				this.style.backgroundColor = "#ededed";
			} else {
				document.getElementById("All").className = "mui-table-view-cell";
				mui("#geoBox .mui-table-view-cell").each(function() {
					this.style.backgroundColor = "#fff";
				});
				this.style.backgroundColor = "#ededed";
				if (this.classList.contains('mui-active')) {
					this.classList.remove('mui-active');
					this.style.backgroundColor = "#fff";
				} else {
					this.className = "mui-table-view-cell mui-active";
				}
			}
		})
			
		document.getElementById("geoConfirm").addEventListener("tap", function() {
			mui("#geoBox .mui-active").each(function() {
				itemValue = this.getAttribute("data-value");
				itemCode = this.getAttribute("data-code");
				if (this.getAttribute("data-value") == "All") {
					removeItem = "";
				} else {
					removeItem = this.id;
				}
				item = item + '<li class="mui-table-view-cell" id="' + removeItem + '" data-value="' + itemValue + '">' + '<a href="#">' + '<span class="mui-pull-left offerChangeName">' + itemValue + '</span>'+  '<span class="mui-pull-right offerChangeValue">' + '<span class="mui-icon mui-icon-closeempty">' + '</span>' + '</span>' + '<div class="clearfix"></div>'+ '</a>' + '</li>';
			})
			if (item != "") {
				document.getElementById("geo").innerHTML = item;
			} else {
				var defaultItem = "<li class='mui-table-view-cell' id='' data-value='All'>" + "<a href='#'>" + "<span class='mui-pull-left offerChangeName'>All" + "</span>" + "<span class='mui-pull-right offerChangeValue'>" + "<span class='mui-icon mui-icon-closeempty'>" + "</span>" + "</span>" + "<div class='clearfix'>" + "</div>" + "</a>" + "</li>";
				document.getElementById("All").className = "mui-table-view-cell mui-active";
				document.getElementById("geo").innerHTML = defaultItem;
			}
			document.getElementById("geoBox").style.display = "none";
			
			//变量置空
			itemValue = "";
			removeItem = "";
			item = "";
		})
	},
	getGeoList:function(value) {
		var data = {};
		doAjaxRequest('geoList', data, function(response) {
			if (response.flag == "success") {
				//渲染
				var html = template('geoList', response);
				document.getElementById("geoes").innerHTML = html;
						
				//标记已选项
				var existGeos = document.getElementById('geo').innerText;
				var newExistGeos = existGeos.split("\n");
				for ( i = 0 ; i < newExistGeos.length; i++){
					var existGeo = newExistGeos[i];
					mui("#geoBox .mui-table-view-cell").each(function() {
						var choiceGeo = this.getAttribute("data-value");
						if (existGeo == choiceGeo) {
							this.className = "mui-table-view-cell mui-active";
						}
					})
				}
			}	
		})
	},
	confirm:function(ids, geoes) {
		var data = {
			"access-token": token,
			"device": deviceId,
			"id": ids,
			"country_ids":geoes
		};
		doAjaxRequest('setGeo', data, function(response) {
			if (response.flag == "success") {
				var webview = plus.webview.getWebviewById("offer-detail.html");
				closeWaiting();
				webview.reload(true);
				showAlert("Saved successfully", function() {
				}, "YeahMobiAPP", "OK");
			}
		})
	}
}
