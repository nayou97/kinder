let CONF_UPLOAD = [];
CONF_UPLOAD['max_size'] = 10240;
CONF_UPLOAD['total_max_size'] = 51200;
CONF_UPLOAD['total_max_count'] = 10;

//요일 한글표시
moment.lang('kr', {
    weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
});

function getCsrf() {
    return $("input[name='csrf_field']").val();
}

function getLocale() {
    var path_name = window.location.pathname;
    var arr_path = path_name.toString().split('/');
    const regex = RegExp('^(kr|en|jp|cn)$', 'gi');

    locale = "";
    if (regex.test(arr_path[1])) {
        locale = "/" + arr_path[1].toString().toLowerCase();
    }
    return locale;
}
function getLangMsg(str) {
    var result;
    $.ajax({
        type: "get",
        url: getLocale() + "/common/getmessage/" + str,
        processData: false,
        contentType: false,
        async: false,
        dataType: 'text',
        success: function (msg) {
            result = msg;
        }
    });
    return result;
}

function uploadImage(obj) {
    var file_kind = $(obj).val().lastIndexOf('.');
    var file_name = $(obj).val().substring(file_kind + 1, obj.length);
    var file_type = file_name.toLowerCase();
    if (file_name != '') {
        var accept_type = $(obj).attr("accept").toString();
        var check_file_type = accept_type.replace(/[\.\s*]/g, '').split(",");
        if (check_file_type.indexOf(file_type) == -1) {
            $('#modal-check .modal-body').html("<div class='text-center'>(" + accept_type + ") " + getLangMsg('upload_type_fail') + "</div>");
            $('#modal-check').modal('show');
            $(obj).val('');
            return false;
        } else {
            var reader = new FileReader();
            reader.onload = function (e) {
                if ($('.thumb_btn').hasClass('on')) {
                    $('#thumb_preview').attr('src', e.target.result);
                } else {
                    var img = '<div class="preview-thumb-box "><img src="' + e.target.result + '" id="thumb_preview"/><button type="button" class="text-btn thumb-delete"><i class="fas fa-trash-alt"></i></button></div>';
                    $('.thumb_btn').append(img);
                    $('.thumb_btn').addClass('on');
                    $('.thumb_btn .fa-image').remove();
                }

            };

            reader.readAsDataURL(obj.files[0]);
        }

    }
}


function fn_Number(obj, e) {
    if (e.which == '229' || e.which == '197' && $.browser.opera) {
        setInterval(function () {
            obj.trigger('keyup');
        }, 100);
    }
    if (!(e.which && (e.which > 47 && e.which < 58) || e.which == 8 || e.which == 9 || e.which == 0 || (e.ctrlKey && e.which == 86))) {
        if (e.which > 105 && e.which < 96) {
            e.preventDefault();
        }
    }

    var value = obj.val().match(/[^0-9]/g);
    if (value != null) {
        obj.val(obj.val().replace(/[^0-9]/g, ''));
    }

}
function reloadCsrf() {
    var csrf_token = $.cookie('csrf_token');
    $("input[name='csrf_field']").val(csrf_token);
    return csrf_token;
}

function copy_allow() {
    $(document).bind("contextmenu", function (e) {
        return false;
    });
    $(document).bind("selectstart", function () {
        return false
    });
    $(document).bind("dragstart", function () {
        return false
    });
}

function submit_reload(it) {
    var type = $(it).data("type");
    switch (type) {
        case "back" :
            history.go(-1);
            break;
        case "reload" :
            location.reload(true);
            break;
        case "none" :
            break;
        default :
            location.href = type;
    }
}

function getTokens() {
    var tokens = [];
    var query = location.search;
    query = query.slice(1);
    query = query.split('&');
    $.each(query, function (i, value) {
        var token = value.split('=');
        var key = decodeURIComponent(token[0]);
        var data = decodeURIComponent(token[1]);
        tokens[key] = data;
    });
    return tokens;
}
function validURL(str) {
    var pattern = new RegExp('^(http[s]:)?\\/\\/?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function chgLanguage(lang) {
    var host_name = window.location.hostname;
    var path_name = window.location.pathname;
    var arr_path = path_name.toString().split('/');
    const regex = RegExp('en|kr|jp|cn');

    if (regex.test(arr_path[1])) {
        arr_path.splice(1, 1);
    }
    path = arr_path.join('/');
    var url = host_name + "/" + lang + path;
    location.replace("//" + url);
}

function masking(str) {
    var originName = str.split('');
    mask_lang = Math.floor(str.length / 2);
    originName.forEach(function (name, i) {
        if (i < mask_lang) {
            return;
        }
        originName[i] = '*';
    });
    var joinName = originName.join();
    return joinName.replace(/,/g, '');
}


