'use strict';

// アコーディオンメニューの定数
const AcdMenuConst = {
	STR_TRIGGER:	"js-acd_trigger",
	STR_TARGET:		"js-acd_target",
	STR_DATASET:	"acdId"
}

// アコーディオンメニューの管理オブジェクト
const AcdMenu = function(){
	
	// トリガー要素と開閉対象をセットにしたオブジェクト
	this.allAcdMenu = [];
	
};

// アコーディオンメニューのプロトタイプ設定
AcdMenu.prototype = {
	
	// 初期化処理
	init:			function(){
						// トリガーと開閉対象となる要素を全て取得
						const triggers = document.getElementsByClassName(AcdMenuConst.STR_TRIGGER);
						const targets = document.getElementsByClassName(AcdMenuConst.STR_TARGET);
						
						// 要素の数が合わなければ、エラーを返して、処理を中断する
						if(triggers.length != targets.length){
							return false;
						}
						
						// 各トリガーを基準に、それぞれの識別IDを取得する
						let triggerId = [];
						let targetId = [];
						
						
						for(let i = 0, ilen = triggers.length; i < ilen; i++){
							triggerId[i] = triggers[i].dataset[AcdMenuConst.STR_DATASET];
							targetId[i] = targets[i].dataset[AcdMenuConst.STR_DATASET];
							
							let height = 0;
							let trigger = null;
							let target = null;
							let display = "";
							
							// 識別IDが合わないものに関しては、デフォルトで、次の隣要素を開閉対象とする
							if(triggerId[i] != targetId[i]){
								
								// 高さを計算
								trigger = triggers[i];
								target = triggers[i].nextElementSiblings;
								display = target.style.display;
								height = this.calcHeightByClone(triggers[i].nextElementSiblings, display);
							}else{
								
								// 高さを計算
								trigger = triggers[i];
								target = targets[i];
								display = target.style.display;
								height = this.calcHeightByClone(targets[i], display);
							}
							// アコーディオンメニューに必要なデータを詰め込んだオブジェクト
							this.allAcdMenu[triggerId[i]] = {
																"trigger": trigger, 
																"target": target, 
																"targetH": height, 
																"display": display};
							
							// トリガー要素にイベントを付与していく
							this.addClickEvent(trigger, this.tglAcdMenu);
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
	tglAcdMenu:		function(eventTarget, self){
						
						let targetBox = self.allAcdMenu[eventTarget.dataset[AcdMenuConst.STR_DATASET]]["target"];
						let targetBoxH = self.allAcdMenu[eventTarget.dataset[AcdMenuConst.STR_DATASET]]["targetH"];
						let display = self.allAcdMenu[eventTarget.dataset[AcdMenuConst.STR_DATASET]]["display"];
						
						if(targetBox.offsetHeight <= 0){
							targetBox.style.display = display;
							self.slideDown(targetBox, targetBoxH);
						}else{
							self.slideUp(targetBox, targetBoxH);
						}
					},
					
	// スライドダウン処理
	slideDown:		function(targetBox, targetBoxH){
						
						let self = this;
						
						let slideNum = targetBoxH/400;
						
						if(targetBox.offsetHeight < targetBoxH){
							let trgBoxH = targetBox.offsetHeight + slideNum;
							targetBox.style.height = trgBoxH + "px";
							AcdMenuMediator.registerTimer(setTimeout(function(){self.slideDown(targetBox, targetBoxH);},3));
						}else{
							AcdMenuMediator.clearTimer();
							targetBox.style.height = targetBoxH + "px";
						}
					},
	
	// スライドアップ処理
	slideUp:		function(targetBox, targetBoxH){
						
						let self = this;
						
						let slideNum = targetBoxH/20;
						
						if(targetBox.offsetHeight >= slideNum){
							let trgBoxH = targetBox.offsetHeight - slideNum;
							targetBox.style.height = trgBoxH + "px";
							AcdMenuMediator.registerTimer(setTimeout(function(){self.slideUp(targetBox, targetBoxH);},3));
						}else{
							AcdMenuMediator.clearTimer();
							targetBox.style.height = 0;
							targetBox.style.display = "none";
						}
					},
	// スライド処理をするために必要なこと
	// 高さを取得するため
	// styleのheightはとれないため、windowオブジェクトに備わるメソッドを使用
	calcHeightByClone:	function(elm, display){
							let copyTarget = elm.cloneNode(true);
							copyTarget.style.cssText = "display: " + display + "; height: auto; visibility: hidden;";
							elm.parentNode.appendChild(copyTarget);
							let targetHeight = window.getComputedStyle(copyTarget).height.replace("px","");
							elm.parentNode.removeChild(copyTarget);
							return targetHeight;
						}
}

var AcdMenuMediator = {
	
	timer:	null,
	
	registerTimer:		function(timer){
							if(this.timer == null){
								return false;
							}
							
							this.timer = timer;
						},
						
	clearTimer:			function(timer){
							clearTimeout(timer);
							this.timer = null;
						}
}
