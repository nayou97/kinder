/* 해당 사이트에만 적용 됨 */

// 파일 추가삭제
$(document).ready(function(){
	var filecount = new Array;
	var inpName = "fileNum";//인풋 네임
	var inpId = "fileName";//인풋 아이디
	
	if($("*").hasClass("fileWrap")){
		$(".fileWrap").each(function(idx){
			filecount[idx] = 0;
			$(".fileWrap").eq(idx).find("input").attr("name",inpName+idx);

			/* 추가하기 */
			$(".fileWrap:eq("+idx+") .add").click(function(){
				filecount[idx] ++;
				$(this).parents().siblings(".fileDiv:last").clone().appendTo($(".fileWrap").eq(idx));
				$(".fileWrap")
					.eq(idx).find(".fileDiv").last()
					.find("input").attr("name",inpName+filecount[idx])
					.last().attr("id",inpId+filecount[idx]);
				$(".fileWrap").eq(idx).find(".fileDiv").last().find("label").attr("for",inpId+filecount[idx]);
				$(".fileWrap").eq(idx).find(".fileDiv").last().find(".upload-name").val("파일선택");
				$(".fileWrap:eq("+idx+")").find(".fileDiv").last().find("input[name*='"+inpName+"']").attr("checked",false);
				chFile();
			});

			/* 삭제하기 */
			var fileMax = 1;
			var checkMax = 0;
			$(".fileWrap:eq("+idx+") .del").click(function() {
				var checkDiv = $(".fileWrap:eq("+idx+") input[name*='"+inpName+"']:checked");
				fileMax = $(".fileWrap:eq("+idx+") .fileDiv").length; //전체체크박스 갯수
				checkMax = $(".fileWrap:eq("+idx+") input[name*='"+inpName+"']:checked").length; //선택한 체크박스 갯수

				if(checkMax<fileMax){ //체크한게 전체보다 작으면 그냥 삭제처리.
					checkDiv.parent().parent().parent().parent().remove();
				}
				else if(fileMax=checkMax && fileMax>1){//체크가 전체 갯수와 같으면 모두 지우 되 첫번째는 파일명글자만 제거
					$(".fileWrap:eq("+idx+") .fileDiv:gt(0)").remove();
					$(".fileWrap:eq("+idx+") input[name*='"+inpName+"']").attr("checked",false);
					$(".fileWrap:eq("+idx+") .fileDiv:eq(0) .upload-name").val("파일선택");
					$(".fileWrap:eq("+idx+") .fileDiv:eq(0) .upload-hidden").val("");
				}
				else	if(fileMax=1){
					$(".fileWrap:eq("+idx+") .fileDiv .upload-name").val("파일선택");
					$(".fileWrap:eq("+idx+") .fileDiv .upload-hidden").val("");
					$(".fileWrap:eq("+idx+") input[name*='"+inpName+"']").attr("checked",false);
				}
			});

			/* 파일명 삽입 */
			function chFile(){
				var fileTarget = $(".fileWrap:eq("+idx+") .fileDiv .upload-hidden");
				fileTarget.on("change", function(){  // 값이 변경되면
					if(window.FileReader){// modern browser
						var filename = $(this)[0].files[0].name;
					} else { // old IE
						var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
					};
					// 추출한 파일명 삽입
					$(this).siblings('.upload-name').val(filename);
				});
			};chFile();
		});//end each
	};//end if - hasClass


});//end ready


//------------------------------------------------------------------------------------------------------
// 2016.02.28 - hoonseok 추가 소스 1
//------------------------------------------------------------------------------------------------------
/* 게시판 이미지 첨부파일 */
$(document).ready(function(){
	if($("*").hasClass("fileWrap")){
		var filecount=0;
		$(".fileWrap .add").click(function(){
			filecount++;
			// ▼ 수정 V01
			if(filecount >= 10){
				alert("이미지는 총 10개 까지 추가하실 수 있습니다");
				return;
			}
			//$( ".fileWrap .fileDiv:last").clone().appendTo( ".fileWrap").find("input").attr("name","file_img[]");
		});

		$(".fileWrap .del").click(function(){
			if(filecount > 0){
				$( ".fileWrap .fileDiv:last" ).remove();
				filecount--;
			}
		});
	};
	
});


//------------------------------------------------------------------------------------------------------
// 2016.03.03 - hoonseok 추가 소스 3 
//------------------------------------------------------------------------------------------------------

/* 회원가입 원아찾기 항목 추가 */
$(document).ready(function(){
	if($("*").hasClass("kidSearchWrap")){
		var filecount=0;
		$(".kidSearchWrap .add").click(function(){
			filecount++;
			$( ".kidSearchWrap .kidInputDiv:last").clone().appendTo( ".kidSearchWrap").find(".join_normal").attr("id","kid_name_"+filecount).attr("onclick","layer_open('layer2',"+filecount+")");
			$( ".kidSearchWrap .kidInputDiv:last").find(".in").attr("id","kid_code_"+filecount);   
			$( ".kidSearchWrap .kidInputDiv:last").find(".btn a").attr("onclick","layer_open('layer2',"+filecount+")");
			$("#kid_name_"+filecount).val("");
			$("#kid_code_"+filecount).val("");
		});

		$(".kidSearchWrap .del").click(function(){
			if(filecount > 0){
				$( ".kidSearchWrap .kidInputDiv:last" ).remove();
				filecount--;
			}
		});
	};
	return false;
});



















