/* ************************ COMMON **************************** */
/* ************************페이지 인쇄 START************************ */
//ie 에서 레이어창 안 닫히게 하기 위해서
/*
var parentOk="N";
if(parent && parent!=this) {
	parent.parentOk="Y";		//parent.변수 부모창 변수값 변환
	parentOk="Y";				//현재창 변수값 변환
	//alert("부모님 있음"); 
}
*/

(function ($) {
    $.fn.replaceClass = function (pFromClass, pToClass) {
        return this.removeClass(pFromClass).addClass(pToClass);
    };
}(jQuery));


(function ($) {
    $.fn.replaceClass2 = function (pFromClass, pToClass) {
        return this.removeClass(pFromClass).addClass(pToClass);
    };
}(jQuery));

$(document).ready(function(){
    var beforePrint = function() {
		//$('body').css('background-color', 'red');
		//window.alert(parentOk);

		//if(parentOk=="N") {
			for(var i=1; i<=12; i++) {
				var colXs = ".col-xs-"+i+"";
				var colSm = ".col-sm-"+i+"";
				var colMd = ".col-md-"+i+"";
				var colLg = ".col-lg-"+i+"";


				$(colXs).replaceClass(colXs.replace(/\./g,""),'printClassXs-'+i+' '+colXs.replace(/\./g,"")+'');
				$(colSm).replaceClass(colSm.replace(/\./g,""),'printClassSM-'+i+' '+colXs.replace(/\./g,"")+'');
				$(colMd).replaceClass(colMd.replace(/\./g,""),'printClassMD-'+i+' '+colXs.replace(/\./g,"")+'');
				$(colLg).replaceClass(colLg.replace(/\./g,""),'printClassLG-'+i+' '+colXs.replace(/\./g,"")+'');
			}			
			$('.hidden-xs').replaceClass('hidden-xs','printClassHidden-xs');
			
			$(".snb.affix").css({position:"absolute",top:"80px"});

	        console.log('Functionality to run before printing.');
		//}
    };
    var afterPrint = function() {
		//if(parentOk=="N") {
			console.log('Functionality to run after printing');

			for(var i=1; i<=12; i++) {
				var colXs = ".col-xs-"+i+"";
				var colSm = ".col-sm-"+i+"";
				var colMd = ".col-md-"+i+"";
				var colLg = ".col-lg-"+i+"";

				$(colXs).replaceClass2(colXs.replace(/\./g,""),'');
				$(colSm).replaceClass2(colSm.replace(/\./g,""),'');
				$(colMd).replaceClass2(colMd.replace(/\./g,""),'');
				$(colLg).replaceClass2(colLg.replace(/\./g,""),'');

				$('.printClassXs-'+i+'').replaceClass2('printClassXs-'+i+'',colXs.replace(/\./g,""));
				$('.printClassSM-'+i+'').replaceClass2('printClassSM-'+i+'',colSm.replace(/\./g,""));
				$('.printClassMD-'+i+'').replaceClass2('printClassMD-'+i+'',colMd.replace(/\./g,""));
				$('.printClassLG-'+i+'').replaceClass2('printClassLG-'+i+'',colLg.replace(/\./g,""));
			}
			$('.printClassHidden-xs').replaceClass2('printClassHidden-xs','hidden-xs');
			
			$(".snb.affix").css({position:"",top:""});			//affix 사용할 경우 position, top 빈값으로 넣어줘야 함
			$('.snb').affix({offset: {top:80} });
			//$('.snb').affix({offset: {top: 80, bottom: $('header').outerHeight(true)} });
		//}
    };

	//크롬, 파이어폭스, 오페라
    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }

	//오페라, 파이어폭스, 엣지, IE 적용
	window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
});
/* ************************페이지 인쇄 END************************ */


var console = window.console || {log:function(){}};//ie8 콘솔로그 오류 제거
var easingType1 = "easeInOutExpo";
var easingType2 = "easeInOutCubic";

