var server = appUpdateCheckUrl,//获取升级描述文件服务器地址
	localDir = "update", localFile= "/update.json",//本地保存升级描述目录和文件名
	keyAbort = "updateAbort",//忽略版本键名
	dir = null;
var srvVer = "";
var update = {
	newVersionCallback: null,
	/**
	 * 准备升级操作
	 * 创建升级文件保存目录
	 */
	initUpdate: function(callback){
		if(callback) {
			update.newVersionCallback = callback;
		}
		// 打开doc根目录
		plus.io.requestFileSystem( plus.io.PRIVATE_DOC, function(fs){
			fs.root.getDirectory( localDir, {create:true}, function(entry){
				dir = entry;
				update.getUpdateData();
			}, function(e){
				log( "准备升级操作，打开update目录失败："+e.message );
			});
		},function(e){
			log( "准备升级操作，打开doc目录失败："+e.message );
		});
	},
	
	/**
	 * 检查升级数据
	 */
	checkUpdateData : function( j ){
		pubSysStorage.saveData('updateInfo', "");
		var curVer=plus.runtime.version,
		inf = j[plus.os.name];
		if ( inf ){
			srvVer = inf.version;
			// 判断是否需要升级
			if ( update.compareVersion(curVer,srvVer) ) {
				if(update.newVersionCallback) {
					update.newVersionCallback(inf);
				}
				// 判断是否存在忽略版本号
				var vabort = pubSysStorage.getData( keyAbort );
				if ( vabort && srvVer==vabort ) {
					// 忽略此版本
					return;
				}
				//默认不启动提示弹窗
				update.popConfirm(inf);
			}
		}
	},
	
	popConfirm : function(inf) {// 提示用户是否升级
		plus.ui.confirm( inf.note, function(i){
			if ( 0==i ) {
				//plus.runtime.openURL( inf.url );
				log(inf.url);
				update.createDownload(inf.url);
			} else if ( 1==i ) {
				pubSysStorage.saveData( keyAbort, srvVer );
			}
		}, inf.title, ["Update Now", "Skip", "Cancel"]);
	},
	
	/**
	 * 从服务器获取升级数据
	 */
	getUpdateData: function() {
		var xhr = new plus.net.XMLHttpRequest();
		xhr.onreadystatechange = function () {
	        switch ( xhr.readyState ) {
	            case 4:
	                if ( xhr.status == 200 ) {
	                	update.checkUpdateData(JSON.parse(xhr.responseText));
	                } else {
	                	log( "获取升级数据，联网请求失败："+xhr.status );
	                }
	                break;
	            default :
	                break;
	        }
		}
		xhr.open( "GET", server );
		xhr.send();
		log("获取升级数据地址：" + server);
	},
	
	/**
	 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
	 * @param {String} ov
	 * @param {String} nv
	 * @return {Boolean} 
	 */
	compareVersion: function( ov, nv ){
		if ( !ov || !nv || ov=="" || nv=="" ){
			return false;
		}
		var b=false,
		ova = ov.split(".",4),
		nva = nv.split(".",4);
		for ( var i=0; i<ova.length&&i<nva.length; i++ ) {
			var so=ova[i],no=parseInt(so),sn=nva[i],nn=parseInt(sn);
			if ( nn>no || sn.length>so.length  ) {
				return true;
			} else if ( nn<no ) {
				return false;
			}
		}
		if ( nva.length>ova.length && 0==nv.indexOf(ov) ) {
			return true;
		}
	},
	
	createDownload: function(url) {
		plus.nativeUI.toast( "Downloading...");
		var dtask = plus.downloader.createDownload(url, {timeout: 10, retry: 1}, function(download, status) {
			// 下载完成
			if (status == 200) {
				plus.runtime.openFile(download.filename);
			}
			else {
				showAlert("File download failed", function(){}, "Download error", "OK");
			}
		});
		/*
		dtask.addEventListener("statechanged", function(download, status) {
		 	if(download.state == 3 && download.totalSize != 0) { 
		 		percent = Math.floor(download.downloadedSize / download.totalSize * 100);
		 		plus.nativeUI.toast("Downloaded" + percent + "%");
		 	}
		}, false);
		*/
		dtask.start(); 
	}
}
