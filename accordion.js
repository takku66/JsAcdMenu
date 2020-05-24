'use strict';

var JsAcdMenu = JsAcdMenu || {};

JsAcdMenu.defaultConf = {
	isAllOpen: true,		// true：全てオープン、false：data-acd-openが"true"の要素のみオープン
	transition: "all 0.5s ease 0s"
};

(function(){
	
	const _am = JsAcdMenu;
	
	// アコーディオンメニューの定数
	const AcdMenuConst = {
		CLASS_TRIGGER:	"js-acd_trigger",
		CLASS_TARGET:		"js-acd_target",
		DS_ACD_ID:	"acdId",
		DS_ACD_OPEN:	"acdOpen"	// true or other
	}

	// アコーディオンメニューの管理オブジェクト
	_am.AcdMenu = function(){
		
		// トリガー要素と開閉対象をセットにしたオブジェクト
		this.allAcdMenu = [];
		
	};

	// アコーディオンメニューのプロトタイプ設定
	_am.AcdMenu.prototype = {
		
		// 初期化処理
		init:			function(){
							
							// トリガーと開閉対象となる要素を全て取得
							const triggers = document.getElementsByClassName(AcdMenuConst.CLASS_TRIGGER);
							const targets = document.getElementsByClassName(AcdMenuConst.CLASS_TARGET);
							
							// 要素の数が合わなければ、エラーを返して、処理を中断する
							if(triggers.length != targets.length){
								console.log("トリガーと開閉対象の要素数が合いません。");
								return false;
							}
							
							let triggerId = '';
							let targetId = '';
							let isDefaultOpen = '';
							
							for(let i = 0, ilen = triggers.length; i < ilen; i++){
							
								// トリガー要素と開閉対象要素のdatasetを取得する
								triggerId = triggers[i].dataset[AcdMenuConst.DS_ACD_ID];
								targetId = targets[i].dataset[AcdMenuConst.DS_ACD_ID];
								isDefaultOpen = targets[i].dataset[AcdMenuConst.DS_ACD_OPEN] || false;
								
								// デフォルトのI （例：acd_0）
								let acdId = 'acd_' + i;
								
								// 要素の各設定値
								let height = 0;
								let trigger = null;
								let target = null;
								
								// トリガーオブジェクトを設定
								trigger = triggers[i];
								
								// 識別IDが合わないものに関しては、デフォルトで、次の隣要素を開閉対象とする
								if(triggerId != targetId || typeof(triggerId) === 'undefined' || typeof(targetId) === 'undefined' ){
									
									trigger.dataset[AcdMenuConst.DS_ACD_ID] = acdId;
									// 開閉対象オブジェクトを設定
									target = trigger.nextElementSibling;
									target.dataset[AcdMenuConst.DS_ACD_ID] = acdId;
									
								}else{
									
									// アコーディオンメニューオブジェクトのIDを設定する
									acdId = triggerId;
									target = targets[i];
									
								}
								
								// 高さの計算
								target.style.height = "auto";
								height = window.getComputedStyle(target).height.replace("px","");
								
								// アコーディオンメニューに必要なデータを詰めたオブジェクト
								this.allAcdMenu[acdId] = {
																	"trigger": trigger, 
																	"target": target, 
																	"targetH": height
															};
								
								// 開閉対象のスタイルを設定する
								target.style.overflow = "hidden";
								target.style.transition = _am.defaultConf.transition;
								
								// デフォルト設定が、全て開く設定 or datasetの値が開く設定の場合のみ、heightを設定
								if(_am.defaultConf.isAllOpen === true || isDefaultOpen === "true"){
									target.style.height = height + "px";
									target.dataset[AcdMenuConst.DS_ACD_OPEN] = "true";
								}else{
									target.style.height = "0px";
								}
								
								// トリガー要素にイベントを付与していく
								this.addClickEvent(trigger, this.toggleMenu);
								
							}
							
							return true;
						},
		
		// トリガー要素に、クリックイベントを付与する
		addClickEvent:	function(applyObj, fnc){
							
							let self = this;
							
							applyObj.addEventListener('click', function(){
								fnc(applyObj, self);
							}, false);
							
						},
		
		// アコーディオンの開閉を処理する
		toggleMenu:		function(eventTarget, self){
							
							let targetBox = self.allAcdMenu[eventTarget.dataset[AcdMenuConst.DS_ACD_ID]]["target"];
							let targetBoxH = self.allAcdMenu[eventTarget.dataset[AcdMenuConst.DS_ACD_ID]]["targetH"];
							
							if(targetBox.dataset[AcdMenuConst.DS_ACD_OPEN] === "true"){
								targetBox.style.height = "0px";
								targetBox.dataset[AcdMenuConst.DS_ACD_OPEN] = "false";
								
							}else{
								targetBox.style.height = targetBoxH + "px";
								targetBox.dataset[AcdMenuConst.DS_ACD_OPEN] = "true";
							}
						}
		}
		
		window.addEventListener('DOMContentLoaded', function(){
		new _am.AcdMenu().init();
		},false);
		
}(this));