// 접속 디바이스 체크
var deviceCk = "win16|win32|win64|mac|macintel";
var device;
if(navigator.platform){
	if( deviceCk.indexOf(navigator.platform.toLowerCase())<0 ){
		device = "mobile";
	}else{
		device = "pc";
		$("[href*='tel:']").contents().unwrap(); //PC면 tel링크 안 먹게 하기.
		$("area[href*='tel:']").remove();
	}
}


/* ************************ document ready **************************** */
$(document).ready(function(){
	set();//기본 전역변수 세팅
	winH100();//하면높이 100% 잡기
	goTop();// 최상단 올리기
	square();// 가로크기 기준으로 정사각형 만들기
	typeCube();//격자형 구조를 테이블 방식으로 사용하기
	insertBg();// 배경이미지로 넣기
	momBg();// 이미지를 부모의 배경으로 깔아버리기
	imgPop();// 갤러리 인증서 등 작은 이미지 클릭할 때 큰 이미지로 보여주기.
	filebox();//첨부파일
	ratio();// 엘리먼트를 비율에 맞춰서 조정하기
});


/* ************************ window load **************************** */
$(window).load(function(){
	sameH();// 자식들 높이 같게 만들기
	momH();// 부모 높이와 같게 만들기
	aniUse();//페이지 스크롤 애니메이션 사용하기
	tc();//table-cell안의 이미지가 max-width를 먹지 않을 때 사용 함.
	
	// 리사이즈는 마지막에 한 번 - 꼭 마지막에 한 번만!
	$(window).trigger("resize");
});


/* ************************ function **************************** */
// 기본 변수들 세팅
function set(){
	winH = $(window).height();
	winW = $(window).width();	
};


// 높이를 화면 100%
function winH100(){
	$(window).resize(function(){
		if(device == "pc"){
			$(".winH100").css({height:$(window).height()+"px"});
		}else{
			$(".winH100").css({height:screen.height+"px"});
		}
	});
	return false;
}


// 최상단 올리기
function goTop(){
	if($("#gotop").length){
		var scTop;
		$(window).scroll(function(){
			scTop = $(window).scrollTop();
			if (scTop >= $("header").height()) {
				$("#gotop").css({opacity:"1"});
			} else {
				$("#gotop").css({opacity:"0"});
			}
		});
		$("#gotop").click(function(){
			if(device == "pc"){
				$("html, body").stop().animate({scrollTop:0},500);
			}else{
				$("html, body").stop().animate({scrollTop:0},0);
			}
			return false;
		});
	};
};


// 가로크기 기준으로 정사각형 만들기
function square(){
	if($(".square").length){
		$(window).resize(function(){
			$(".square ").each(function(idx){
				$(".square:eq("+idx+")").children().css({height:$(".square:eq("+idx+")").children().width()+"px"});
			});
		});
		return false;
	}
};


