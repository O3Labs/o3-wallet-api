/*!
* O3 DApp JavaScript SDK
* Version: 0.0.1
* Created: Friday June 29 2018.
* https://o3.network
*
* Copyright 2018 O3 Labs, Inc.
* The O3 DApp JavaScript SDK is freely distributable under the MIT license.
*
*/

(function(root) {
	"use strict";
	root.o3 = root.o3 || {};
	root.o3.VERSION = "0.0.1";
}(this));


(function() {
	var root = this;

	var callbackHandler = {};
	o3.init = function(callback){
		callbackHandler = callback;
		_sendMessage("init");
	}

	//This is the method that both iOS and Android will call after the operation finished.
	o3.callback = function(response){
		callbackHandler(response);
	}

	_sendMessage = function(command, data){
		var message = {
			command:command,
			data:data
		};
		if (typeof O3AndroidInterface !== "undefined"){ 
			O3AndroidInterface.messageHandler(JSON.stringify(message))
		} else {
			try {
				webkit.messageHandlers.sendMessageHandler.postMessage(message);
			} catch(err) {
				o3.callback(null);
			}	
		}
	}

	o3.getDeviceInfo = function(){
		_sendMessage("getDeviceInfo");	
	}

	o3.requestToConnect = function(){
		_sendMessage("requestToConnect", window.location.href);
	}

	o3.getPlatform = function(){
		_sendMessage("getPlatform");
	}

	o3.getAccounts = function(){
		_sendMessage("getAccounts");
	}

	o3.isAppAvailable = function(){
		_sendMessage("isAppAvailable");
	}

	o3.getBalances = function() {
		_sendMessage("getBalances");
	}
	//TODO finish this
	o3.requestToSend = function() {

	}

	o3.verifySession = function(sessionID) {
		_sendMessage("verifySession", sessionID)
	}

	o3.requestToSignRawTransaction =  function(unsignedRawTransaction){
		_sendMessage("requestToSign",unsignedRawTransaction);
	}


})(this);