//비밀번호입력 레이어팝업
$(document).ready(function(){
	$('.list_normal a.secret').on('click', function(){
	$('.secret.layerPop').fadeIn(200);
	layerPopupCenter();
	});
	$('.layerClose, .secret_btn').on('click', function(){
	$('.secret.layerPop').fadeOut(200);
	});

	/* 화면 중앙맞추기 */
	$(window).resize(function(){
	layerPopupCenter();
	});
	function layerPopupCenter(){
	var winW = $(window).width()/2;
	var winH = $(window).height()/2;
	var width = $('.secret.layerPop .inner').width()/2;
	var height = $('.secret.layerPop .inner').height()/2;

	$('.secret.layerPop').css({
	left:winW - width, top:winH - height
	});
	}
});

//원아찾기 레이어팝업
$(document).ready(function(){
	$('.kidSearchWrap a.kidSearchBtn').on('click', function(){
	$('.kid.layerPop').fadeIn(200);
	layerPopupCenter();
	});
	$('.layerClose, .kid_btn').on('click', function(){
	$('.kid.layerPop').fadeOut(200);
	});

	/* 화면 중앙맞추기 */
	$(window).resize(function(){
	layerPopupCenter();
	});
	function layerPopupCenter(){
	var winW = $(window).width()/2;
	var winH = $(window).height()/2;
	var width = $('.kid.layerPop .inner').width()/2;
	var height = $('.kid.layerPop .inner').height()/2;

	$('.kid.layerPop').css({
	left:winW - width, top:winH - height
	});
	}
});

//아이디중복확인 레이어팝업
$(document).ready(function(){
	$('a.idCheckBtn').on('click', function(){
	$('.idCheck.layerPop').fadeIn(200);
	layerPopupCenter();
	});
	$('.layerClose, .idCheck_btn').on('click', function(){
	$('.idCheck.layerPop').fadeOut(200);
	});

	/* 화면 중앙맞추기 */
	$(window).resize(function(){
	layerPopupCenter();
	});
	function layerPopupCenter(){
	var winW = $(window).width()/2;
	var winH = $(window).height()/2;
	var width = $('.idCheck.layerPop .inner').width()/2;
	var height = $('.idCheck.layerPop .inner').height()/2;

	$('.idCheck.layerPop').css({
	left:winW - width, top:winH - height
	});
	}
});



//스마트알림장
$(window).load(function(){
	$(".childInfor a").on("click",function(){
		$(".childInfor>div").toggle();
	});

	$(".cmt .title h4+div a").on("click",function(){
		$(".cmt .title .box").toggle();
	});
});

////////////////////////////////////////////////////////////////라디오버튼 제어
/* 원아찾기:성별 */
$(document).ready(function(){
	$(".ckRadio.child>div>span").click(function(){
		$(".ckRadio.child input").prop("checked",false)
		$(".ckRadio.child>div>span").removeClass("on");
		$(this).find("input").prop("checked",true);
		$(this).addClass("on");
		//console.log($(".ckRadio input:checked").val());
	});	
});

/* 스마트알림장>기본입력:기분상태 */
$(document).ready(function(){
	$(".ckRadio.condition1>div>span").click(function(){
		$(".ckRadio.condition1 input").prop("checked",false)
		$(".ckRadio.condition1>div>span").removeClass("on");
		$(this).find("input").prop("checked",true);
		$(this).addClass("on");
		//console.log($(".ckRadio input:checked").val());
	});	
});
/* 스마트알림장>기본입력:건강상태 */
$(document).ready(function(){
	$(".ckRadio.condition2>div>span").click(function(){
		$(".ckRadio.condition2 input").prop("checked",false)
		$(".ckRadio.condition2>div>span").removeClass("on");
		$(this).find("input").prop("checked",true);
		$(this).addClass("on");
		//console.log($(".ckRadio input:checked").val());
	});	
});
/* 스마트알림장>기본입력:체온상태 */
$(document).ready(function(){
	$(".ckRadio.condition3>div>span").click(function(){
		$(".ckRadio.condition3 input").prop("checked",false)
		$(".ckRadio.condition3>div>span").removeClass("on");
		$(this).find("input").prop("checked",true);
		$(this).addClass("on");
		//console.log($(".ckRadio input:checked").val());
	});	
});

////////////////////////////////////////////////////////////////체크박스 제어
/* 비밀글,공지여부 */
$(document).ready(function(){
	$(".ckCheck>div>span").click(function(){
		$(".ckCheck input").prop("checked",false)
		$(".ckCheck>div>span").removeClass("on");
		$(this).find("input").prop("checked",true);
		$(this).addClass("on");
		//console.log($(".ckCheck input:checked").val());
	});	
});
/* 회원가입>이용약관동의 */
$(document).ready(function(){
	$(".member input, .member label").click(function(){
		
		$(this).toggleClass("on");
		
	});	
});





