/* 격자형 구조 - 테이블 스타일 / 스타일과 병행 함 */
/* style : typeCube 참조 */
function typeCube(){
	if($(".typeCube").length){
		var winW, type, nowType;
		var first = true;
		var maxNum = new Array();
		var dataValue = new Array();
		var modeNum = new Array();
		var snum = new Array();
		$(".typeCube>*").addClass("cube");
		
		/* ie에서는 table-cell 안의 이미지가 max-width를 처리하지 못함에 대응. */
		var agent = navigator.userAgent.toLowerCase();
		if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
			$(".typeCube .cube img").css({width:"0"});
		}

		//리사이즈 하면 화면 넓이 구해서 해당 타입의 번호를 찾음.
		typeNum = "none";
		$(window).resize(function(){
			winW = $(window).width();
			if(winW<768) typeNum = "0";//xs
			if(winW>=768 && winW<992) typeNum = "1";//sm
			if(winW>=992 && winW<1024) typeNum = "2";//md
			if(winW>=1024) typeNum = "3";//lg
			$(".typeCube .cube").css({height:""}); // 높이를 초기화
			
			//if(typeNum != nowType){ //리사이즈할 때 분기점이 바뀔 때만 동작하도록...
				if(!first) $(".typeCube .cube").unwrap();
				first = false;
				nowType = typeNum;
				$(".typeCube").each(function(i){
					modeNum[i] = new Array();
					maxNum[i] = $(this).children().length;
					dataValue[i] = $(this).attr("data-type");

					for(var a=0; a<4; a++){
						modeNum[i][a] = dataValue[i].split(" ")[a].slice(2);
						snum[i] = modeNum[i][typeNum];//가로갯수
					}

					var count = 1;
					$(this).find(".cube").each(function(idx){//개별 요소 분리를 위해 클래스 생성 추가.
						if(idx >= snum[i]*count){
							count++;
						}
						$(this).removeClass(function (index, css){ //wrap로 시작하는 클래스 모두 삭제하고 다시 wrap클래스 추가
						   return (css.match (/(^|\s)wrap\S+/g) || []).join(' ');
						});
						$(this).addClass("wrap"+count);
						
						/* ie에서는 table-cell 안의 이미지가 max-width를 처리하지 못함에 대응. */
						if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
							$(this).find("img").css({width:$(this).find("img").parent().innerWidth()+"px"});
						}
					});
					
					$(".typeCube").eq(i).find(".cube").css({width:100/snum[i]+"%"});
					for(var a=0;a<=maxNum[i]/snum[i];a++){
						$(".typeCube").eq(i).find(".wrap"+a+"").wrapAll("<div class='tableWrap'></div>").css({height:$(".typeCube").eq(i).find(".wrap"+a+"").parent().height()+"px"});
						console.log($(".typeCube").eq(i).find(".wrap"+a+"").parent().height()+"px");
					}
				});//end each
			//};//end if typeNum 비교
		});//end resize
		return false;
	};//end if
};


// 갤러리등 이미지를 부모의 BG로 깔아버리고 안 보이게 하기
function insertBg(){
	if($(".insertBg").length){
		$(".insertBg img").css({display:"none"});//실제 img는 안보이게 처리

		$(".insertBg .img").each(function(){//이미지를 배경으로 집어 넣기
			$(this).css({backgroundImage:"url('"+$(this).find("img").attr("src")+"')"});
		});
		$(".insertBg").each(function(idx){//한 페이지에 다수의 insertBg가 있을 수 있으므로 개별적으로 처리함.
			if($(this).attr("data-ratioH")){
				$(window).resize(function(){//리사이즈에 대응
					var ratio = $(".insertBg:eq("+idx+")").attr("data-ratioH");//세로비율 찾고
					var imgW = $(".insertBg:eq("+idx+") .img:first").width();
					$(".insertBg:eq("+idx+") .img").css({height:parseInt(imgW*(ratio/100))+"px"});
				});
			};
		});	
		
		$(".insertBg .img").css({//모든 img클래스에 동일한 스타일
			display:"block",overflow:"hidden",
			backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"
		});
		
		//목록 이미지 업로드 하지 않았을때 적용
		$(".insertBg .img").each(function(idx){			//목록이미지 없으면
			if(0<$(".insertBg .img:eq("+idx+") img.nonImg").length) {
				$(".insertBg .img:eq("+idx+")").css({//모든 img클래스에 동일한 스타일
					display:"block",overflow:"hidden",
					backgroundRepeat:"no-repeat",backgroundPosition:"center"
				});
			}else{
				$(".insertBg .img:eq("+idx+")").css({//모든 img클래스에 동일한 스타일
					display:"block",overflow:"hidden",
					backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"
				});
			}
		});
	};
};


