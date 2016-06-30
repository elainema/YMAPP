var showMenu = false;
var role = pubSysStorage.getData('role');
var message = {
	changeIcon: function(unreads) {
		var icon = getElements("#unread", true);
		//var unreads = pubSysStorage.getData("unreads");    
		console.log("parentGet:" + unreads);
		if (unreads <= 0) {
			icon.style.display = "none";
		} else if (unreads > 30) {
			icon.innerText = "N";
			icon.style.display = "inline-block";
		} else {
			icon.style.display = "inline-block";
			icon.innerText = unreads;
		}        
	}, 
	refreshMessageContent: function () {
		//触发重新加载message页面的加载事件
		var targetPage = plus.webview.getWebviewById('subpage/message-content.html');
	  	mui.fire(targetPage, 'loadAgain', {
	    	id: targetPage.id
	  	});
	},
	closeMenu: function() {
		if (showMenu) {
			//关闭遮罩；
			plus.webview.getWebviewById("transparent.html").hide();
			showMenu = false;
			document.getElementById("trigle").className = "downtrigle";
		}
	},
	openMenu: function() {
		if (!showMenu) {
			//显示遮罩
			plus.webview.getWebviewById("transparent.html").show();
			showMenu = true;
			document.getElementById("trigle").className = "uptrigle";
		}
	},	
	buildSubPages: function() {
		var subpages = ['subpage/setting-content.html','subpage/message-content.html',"subpage/offer-content.html","subpage/data-content.html"];
		var subpage_style = {
			top: "50px",  // old 46px
			bottom: "58px",  //old 65px
			bounce: 'vertical'
		};
		var self = plus.webview.currentWebview();
		for(var i = 0; i < 4; i++) {
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
			if( i != 1 ){
				sub.hide();
			}
			self.append(sub); 
		}
	          
		//当前激活选项，默认为第一个； 
		var activeTab = subpages[1];
		var settingImg = getElements("#settingImg", true); 
		var messageImg = getElements("#messageImg", true);
		var offerImg = getElements("#offerImg", true);
		var dataImg = getElements("#dataImg", true);
		var title = getElements("#title", true);
		//选项卡点击事件
		mui('.mui-bar-tab').on('tap', 'a', function(e) {
			var targetTab = this.getAttribute('href');
			var classList = document.getElementById("title").classList;
			if (targetTab == activeTab) {
				return;
			}
			//更改活动选项卡的图标
			if (targetTab.indexOf("setting-content.html") > 0) {
				title.innerText = "My Profile";
				document.getElementById("trigle").style.visibility = "hidden";
			} else if (targetTab.indexOf("message-content.html") > 0){
				if (pubSysStorage.getData("messageType") != "") {
					title.innerText = pubSysStorage.getData("messageType");
				} else {
					title.innerText = "Message All";
				}
				document.getElementById("trigle").style.visibility = "visible";
			} else if (targetTab.indexOf("offer-content.html") > 0){
				title.innerText = "Offers";
				document.getElementById("trigle").style.visibility = "hidden";
			} else {
				if (role == "AFF") {
					title.innerText = "AFF Data Center";
				} else if (role == "BD") {
					title.innerText = "BD Data Center";
				} else {
					title.innerText = "AM Data Center";
				}
				document.getElementById("trigle").style.visibility = "hidden";
			}
			//先隐藏当前的                        
			plus.webview.hide(activeTab);  
			     
			//再显示目标   
			plus.webview.show(targetTab);
			
			//更改当前活跃的选项卡
			activeTab = targetTab;
		});
	},

	pushMessageClickListener: function () {
		var webviewClose = ['data-detail.html', 'message-detail.html'];
		for(var i in webviewClose) {
			var webview = plus.webview.getWebviewById(webviewClose[i]);
			if(webview) {
				webview.close();
			}
		}
		var activeTab = getElements('#message-tab', true);
		mui.trigger(activeTab, 'tap', {});
		mui(".mui-tab-item").each(function() {
			if(this.classList.contains('mui-active')) {
				this.classList.remove('mui-active');
			}
		});
		activeTab.classList.add('mui-active');
		var title = 'Message All';
		pubSysStorage.saveData("messageType", "");
		getElements("#title", true).innerText = title;
		message.refreshMessageContent();
	}
}
