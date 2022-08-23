/* ▼ 수정 V01, 수정 v1703 */
//------------------------------------------------------------------------------------------------------
// 2016.08.08 - hoonseok 추가 소스 4 
//------------------------------------------------------------------------------------------------------

/* 공통 PUSH 처리 */
// senderGbn : 보내는 사용자 구분 (10 학부모, 20 선생님, 90 원장님)
// pushGbn : push 처리 항목(알림장,공지사항,가정통신문 등)

function do_common_gcm_push(orgCd,pushGbn,senderGbn,senderId,sid,message,kidCd){

	var jdata = {'orgCd':orgCd, 'pushGbn':pushGbn, 'kid_code':kidCd, 'sender_gbn':senderGbn, 'sender_id': senderId ,'message':message, 'linkSeqId':sid};

	//  안드로이드 전송
	var setUrl = "/app/model/push/gcm/gcm_common_push_sender.php";

	//console.log(JSON.stringify(jdata));

	$.ajax({
		type:'POST',
		url : setUrl,
		cache : false,
		data : jdata,
		dataType: "json",
		error : function(req){
			//alert(JSON.stringify(req));
			console.log("push send fail[ERR:A002]!!");
		},
		success : function(res,status,req){
			//alert(JSON.stringify(res));
			console.log(JSON.stringify(res));
		}
	});
/*
	// 아이폰 전송
	var setUrl = "/app/model/push/apns/apns_common_push_sender.php";
	$.ajax({
		type:'POST',
		url : setUrl,
		cache : false,
		data : jdata,
		dataType: "json",
		error : function(req){
			//alert(JSON.stringify(req));
			//console.log(JSON.stringify(res));
			console.log("push send fail[ERR:I002]!!");
		},
		success : function(res,status,req){
			console.log(JSON.stringify(res));
		}
	});
	*/
}



/* ▼ 수정 V01, 수정 v1703 */
//------------------------------------------------------------------------------------------------------
// 2016.10.28 - hoonseok 추가 소스 5 
//------------------------------------------------------------------------------------------------------

/* 회원가입 후 회원인증요청 PUSH 처리 */

function do_auth_gcm_push(orgCd,memberId,kidCd,memberName,kidCnt){

	var setUrl = "/app/model/push/gcm/gcm_auth_push_sender.php";
	var jdata = {'orgCd':orgCd, 'join_member_id':memberId ,'kid_code':kidCd, 'join_member_name':memberName, 'kid_cnt':kidCnt};
	//console.log("1 : " + setUrl + JSON.stringify(jdata));

	//  안드로이드 전송
	$.ajax({
		type:'POST',
		url : setUrl,
		cache : false,
		data : jdata,
		dataType: "json",
		error : function(req){
			//console.log(JSON.stringify(req));
			console.log("PUSH 메시지 전송 중 오류가 발생하였습니다");
		},
		success : function(res,status,req){
			console.log("메시지 전송 성공");
			//console.log(JSON.stringify(res));
		}
	});
/*
	// 아이폰 전송
	var setUrl = "/app/model/push/apns/apns_auth_push_sender.php";
	$.ajax({
		type:'POST',
		url : setUrl,
		cache : false,
		data : jdata,
		dataType: "json",
		error : function(req){
			//alert(JSON.stringify(req));
			//console.log(JSON.stringify(res));
			console.log("push send fail[ERR:I002]!!");
		},
		success : function(res,status,req){
			console.log(JSON.stringify(res));
		}
	});
	*/
}
