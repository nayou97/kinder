$(document).ready(function(){
	/* 현재시간 */
	var now = new Date();
	var year = String(now.getFullYear());
	var mon = now.getMonth()+1; if(mon < 10) mon = "0"+mon;
	var day = now.getDate(); if(day < 10) day = "0"+day;
	var hour = now.getHours(); if(hour < 10) hour = "0"+hour;
	var min = now.getMinutes(); if(min < 10) min = "0"+min;
	var thisTime = year + mon + day + hour + min;

	var cookieCk = new Array();
	var layerName = new Array();
	var layerIndex = new Array();
		
	$("#layerPopup [class ^= 'pop']").draggable();
	$("#layerPopup [class ^= 'pop']").each(function(idx){
		// 레이어 세팅
		layerName[idx] = $(this).attr("class");
		layerIndex[idx] = $(this).attr("data-zIndex");
		$(this).css({zIndex:$(this).attr("data-zIndex"), top:$(this).attr("data-top")+"px", left:$(this).attr("data-left")+"px",width:(Number($(this).attr("data-width")))+2+"px"});
		
		// 레이어 쿠키 체크
		cookieCk[idx] = $.cookie(layerName[idx]);
		if(cookieCk[idx]!="ck"){
			if($(this).attr("data-open") && $(this).attr("data-close")){// open, close 둘 다 값이 있을 때
				if(Number(thisTime) >= Number($(this).attr("data-open")) && Number(thisTime) < Number($(this).attr("data-close"))){
					$(this).show().css({display:"block"});
				}
			}else if(!($(this).attr("data-open")) && $(this).attr("data-close")){// open 없고, close 있을 때
				if(Number(thisTime) < Number($(this).attr("data-close"))){
					$(this).show().css({display:"block"});
				}
			}else{// open, close 둘 다 없을 때
				$(this).show().css({display:"block"});
			}
		};
	});

	$("#layerPopup [class ^= 'pop']").mousedown(function(){
		$("#layerPopup [class ^= 'pop']").each(function(idx){
			$(this).css({zIndex:layerIndex[idx]});
		});
		$(this).css({zIndex:$(this).attr("data-zIndex")+1000000});
	});

	$("#layerPopup [class ^= 'pop'] .layerToday").click(function(){
		//클릭한 버튼의 레이어 이름 적용
		$.cookie($(this).parent().parent("div").attr("class"), 'ck', { expires: 1 , path: '/' });
		$(this).parent().parent().fadeOut(200);
	});
	$("#layerPopup [class ^= 'pop'] .layerClose").click(function(){
		$(this).parent().parent().fadeOut(200);
	});
});