// 이미지를 부모의 배경으로 깔아버리기
function momBg(){
	if($(".momBg").length){
		$(".momBg img").css({display:"none"});//실제 img는 안보이게 처리
		$(".momBg").css({//모든 img클래스에 동일한 스타일			
			backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"		
		});
		$(".momBg").each(function(){//이미지를 배경으로 집어 넣기
			$(this).css({backgroundImage:"url('"+$(this).find("img").attr("src")+"')"});
		});
	};
};


// 갤러리 인증서 등 작은 이미지 클릭할 때 큰 이미지로 보여주기.
function imgPop(){
	if($(".imgPop").length){
		$(".imgOpen").fadeOut(1);
		$(".imgOpen").css({zIndex:"999999",position:"fixed",left:"0",top:"0",width:"100%",height:"0", overflow:"hidden",backgroundColor:"rgba(0,0,0,.8)"});
		$(".imgOpen>div").css({display:"table",width:"100%",height:"100%"});
		$(".imgOpen>div>div").css({display:"table-cell",overflow:"hidden",width:"100%",padding:"30px",textAlign:"center",verticalAlign:"middle"});

		$(".imgPop a").click(function(){
			scrollYpos = $(window).scrollTop();
			$("html,body").css({position:"fixed",top:-scrollYpos});
			var imgName = $(this).find("img").attr("src");
			$(".imgOpen").css({height:"100%"}).fadeIn(100);
			$(".imgOpen img").attr("src",imgName).css({maxHeight:"100%",maxWidth:"100%",cursor:"pointer",border:"10px solid #fff"});
		});

		$(".imgOpen").click(function(){
			$(this).fadeOut(100);
			$("html,body").css({position:"", top:""}).scrollTop(scrollYpos);
		});
		
		$(window).resize(function(){
			winH = $(window).height();
			winW = $(window).width();
			$(".imgOpen>div>div").css({height:winH+"px"});			
		});
		return false;
	};
};


//첨부파일
function filebox(){
	if($(".filebox").lenght){
		var fileTarget = $(".filebox .upload-hidden");
		fileTarget.on("change", function(){ //값이 변경되면
			if(window.FileReader){ //modern browser
				var filename = $(this)[0].files[0].name;
			}else { //old IE
				var filename = $(this).val().split("/").pop().split("\\").pop(); //파일명만 추출
			} //추출한 파일명 삽입
			$(this).siblings(".upload-name").val(filename);
		});
	};
};


// 엘리먼트를 비율에 맞춰서 조정하기
function ratio(){
	if($(".ratio").length){
		$(window).resize(function(){//리사이즈에 대응
			$(".ratio").each(function(idx){//여러 개 일수 있으므로 개별적으로 처리함
				var ratio = $(".ratio").eq(idx).attr("data-ratioH");
				var objW = $(".ratio").eq(idx).width();
				$(".ratio").eq(idx).css({height:parseInt(objW*(ratio/100))+"px", overflow:"hidden"});
			});
		});
		return false;
	};
};


// ani 클래스로 스크롤시 애니메이션 주기 / common-ani.css 병행
function aniUse(){
	if($("body").hasClass("aniUse")){
		var docTop;
		$(window).resize(function(){
			activeFn();
		});
		$(window).scroll(function(){
			docTop = $(this).scrollTop();
			activeFn();
		}).scroll();

		// ani 기본 세팅 / 각각 경우에 따라 다름. 개별 세팅시에는 아래 구문 주석처리.
		//$(".spec *").addClass("ani"); //어떤 놈에 적용할지 일괄 선택할 때 정의. 원하는 놈에 ani 클래스 넣어도 괜찬음.
		//$(".business > *").addClass("ani"); //어떤 놈에 적용할지 일괄 선택할 때 정의. 원하는 놈에 ani 클래스 넣어도 괜찬음.

		// ani클래스의 위치값 배열에 넣고
		var posArray = new Array;
		$(".ani").each(function(idx){
			posArray[idx]= Math.ceil($(".ani").eq(idx).offset().top);
			console.log(posArray[idx]);
		});

		// 화면 리사이즈 때 마다 호출.
		function activeFn() {
			docTop = $(window).scrollTop() + $(window).height();
			if(docTop <= $(window).height()){
				$(".ani").removeClass("ani_on").css({opacity:0});
			}
			$(".ani").each(function(idx){
				if(docTop >= posArray[idx]) $(".ani").eq(idx).addClass("ani_on").css({opacity:1});
			});
		};
	};//end if
};


