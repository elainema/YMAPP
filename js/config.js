var debugMode = true;
var appUpdateCheckUrl = 'http://api.yeahmobi.com/data/static/update.json';
var APIS = {
	api: {
		url :"http://api.yeahmobi.com/"
	},
	login: {
		baseRrl : "http://api.yeahmobi.com/mobile/Account/login",
		method : "GET"
	},
	logout: {
		baseRrl : "http://api.yeahmobi.com/mobile/Account/logout",
		method : "GET"
	},
	setting: {
		baseRrl : "http://api.yeahmobi.com/mobile/Account/info",
		method : "GET"
	},
	bind: {
		baseRrl : "http://api.yeahmobi.com/mobile/Account/binding",
		method : "GET"
	},
	message: {
		baseRrl : "http://api.yeahmobi.com/mobile/Message/list",
		method : "GET"
	},
	mark: {
		baseRrl: "http://api.yeahmobi.com/mobile/Message/mark",
		method : "GET"
	},
	data: {
		baseRrl: "http://api.yeahmobi.com/mobile/Data/center",
		method : "GET"
	},
	paymentAccept: {
		baseRrl: "http://api.yeahmobi.com/mobile/Payment/prove",
		method : "GET"
	},
	paymentReject: {
		baseRrl: "http://api.yeahmobi.com/mobile/Payment/unprove",
		method : "GET"
	},
	search:{
		baseRrl: "http://api.yeahmobi.com/mobile/Offer/search",
		method : "GET"
	},
	setStatus:{
		baseRrl: "http://api.yeahmobi.com/mobile/Offer/setStatus",
		method : "GET"
	},
	setCaps:{
		baseRrl: "http://api.yeahmobi.com/mobile/Offer/EditCaps",
		method : "GET"
	},
	offerCountAff:{
		baseRrl: "http://api.yeahmobi.com/mobile/Offer/getoffercountaff",
		method : "GET"
	},
	geoList:{
		baseRrl: "http://api.yeahmobi.com/mobile/Offer/getGeoList",
		method : "GET"
	},
	payout:{
		baseRrl: "http://api.yeahmobi.com/mobile/Offer/settask",
		method : "POST"
	},
	redirect:{
		baseRrl: "http://api.yeahmobi.com/mobile/Offer/setRedirect",
		method : "GET"
	},
	setGeo:{
		baseRrl: "http://api.yeahmobi.com/mobile/offer/EditGeo",
		method : "GET"
	}
}