// 자식들 높이 같게 만들기
function sameH(){
	if($(".sameH").length){
		var maxH;
		$(window).resize(function(){
			 $(".sameH").children().css({minHeight:""});
			 $(".sameH").each(function(idx){
				var itemH = $(".sameH:eq("+idx+")").children().map(function(){
					return $(this).outerHeight();
				}).get(),
				maxH = Math.max.apply(null, itemH);
				$(".sameH:eq("+idx+")").children().css({minHeight:maxH});
				//console.log(idx+"번째 : "+maxH);
			 });
		});		
		return false;
	};
};


// 부모 높이와 같게 만들기
function momH(){
	if($(".momH").length){
		var maxH;
		$(window).resize(function(){
			 $(".momH").css({minHeight:""});
			 $(".momH").each(function(idx){
				maxH = $(".momH:eq("+idx+")").parent().height();
				$(".momH:eq("+idx+")").css({minHeight:maxH});
				console.log(idx+"번째 : "+maxH);
			 });
		});
		return false;
	};
};


// 클릭 시 해당 위치로 스크롤하기
function movePos(){
	if($(".movePos").length){
		// movePos 클래스 찾아서 위치값을 저장
		var posArray = new Array;
		function rePosFn(){
			$(".movePos").each(function(idx){
				posArray[idx]= Math.ceil($(".movePos").eq(idx).offset().top);
				console.log(posArray[idx]);
			});
		};
		
		// 로고 클릭
		$("h1 img").on("click",function(){
			$("html, body").stop().animate({scrollTop:0}, 800,easingType1);
		});
		
		// gnb메뉴 클릭
		$(".gnb a").on("click",function(){
			rePosFn();
			var idx = $(this).parent().index();
			$("html, body").stop().animate({scrollTop:posArray[idx]}, 800,easingType1);
		});
		
		// 스크롤시
		$(window).scroll(function(){
			var scrollTop = $(this).scrollTop();
			var scrollTop = $(window).scrollTop() + $(window).height()/2;
			if(scrollTop <= $(window).height()){
				$(".gnb li").removeClass("on");
			}
			$(".movePos").each(function(idx){
				if(scrollTop >= posArray[idx]){
					$(".gnb li").removeClass("on");
					$(".gnb li").eq(idx).addClass("on");
				};
			});
		});//end scroll()
	}//end if - movePos
}


// 스크롤시 픽스시키기 (하위메뉴 등 사용)
// .fix 클래스를 픽스시키며, fixOn이 고정되었을 때 스타일임. css파일에서 별도로 정의해서 사용 함.
// .fix 요소를 absolute로 위치를 잡는 것이 모바일 등 대응이 편리함.
// 부트스트랩의 affix와 같은 기능.
function fixPos(){
	if($(".fix").length){
		$(window).scroll(function(){
			var fixTop = $(".fix").attr("data-top");
			var scTop = $(window).scrollTop();
			if (scTop >= fixTop) $(".fix").addClass("fixOn");
			else $(".fix").removeClass("fixOn");
		});
	}
};


// table-cell 안의 이미지가 max-width를 먹지 않을 때 사용 함.
function tc(){
	var agent = navigator.userAgent.toLowerCase();
	if($(".tc").length){
		if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
			$(".tc img").css({width:$(".tc").find("img").parent().width()+"px"});
		}
	};
};

