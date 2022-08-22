$(document).ready(function () {
    if ($.cookie('copy_allow') === 'T') {
        $(document).bind('contextmenu', function (e) {
            alert(getLangMsg('right_click'));
            return false;
        });
        $(document).bind('selectstart', function (e) {
            if ((e.target.closest('.note-editor') == null)) {
                return false;
            }
        });
        $(document).bind('dragstart', function (e) {
            if ((e.target.closest('.note-editor') == null)) {
                return false;
            }
        });
    }

    //에디터 쿠키 삭제
    $.removeCookie('edit_mode',{path : '/'});
});

$(document).on('click', '.menu-link', function () {
    var menuNo = $(this).data('menuNo');
    $.cookie('menu_no', menuNo, {path : '/'});
});

$(document).on("click", ".thumb-delete", function () {
    $("#thumb").val('');
    var del = $(this).closest(".preview-thumb-box");
    var i = '<i class="far fa-image"></i>';
    $('.thumb_btn').append(i);
    del.remove();
    $('.thumb_btn').removeClass('on');
    return false;
});
$(document).on('click', '.more-btn', function () {
    var btn = $(this);
    var type = $(this).data('type');
    var section_id = $(this).closest('.section').attr('id').toString();
    var section_no = section_id.replace("section_", "");

    var more = $("#section_" + section_no).find(".m-visible").data('more');
    if (more === false) {
        console.log(more);
        return false;
    }
    const lang_notice = getLangMsg('notice');
    var page = Number($("#page_" + section_no).val()) + 1;
    $("#page_" + section_no).val(page)
    var form = document.getElementById("frm_" + section_no);
    var data = new FormData(form);
    var display_count = $("#section_" + section_no).find(".section-inner ").data("galleryCol");

    if (type === 'gallery1') {
        $.ajax({
            type: "post",
            url: getLocale() + "/gallery/ajaxgallery",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                reloadCsrf();
                $("#page_" + section_no).val(page);
                var html = new Array();
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $.each(result, function (idx, val) {
                    html[idx] = '<div class="gal gal-' + display_count + '">';
                    html[idx] += '<div class="figure-wrap">';
                    html[idx] += '<figure class="wrapper" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject" style="background: url(\'' + val.server_file_name + '\') center center / cover no-repeat;">';
                    html[idx] += '<a class="wrap" href="' + val.server_file_name + '" ';
                    html[idx] += ' data-caption-title="' + val.title + '" '
                    html[idx] += ' data-gallery-no="' + val.no + '" '
                    html[idx] += ' data-caption-description="' + val.contents + '" '
                    html[idx] += ' data-width="' + val.size[0] + '" data-height="' + val.size[1] + '" itemprop="contentUrl"> '
                    html[idx] += ' <div class="hover-box"> '
                    html[idx] += '<div class="con1"> '
                    html[idx] += '<div class="con2"> '
                    html[idx] += '<p class="caption-title">' + val.title + '</p> '
                    html[idx] += '<p class="caption-description">' + val.contents + '</p> '
                    html[idx] += '</div> '
                    html[idx] += '</div> '
                    html[idx] += '</div> '
                    html[idx] += '</a> '
                    html[idx] += '</figure>';
                    html[idx] += '</div>';
                    html[idx] += '</div>';
                    $("#section_" + section_no).find(".m-visible ").find(".grid-gallery-a").append(html[idx]);
                });
                load_simple_gallery();
            }
        });
    } else if (type === 'gallery2') {
        $.ajax({
            type: "post",
            url: getLocale() + "/gallery/ajaxgallery",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                reloadCsrf();
                $("#page_" + section_no).val(page);
                var html = new Array();
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $.each(result, function (idx, val) {
                    html[idx] = '<div class="gal gal-' + display_count + '">';
                    html[idx] += '<div class="figure-wrap">';
                    html[idx] += '<figure class="wrapper" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject" style="background: url(\'' + val.server_file_name + '\') center center / cover no-repeat;">';
                    html[idx] += '<a class="wrap"';
                    html[idx] += ' href="' + val.server_file_name + '" '
                    html[idx] += ' data-caption-title="' + val.title + '" '
                    html[idx] += ' data-caption-description="' + val.contents + '" '
                    html[idx] += ' data-gallery-no="' + val.no + '" '
                    html[idx] += ' data-width="' + val.size[0] + '" data-height="' + val.size[1] + '" itemprop="contentUrl"> '
                    html[idx] += ' <div class="hover-box"></div>';
                    html[idx] += '</a>';
                    html[idx] += '</figure>';
                    html[idx] += '</div>';
                    html[idx] += '<p class="caption-title font16">' + val.title + '</p>';
                    html[idx] += '<p class="caption-description font14">' + val.contents + '</p>';
                    html[idx] += '</div>';
                    html[idx] += '</div>';
                    $("#section_" + section_no).find(".m-visible ").find(".detail-group-" + section_no).append(html[idx]);
                });
                load_detail_gallery();
            }
        });
    } else if (type === 'board1' || type === 'board1-custom') {
        $.ajax({
            type: "post",
            url: getLocale() + "/board/ajaxboard",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                var locale = getLocale();
                var $bo_field = $("#section_" + section_no).find(".m-visible").find('.field');
                var html = '';
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $("#page_" + section_no).val(page);
                reloadCsrf();
                $.each(result, function (idx, val) {
                    html = '<div class="table-row">';
                    if ($bo_field.hasClass('board-title')) {
                        html += '<div class="title field board-title">';
                        html += '<a href="' + locale + '/board/view/' + val.no + '" >';
                        html += '<span class="title-text">';
                        if ($bo_field.hasClass('board-no')) {
                            html += '<span class="num field board-no">';
                            if (val.notice === 'T') {
                                html += '<span class="badge notice">' + lang_notice + '</span>';
                            } else {
                                html += val.rownum;
                            }
                            html += '</span>';
                        }
                        if ($bo_field.hasClass('board-cat')) {
                            var category = '';
                            if (val.category != undefined) {
                                category = "[" + val.category + "]";
                            }
                            html += '<span class="field board-cat">' + category + '</span>';
                        }
                        html += val.title + '</span>';
                        var str_comment_count = val.comment_count > 0 ? '[' + val.comment_count + ']' : '';
                        html += ' <span class="comment">' + str_comment_count + '</span>';
                        html += '</a>';
                        html += "</div>";
                    }
                    if ($bo_field.hasClass('board-content')) {
                        var contents = val.contents.replace(/(<([^>]+)>)/ig, "");
                        html += '<div class="board-text-overflow">';
                        html += '<a class="field content board-content" href="' + locale + '/board/view/' + val.no + '">' + contents + '</a>';
                        html += "</div>";
                    }
                    html += '<div class="info">';
                    if ($bo_field.hasClass('board-writer')) {
                        var writer = '';
                        user_id = val.user_id === null ? getLangMsg('non_member') : val.user_id;
                        if (val.m_writer_type === '1') {
                            writer = val.writer + "(" + user_id + ")";
                        } else if (val.m_writer_type === '2') {
                            writer = val.writer;
                        } else if (val.m_writer_type === '3') {
                            writer = user_id;
                        } else if (val.m_writer_type === '4') {
                            writer = masking(user_id);
                        } else if (val.m_writer_type === '5') {
                            writer = masking(val.writer);
                        } else if (val.m_writer_type === '6') {
                            writer = getLangMsg('anonymous');
                        }
                        html += '<span>' + writer + '</span>';
                    }
                    if ($bo_field.hasClass('board-insert_date')) {
                        var insert_date = moment(val.insert_date).format('Y-MM-DD');
                        html += '<span>' + insert_date + '</span>';
                    }
                    if ($bo_field.hasClass('board-views')) {
                        html += '<span>' + val.views + '</span>';
                    }
                    html += '</div>';
                    $("#section_" + section_no).find(".m-visible").find('.table-wrap-m').append(html);
                });
            }
        });
    } else if (type === 'board2' || type === 'board2-custom') {
        $.ajax({
            type: "post",
            url: getLocale() + "/board/ajaxboard",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                var html = '';
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $("#page_" + section_no).val(page);
                reloadCsrf();
                $.each(result, function (idx, val) {
                    html = '<div class="card">';
                    html += '<div class="card-header">';
                    html += '<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse' + val.no + '" aria-expanded="false" aria-controls="collapse' + val.no + '">';
                    html += '<span class="title">' + val.title + '</span>';
                    html += '<span class="caret"><i class="fas fa-caret-up"></i></span>';
                    html += '</button>';
                    html += '</div>';
                    html += '<div id="collapse' + val.no + '" class="collapse" aria-labelledby="heading' + val.no + '" data-parent="#accordion_' + section_no + '" style="">';
                    html += '<div class="card-body">' + val.contents + '</div>';
                    html += '</div>';
                    html += '</div>';
                    $("#section_" + section_no).find(".m-visible").find('.accordion').append(html);
                });
                $(".collapsed").collapsing;
            }
        });
    } else if (type === 'board3' || type === 'board3-custom') {
        $.ajax({
            type: "post",
            url: getLocale() + "/board/ajaxboard",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                var locale = getLocale();
                var $bo_field = $("#section_" + section_no).find(".m-visible").find('.field');
                var html = '';
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $("#page_" + section_no).val(page);
                reloadCsrf();
                $.each(result, function (idx, val) {
                    html = '<div class="table-row row">';
                    html += '<div class="img">';
                    html += '<a href="' + locale + '/board/view/' + val.no + '"  class="wrapper">';
                    if (validURL(val.thumbnail)) {
                        html += '<div class="thumbnail" style="background-image:url(\'' + val.thumbnail + '\')"></div></a></div>';
                    } else if (val.thumbnail !== null && val.thumbnail !== '') {
                        html += '<div class="thumbnail" style="background-image:url(\'/builder/img/board/' + val.thumbnail + '\')"></div></a></div>';
                    } else {
                        html += '<div class="thumbnail" style="background-image:url(\'/static/img/no-thumbnail.png\')"></div></a></div>';
                    }
                    html += '<div class="text">';
                    html += '<div class="title">';
                    if ($bo_field.hasClass('board-title')) {
                        html += '<a href="' + locale + '/board/view/' + val.no + '">';
                        html += '<span class="title-text">';
                        if ($bo_field.hasClass('board-no')) {
                            html += '<span class="field board-no">';
                            if (val.notice === 'T') {
                                html += '<span class="badge notice">' + lang_notice + '</span>';
                            }
                            html += '</span>';
                        }
                        if ($bo_field.hasClass('board-cat')) {
                            var category = '';
                            if (val.category != undefined) {
                                category = "[" + val.category + "]";
                            }
                            html += '<span class="field board-cat">' + category + '</span>';
                        }
                        html += '<span class="field board-title">' + val.title + '</span>';
                        html += '</span>';
                        var str_comment_count = val.comment_count > 0 ? '[' + val.comment_count + ']' : '';
                        html += ' <span class="comment">' + str_comment_count + '</span>';
                    }
                    html += '</a>';
                    html += '</div>';
                    if ($bo_field.hasClass('board-contents')) {
                        var contents = val.contents.replace(/(<([^>]+)>)/ig, "");
                        html += '<div class="field content board-content">';
                        html += '<div class="board-text-overflow">';
                        html += '<a href="' + locale + '/board/view/' + val.no + '">' + contents + '</a>';
                        html += '</div>';
                        html += '</div>';
                    }
                    html += '<div class="info">';
                    if ($bo_field.hasClass('board-writer')) {
                        var writer = '';
                        user_id = val.user_id === null ? getLangMsg('non_member') : val.user_id;
                        if (val.m_writer_type === '1') {
                            writer = val.writer + "(" + user_id + ")";
                        } else if (val.m_writer_type === '2') {
                            writer = val.writer;
                        } else if (val.m_writer_type === '3') {
                            writer = user_id;
                        } else if (val.m_writer_type === '4') {
                            writer = masking(user_id);
                        } else if (val.m_writer_type === '5') {
                            writer = masking(val.writer);
                        } else if (val.m_writer_type === '6') {
                            writer = getLangMsg('anonymous');
                        }
                        html += '<span class="field board-writer" >' + writer + '</span>';
                    }
                    if ($bo_field.hasClass('board-insert_date')) {
                        var insert_date = moment(val.insert_date).format('Y.MM.DD');
                        html += '<span class="field board-insert_date">' + insert_date + '</span>';
                    }
                    if ($bo_field.hasClass('board-views')) {
                        html += '<span class="field board-views"> ' + getLangMsg('views') + ' ' + val.views + '</span>';
                    }
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    $("#section_" + section_no).find(".m-visible").find('.table-wrap').append(html);
                });
            }
        });
    } else if (type === 'board4' || type === 'board4-custom') {
        $.ajax({
            type: "post",
            url: getLocale() + "/board/ajaxboard",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                var locale = getLocale();
                var $bo_field = $("#section_" + section_no).find(".m-visible").find('.field');
                var html = '';
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $("#page_" + section_no).val(page);
                reloadCsrf();
                $.each(result, function (idx, val) {
                    html = '<div class="table-row row">';
                    html += '<div class="text">';
                    if ($bo_field.hasClass('board-title')) {
                        html += '<div class="title">';
                        html += '<div class="board-text-overflow">';
                        html += '<a href="' + locale + '/board/view/' + val.no + '">';
                        html += '<span class="title-text">';
                        if ($bo_field.hasClass('board-no')) {
                            html += '<span class="field board-no">';
                            if (val.notice === 'T') {
                                html += '<span class="badge notice">' + lang_notice + '</span>';
                            }
                            html += '</span>';
                        }
                        if ($bo_field.hasClass('board-cat')) {
                            var category = '';
                            if (val.category != undefined) {
                                category = "[" + val.category + "]";
                            }
                            html += '<span class="field board-cat">' + category + '</span>';
                        }
                        html += '<span class="field board-title">' + val.title + ' </span>';
                        html += ' </span>';
                        var str_comment_count = val.comment_count > 0 ? '[' + val.comment_count + ']' : '';
                        html += ' <span class="comment">' + str_comment_count + '</span>';
                        html += '</a>';
                        html += '</div>';
                        html += '</div>';
                    }
                    if ($bo_field.hasClass('board-content')) {
                        var contents = val.contents.replace(/(<([^>]+)>)/ig, "");
                        html += '<div class="content field board-content">';
                        html += '<div class="board-text-overflow">';
                        html += '<a href="' + locale + '/board/view/' + val.no + '">' + contents + '</a>';
                        html += '</div>';
                        html += '</div>';
                    }
                    html += '<div class="info">';
                    if ($bo_field.hasClass('board-writer')) {
                        var writer = '';
                        user_id = val.user_id === null ? getLangMsg('non_member') : val.user_id;
                        if (val.m_writer_type === '1') {
                            writer = val.writer + "(" + user_id + ")";
                        } else if (val.m_writer_type === '2') {
                            writer = val.writer;
                        } else if (val.m_writer_type === '3') {
                            writer = user_id;
                        } else if (val.m_writer_type === '4') {
                            writer = masking(user_id);
                        } else if (val.m_writer_type === '5') {
                            writer = masking(val.writer);
                        } else if (val.m_writer_type === '6') {
                            writer = getLangMsg('anonymous');
                        }
                        html += '<span class="field board-writer">' + writer + '</span>';
                    }
                    if ($bo_field.hasClass('board-insert_date')) {
                        var insert_date = moment(val.insert_date).format('Y.MM.DD');
                        html += '<span class="field board-insert_date">' + insert_date + '</span>';
                    }
                    if ($bo_field.hasClass('board-views')) {
                        html += '<span class="field board-views"> ' + getLangMsg('views') + ' ' + val.views + '</span>';
                    }
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="img">';
                    html += '<a href="' + locale + '/board/view/' + val.no + '"  class="wrapper">';
                    if (validURL(val.thumbnail)) {
                        html += '<div class="thumbnail" style="background-image:url(\'' + val.thumbnail + '\')"></div></a></div>';
                    } else if (val.thumbnail !== null && val.thumbnail !== '') {
                        html += '<div class="thumbnail" style="background-image:url(\'/builder/img/board/' + val.thumbnail + '\')"></div></a></div>';
                    } else {
                        html += '<div class="thumbnail" style="background-image:url(\'/static/img/no-thumbnail.png\')"></div></a></div>';
                    }
                    html += '</div>';
                    $("#section_" + section_no).find(".m-visible").find('.table-wrap').append(html);
                });
            }
        });
    } else if (type === 'board5' || type === 'board5-custom') {
        $.ajax({
            type: "post",
            url: getLocale() + "/board/ajaxboard",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                var locale = getLocale();
                var $bo_field = $("#section_" + section_no).find(".m-visible").find('.field');
                var html = '';
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $("#page_" + section_no).val(page);
                reloadCsrf();
                $.each(result, function (idx, val) {
                    html += '<div class="gal">';
                    html += '<div class="thumbnail">';
                    if (validURL(val.thumbnail)) {
                        html += '<a href="' + locale + '/board/view/' + val.no + '" class="img" style="background-image:url(\'' + val.thumbnail + '\')"></a>';
                    } else if (val.thumbnail !== null && val.thumbnail !== '') {
                        html += '<a href="' + locale + '/board/view/' + val.no + '" class="img" style="background-image:url(\'/builder/img/board/' + val.thumbnail + '\')"></a>';
                    } else {
                        html += '<a href="' + locale + '/board/view/' + val.no + '" class="img" style="background-image:url(\'/static/img/no-thumbnail.png\')"></a>';
                    }
                    html += "</div>";
                    html += '<div class="text">';
                    if ($bo_field.hasClass('board-title')) {
                        html += '<div class="board-text-overflow">';
                        html += '<a href="' + locale + '/board/view/' + val.no + '" class="field board-title title">'
                        html += '<span class="title-text">';
                        if ($bo_field.hasClass('board-no')) {
                            html += '<span class="field board-no">';
                            if (val.notice === 'T') {
                                html += '<span class="badge notice">' + lang_notice + '</span>';
                            } else {
                                html += val.rownum;
                            }
                            html += '</span> ';
                        }
                        if ($bo_field.hasClass('board-cat')) {
                            var category = '';
                            if (val.category != undefined) {
                                category = "[" + val.category + "]";
                            }
                            html += '<span class="field board-cat">' + category + '</span>';
                        }
                        html += val.title;
                        html += '</span>';

                        var str_comment_count = val.comment_count > 0 ? '[' + val.comment_count + ']' : '';
                        html += ' <span class="comment">' + str_comment_count + '</span>';
                        html += '</a>';
                        html += '</div>';
                    }
                    if ($bo_field.hasClass('board-content')) {
                        html += '<div class="board-text-overflow">';
                        var contents = val.contents.replace(/(<([^>]+)>)/ig, "");
                        html += '<a href="' + locale + '/board/view/' + val.no + ' " class="content board-content">' + contents + '</a>';
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '<div class="info">'
                    if ($bo_field.hasClass('board-writer')) {
                        var writer = '';
                        user_id = val.user_id === null ? getLangMsg('non_member') : val.user_id;
                        if (val.m_writer_type === '1') {
                            writer = val.writer + "(" + user_id + ")";
                        } else if (val.m_writer_type === '2') {
                            writer = val.writer;
                        } else if (val.m_writer_type === '3') {
                            writer = user_id;
                        } else if (val.m_writer_type === '4') {
                            writer = masking(user_id);
                        } else if (val.m_writer_type === '5') {
                            writer = masking(val.writer);
                        } else if (val.m_writer_type === '6') {
                            writer = getLangMsg('anonymous');
                        }
                        html += '<span class="field board-writer">' + writer + '</span>';
                    }
                    if ($bo_field.hasClass('board-insert_date')) {
                        var insert_date = moment(val.insert_date).format('Y.MM.DD H:mm:ss');
                        html += '<span class="board-date board-insert_date field">' + insert_date + '</span>';
                    }
                    html += '</div>';
                    html += '</div>';
                });
                $("#section_" + section_no).find(".m-visible").find('.row').append(html);
            }
        });
    } else if (type === 'shop-board1') {
        var mDisplay_x = $("#section_" + section_no).find(".m-visible").data('mDisplay_x');
        $.ajax({
            type: "post",
            url: getLocale() + "/shop/ajaxshop",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                reloadCsrf();
                $("#page_" + section_no).val(page);
                var html = new Array();
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $.each(result, function (idx, val) {
                    html += '<div class="gal gal-' + mDisplay_x + '">';
                    html += '<div class="wrapper"> ';
                    html += '<div class="thumbnail" style="background-image:url(\'/builder/img/shop/' + val.thumbnail + '\')"></div>';
                    if (val.sale_allow === 'T') {
                        if (val.sale_price === '0') {
                            sale_per = 100;
                        } else {
                            sale_per = 100 - Math.ceil(100 / (Number(val.price) / Number(val.sale_price)));
                        }
                        html += '<div class="discount"><span>' + sale_per + '<small>%</small></span></div>';
                    }
                    html += '</div>';
                    html += '<div class="info">';
                    html += '<div class="p-name">' + val.title + '</div>';
                    html += '<div class="p-summary">' + val.summary + '</div>';
                    if (val.sale_allow === 'T') {
                        html += '<div class="p-price">';
                        html += '<span class="old-price">' + Number(val.price).toLocaleString('ko-KR') + ' ' + getLangMsg('won') + '</span>';
                        html += '<span class="price">' + Number(val.sale_price).toLocaleString('ko-KR') + ' ' + getLangMsg('won') + '</span>';
                    } else {
                        html += '<div class="p-price">';
                        html += '<span class="price">' + Number(val.price).toLocaleString('ko-KR') + ' ' + getLangMsg('won') + '</span>';
                    }
                    html += '<div class="p-button">';
                    html += '<a href="' + val.link + '" class="e-btn shop-btn" target="' + val.target + '">' + getLangMsg('view_product') + '</a>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                $("#section_" + section_no).find(".m-visible").find('.row').append(html);
            }
        });
    } else if (type === 'shop-board2') {
        $.ajax({
            type: "post",
            url: getLocale() + "/shop/ajaxshop",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'Json',
            success: function (result) {
                reloadCsrf();
                $("#page_" + section_no).val(page);
                var html = new Array();
                var more = false;
                if (result.hasOwnProperty('more')) {
                    more = result.more;
                    delete result.more;
                }
                if (!more) {
                    btn.hide();
                }
                $("#section_" + section_no).find(".m-visible").data('more', more);
                $.each(result, function (idx, val) {
                    var sale_per = 0;
                    html += '<div class="table-row row">';
                    html += '<div class="img">';
                    html += '<div class="wrapper">';
                    html += '<div class="thumbnail" style="background-image:url(\'/builder/img/shop/' + val.thumbnail + '\')"></div>';
                    if (val.sale_allow === 'T') {
                        if (val.sale_price === '0') {
                            sale_per = 100;
                        } else {
                            sale_per = 100 - Math.ceil(100 / (Number(val.price) / Number(val.sale_price)));
                        }
                        html += '<div class="discount"><span>' + sale_per + '<small>%</small></span></div>';
                    }
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="info">';
                    html += '<div class="p-name">' + val.title + '</div>';
                    html += '<div class="p-summary">' + val.summary + '</div>';
                    if (val.sale_allow === 'T') {
                        html += '<div class="p-price">';
                        html += '<div class="old-price">' + Number(val.price).toLocaleString('ko-KR') + ' ' + getLangMsg('won') + '</div>';
                        html += '<div class="price">' + Number(val.sale_price).toLocaleString('ko-KR') + ' ' + getLangMsg('won') + '</div>';
                    } else {
                        html += '<div class="p-price">';
                        html += '<div class="price">' + Number(val.price).toLocaleString('ko-KR') + ' ' + getLangMsg('won') + '</div>';
                    }
                    html += '</div>';
                    html += '<div class="p-button">  ';
                    html += '<a href="' + val.link + '" class="e-btn shop-btn" target="' + val.target + '">' + getLangMsg('view_product') + '</a>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                $("#section_" + section_no).find(".m-visible").find('.table-wrap').append(html);
            }
        });
    }
});

$(document).on('keydown', 'input', function () {
    var $btn = $(this).closest('.search-wrapper').find('button');

    var board_search = $btn.hasClass('board-search-btn');
    var gallery_search = $btn.hasClass('gallery-search-btn');
    var shop_search = $btn.hasClass('shop-search-btn');
    var mapboard_search_btn = $btn.hasClass('mapboard-search-btn');
    var site_search_btn = $btn.hasClass('site-search-btn');
    //    var search = $(this).closest('.search-wrapper').length;
    var path = window.location.pathname;
    if (path !== getLocale() + '/login') {
        if (event.keyCode === 13) {
            event.preventDefault();
        }

    }
    if (event.keyCode === 13) {
        if (board_search) {
            search_board($btn);
        }
        if (gallery_search) {
            search_gallery($btn);
        }
        if (shop_search) {
            search_shop($btn);
        }
        if (mapboard_search_btn) {
            $btn.click();
        }
        if (site_search_btn) {
            $btn.click();
        }
    }

});
$(document).ready(function () {

    $(".basic-slide").each(function () {
        var section_id = $(this).attr('id');
        var delay = $(this).data('delay');
        var layout = $(this).data('layout');
        var height = $(this).data('height');
        var paging = $(this).data('paging');
        var effect = $(this).data('effect');
        var move = $(this).data('move');
        var option = new Object();
        if (move === 'T') {
            option.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            };
        }

        if (paging === 'T') {
            option.pagination = {
                el: '.swiper-pagination'
            };
        }

        delay = Number(delay) * 1000;
        option.effect = effect;
        if (effect == 'fade') {
            option.fadeEffect = {
                crossFade: true
            };
        }
        option.speed = 1000;
        option.autoplay = {
            delay: delay
        };
        if (height === 'A') {
            option.autoHeight = true;
        }
        option.loop = true;
        option.on = {
            slideChangeTransitionEnd: function () {
                AOS.refresh();
            },
        };
        var swiper = new Swiper('#' + section_id + ' .swiper-container', option);
    });

    $(".pn-slide").each(function () {
        var section_id = $(this).attr('id');
        var delay = $(this).data('delay');
        var layout = $(this).data('layout');
        var height = $(this).data('height');
        var paging = $(this).data('paging');
        var effect = $(this).data('effect');
        var move = $(this).data('move');
        var option = new Object();
        if (move === 'T') {
            option.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            };
        }

        if (paging === 'T') {
            option.pagination = {
                el: '.swiper-pagination'
            };
        }

        delay = Number(delay) * 1000;
        option.speed = 1000;

        option.effect = effect;
        option.slidesPerView = 3;
        option.spaceBetween = 0;

        option.autoplay = {
            delay: delay
        };
        if (height === 'A') {
            option.autoHeight = true;
        }
        option.loop = true;
        option.on = {
            slideChangeTransitionEnd: function () {
                AOS.refresh();
            },
        };
        var swiper = new Swiper('#' + section_id + ' .swiper-container', option);
    });
    $(".thumbnail-slide").each(function () {
        var section_id = $(this).attr('id');
        var delay = $(this).data('delay');
        var layout = $(this).data('layout');
        var height = $(this).data('height');
        var paging = $(this).data('paging');
        var effect = $(this).data('effect');
        var move = $(this).data('move');
        var slideCnt = $(this).data('slideCnt');
        var option = new Object();
        option.loop = true;
        option.spaceBetween = 10;
        option.watchSlidesProgress = 10;
        option.slidesPerView = slideCnt;
        option.freeMode = true;
        option.watchSlidesProgress = true;
        option.on = {
            slideChangeTransitionEnd: function () {
                AOS.refresh();
            },
        };
        var swiper = new Swiper('#' + section_id + ' .thumb-wrap', option);

        var option = new Object();
        option.loop = true;
        if (move === 'T') {
            option.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            };
        }

        if (paging === 'T') {
            option.pagination = {
                el: '.swiper-pagination'
            };
        }

        delay = Number(delay) * 1000;
        option.speed = 1000;
        option.autoplay = {
            delay: delay
        };
        if (height === 'A') {
            option.autoHeight = true;
        }

        option.spaceBetween = 10;
        option.thumbs = {
            'swiper': swiper
        };
        option.effect = effect;
        if (effect == 'fade') {
            option.fadeEffect = {
                crossFade: true
            };
        }
        option.on = {
            slideChangeTransitionEnd: function () {
                AOS.refresh();
            },
        };
        var swiper2 = new Swiper('#' + section_id + ' .swiper-container', option);
    });
    $(".dday").each(function () {
        var section_id = $(this).attr('id').toString();
        var section_no = section_id.replace("section_", "");
        var ddayDate = $(this).find(".section-inner").data('ddayDate');
        $(this).find(".countdown-wrapper").countdown(ddayDate, function (event) {
            $(this).html(event.strftime(
                '<div class="time-wrap"><div class="time-box"><div class="time ">%D</div><div class="text">Days</div></div></div>' +
                '<div class="time-wrap"><div class="time-box"><div class="time ">%H</div><div class="text">Hour</div></div></div>' +
                '<div class="time-wrap"><div class="time-box"><div class="time ">%M</div><div class="text">Minute</div></div></div>' +
                '<div class="time-wrap"><div class="time-box"><div class="time ">%S</div><div class="text">Second</div></div></div>'
            ));
        }).on('finish.countdown', function () {
            $.ajax({
                type: "get",
                url: getLocale() + "/countdown",
                data: "section_no=" + section_no,
                dataType: 'Json',
                success: function (result) {
                    if (result.code) {
                        if (result.data[0].url_allow === 'T') {
                            window.open(result.data[0].url);
                        }
                    } else {
                        alert(result.message);
                    }
                }
            });
        });
        var now = new Date();
        var dday = new Date(ddayDate);
        if (now.getTime() > dday.getTime()) {
            $.ajax({
                type: "get",
                url: getLocale() + "/countdown",
                data: "section_no=" + section_no,
                dataType: 'Json',
                success: function (result) {
                    if (result.code) {
                        if (result.data[0].url_allow === 'T') {
                            window.open(result.data[0].url);
                        }
                    } else {
                        alert(result.message);
                    }
                }
            });
        }
    });




    $.each($(".tui-datepicker-input"), function () {
        var tag_id = $(this).find("input").attr("id");
        var date = $(this).find("input").val;
        //DatePicker(tag_id, date);
    });
    if ($('.multi-file').length > 0) {
        $('.multi-file').MultiFile({
            max: CONF_UPLOAD['total_max_count'], //업로드 최대 파일 갯수 (지정하지 않으면 무한대)
            //        accept: 'jpg|png|gif', //허용할 확장자(지정하지 않으면 모든 확장자 허용)
            maxfile: CONF_UPLOAD['max_size'], //각 파일 최대 업로드 크기
            maxsize: CONF_UPLOAD['total_max_size'], //전체 파일 최대 업로드 크기
            STRING: { //Multi-lingual support : 메시지 수정 가능
                remove: getLangMsg('multi-file_remove'), //추가한 파일 제거 문구, 이미태그를 사용하면 이미지사용가능
                duplicate: getLangMsg('multi-file_duplicate'),
                denied: getLangMsg('multi-file_denied'),
                selected: getLangMsg('multi-file_selected'),
                toomuch: getLangMsg('multi-file_toomuch'),
                toomany: getLangMsg('multi-file_toomany'),
                toobig: getLangMsg('multi-file_toobig')
            },
            list: ".file-list"
        });
        $(".del-file-btn").click(function () {
            if ($(this).next("input[type='checkbox']").is(":checked")) {
                $(this).next("input[type='checkbox']").prop("checked", false);
            } else {
                $(this).closest("p").hide();
                $(this).next("input[type='checkbox']").prop("checked", true);
            }
        });
    }
    if ($('.multi-gallery-file').length > 0) {
        $('.multi-gallery-file').MultiFile({
            max: CONF_UPLOAD['total_max_count'], //업로드 최대 파일 갯수 (지정하지 않으면 무한대)
            //        accept: 'jpg|png|gif', //허용할 확장자(지정하지 않으면 모든 확장자 허용)
            maxfile: CONF_UPLOAD['max_size'], //각 파일 최대 업로드 크기
            maxsize: CONF_UPLOAD['total_max_size'], //전체 파일 최대 업로드 크기
            STRING: { //Multi-lingual support : 메시지 수정 가능
                remove: getLangMsg('multi-file_remove'), //추가한 파일 제거 문구, 이미태그를 사용하면 이미지사용가능
                duplicate: getLangMsg('multi-file_duplicate'),
                denied: getLangMsg('multi-file_denied'),
                selected: getLangMsg('multi-file_selected'),
                toomuch: getLangMsg('multi-file_toomuch'),
                toomany: getLangMsg('multi-file_toomany'),
                toobig: getLangMsg('multi-file_toobig')
            },
            list: ".ui-sortable"
        });
        $(".del-gallery-file-btn").click(function () {
            if ($(this).next("input[type='checkbox']").is(":checked")) {
                $(this).next("input[type='checkbox']").prop("checked", false);
            } else {
                $(this).closest("li").hide();
                $(this).prev().find("input[type='checkbox']").prop("checked", true);
                $(this).prev().find("input[name='priority[]']").attr("disabled", true);
            }
        });
    }

    $(".post-btn").click(function () {
        var tag_id = $(this).attr("id");
        $zip_code = $("#" + tag_id + "_addr_1");
        $addr1 = $("#" + tag_id + "_addr_2");
        $addr2 = $("#" + tag_id + "_addr_3");
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (data.userSelectedType === 'R') {
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    //                    document.getElementById("sample6_extraAddress").value = extraAddr;

                } else {
                    //                    document.getElementById("sample6_extraAddress").value = '';
                }
                $zip_code.val(data.zonecode);
                $addr1.val(addr);
            }
        }).open();
    });

    $(".opt-email-type").change(function () {
        var tag_id = $(this).attr("id");
        var email_type = $(this).val();
        if (email_type === 'etc') {
            $("#" + tag_id + "_email_type").prop("readonly", false);
        } else {
            $("#" + tag_id + "_email_type").prop("readonly", true).val(email_type);
        }
    }).change();



    $('.only-num').keydown(function (e) {
        fn_Number($(this), e);
    }).keyup(function (e) {
        fn_Number($(this), e);
    }).css('imeMode', 'disabled');


    load_simple_gallery();
    load_detail_gallery();
    load_collage_gallery();

    /* 네이버 지도 */
    $(".naver_map").each(function () {
        var naver_map = $(this).attr('id');
        var lat = $(this).data('mapLat');
        var lng = $(this).data('mapLng');
        var zoom = $(this).data('mapLev');
        var naverMap = {
            center: new naver.maps.LatLng(lat, lng),
            //zoom: zoom, //지도의 초기 줌 레벨
        }

        var nMap = new naver.maps.Map(naver_map, naverMap);
        var nMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: nMap
        });
    });

    $(".naver_map_pano").each(function () {
        var naver_map = $(this).attr('id');
        var lat = $(this).data('mapLat');
        var lng = $(this).data('mapLng');
        var zoom = $(this).data('mapLev');

        // var panoramaOptions = {
        //     position: new naver.maps.LatLng(lat, lng),
        //     size: new naver.maps.Size(800, 600),
        //     pov: {
        //         pan: -135,
        //         tilt: 29,
        //         fov: 100
        //     }
        // };

        // var pano = new naver.maps.Panorama(document.getElementById("pano"), {
        //     position: new naver.maps.LatLng(lat, lng)
        // });


        var pano = null;

        function initPanorama() {
            pano = new naver.maps.Panorama("pano", {
                position: new naver.maps.LatLng(lat, lng),
                pov: {
                    pan: 55,
                    tilt: -30,
                    fov: 100
                },
                zoomControl: true,
            });
        
            naver.maps.Event.addListener(pano, "init", function() {
                marker.setMap(pano);
        
                var proj = pano.getProjection();
                var lookAtPov = proj.fromCoordToPov(marker.getPosition());
                if (lookAtPov) {
                    pano.setPov(lookAtPov);
                }
            });
        }
        
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng)
        });
        
        naver.maps.onJSContentLoaded = initPanorama;

        // var naverMap = {
        //     center: new naver.maps.LatLng(lat, lng),
        //     //zoom: zoom, //지도의 초기 줌 레벨
        // }

        // var nMap = new naver.maps.Map(naver_map, naverMap);
        // var nMarker = new naver.maps.Marker({
        //     position: new naver.maps.LatLng(lat, lng),
        //     map: nMap
        // });
    });

    $(".kakao_map").each(function () {
        var kakao_map = $(this).attr('id');
        var lat = $(this).data('mapLat');
        var lng = $(this).data('mapLng');
        var zoom = $(this).data('mapLev');
        var container = document.getElementById(kakao_map); //지도를 담을 영역의 DOM 레퍼런스
        /* 카카오지도 */
        //            var container = document.getElementById('kakao_map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
            //level: zoom //지도의 레벨(확대, 축소 정도)
        };
        var kMap = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        var markerPosition = new kakao.maps.LatLng(lat, lng);
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(kMap);
    });

    $(".kakao_map_road").each(function () {
        var kakao_map = $(this).attr('id');
        var lat = $(this).data('mapLat');
        var lng = $(this).data('mapLng');
        var zoom = $(this).data('mapLev');
console.log(lat+"/"+lng);
        // var roadviewContainer = document.getElementById('kakao_road'); //로드뷰를 표시할 div
        // var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
        // var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
        
        // var position = new kakao.maps.LatLng(lat, lng);
        
        // // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        // roadviewClient.getNearestPanoId(position, 50, function(panoId) {
        //     roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        // });

        //---------------------------------------

        //----------------------------------------

        var rvContainer = document.getElementById('kakao_road'); // 로드뷰를 표시할 div

        var rv = new kakao.maps.Roadview(rvContainer, {
            pan: 28, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
            tilt: 1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
            zoom: 0 // 로드뷰 줌 초기값
        }); // 로드뷰 객체 생성
        var rc = new kakao.maps.RoadviewClient(); // 좌표를 통한 로드뷰의 panoid를 추출하기 위한 로드뷰 help객체 생성 
        var rvPosition = new kakao.maps.LatLng(lat, lng);
        
        rc.getNearestPanoId(rvPosition, 50, function(panoid) {
            rv.setPanoId(panoid, rvPosition);//좌표에 근접한 panoId를 통해 로드뷰를 실행합니다.
        });
        
        // 로드뷰 초기화 이벤트
        kakao.maps.event.addListener(rv, 'init', function() {
        
            // 로드뷰에 올릴 마커를 생성합니다.
            var rMarker = new kakao.maps.Marker({
                position: rvPosition,
                map: rv //map 대신 rv(로드뷰 객체)로 설정하면 로드뷰에 올라갑니다.
            });
            rMarker.setAltitude(2); //마커의 높이를 설정합니다. (단위는 m입니다.)
            rMarker.setRange(100); //마커가 보일 수 있는 범위를 설정합니다. (단위는 m입니다.)

            // 로드뷰에 올릴 장소명 인포윈도우를 생성합니다.
            // var rLabel = new kakao.maps.InfoWindow({
            //     content: '필동면옥'
            // });

            // rLabel.setRange(100); //마커가 보일 수 있는 범위를 설정합니다. (단위는 m입니다.)
            // rLabel.open(rv, rMarker); // open시 마커를 넣어주면, 마커의 altitude와 position값을 모두 따라 갑니다.
        
            // 로드뷰 마커가 중앙에 오도록 로드뷰의 viewpoint 조정합니다.
            var projection = rv.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
            
            // 마커의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
            var viewpoint = projection.viewpointFromCoords(rMarker.getPosition(), rMarker.getAltitude());
            viewpoint.tilt = 0;
            viewpoint.zoom = -3;
            rv.setViewpoint(viewpoint); //로드뷰에 뷰포인트를 설정합니다.
        });

        //-------------------------------

        // var container = document.getElementById(kakao_map); //지도를 담을 영역의 DOM 레퍼런스
        // /* 카카오지도 */
        // //            var container = document.getElementById('kakao_map'); //지도를 담을 영역의 DOM 레퍼런스
        // var options = { //지도를 생성할 때 필요한 기본 옵션
        //     center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
        //     //level: zoom //지도의 레벨(확대, 축소 정도)
        // };
        // var kMap = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // var markerPosition = new kakao.maps.LatLng(lat, lng);
        // // 마커를 생성합니다
        // var marker = new kakao.maps.Marker({
        //     position: markerPosition
        // });
        // marker.setMap(kMap);
    })

    // 마커가 지도 위에 표시되도록 설정합니다

    //
    //    $(".google_map").each(function () {
    //        var google_map = $(this).attr('id');
    //
    ////        var zoom = $(this).data('zoom');
    //        var lat = $(this).data('mapLat');
    //        var lng = $(this).data('mapLng');
    //        var zoom = $(this).data('mapLev');
    //        var uluru = {lat: Number(lat), lng: Number(lng)};
    //        var mapOptions = {
    //            //zoom: zoom,
    //            center: uluru
    //        };
    //        var map = new google.maps.Map(document.getElementById(google_map),
    //                mapOptions);
    //
    //        var marker = new google.maps.Marker({position: uluru, map: map});
    //
    //    });


    var get_token = getTokens();
    if (get_token.hasOwnProperty('section_no')) {
        var offset = $("#section_" + get_token.section_no).offset();
        $('html, body').animate({
            scrollTop: offset.top
        }, 0);
    }


    $(".popup-modal-btn").click(function () {
        var today_close = $(this).prevAll('input');
        if ($(today_close).is(":checked")) {
            popup_no = $(today_close).val();
            var cookie_popup = $.cookie('to_close');
            if (cookie_popup == undefined) {
                var arr_popup = [];
                arr_popup.push(Number(popup_no));
                var json_popup = JSON.stringify(arr_popup);
                $.cookie('to_close', json_popup, {
                    expires: 1
                });
            } else {
                var arr_popup = JSON.parse(cookie_popup);
                arr_popup.push(Number(popup_no));
                var json_popup = JSON.stringify(arr_popup);
                $.cookie('to_close', json_popup, {
                    expires: 1
                });
            }
        }

    });

    var cookie_popup = $.cookie('to_close');
    var arr_popup = [];
    if (cookie_popup != undefined) {
        arr_popup = JSON.parse(cookie_popup);
    }

    $.each($(".popup_modal"), function (idx, el) {
        popup_no = $(el).data('popup_no');
        if ($.inArray(popup_no, arr_popup) === -1) {
            $(el).modal('show');
        }
    });

    $(".masonry-gallery").scroll(function () {


        var scrollTop = $(this).scrollTop();
        var innerHeight = $(this).innerHeight();
        var scrollHeight = $(this).prop('scrollHeight');

        if (scrollTop + innerHeight >= scrollHeight) {
            var no = $(this).data('id');
            var num = Number($("figure:last").find('a').data('num')) + 1;
            var page = Number($("#page_" + no).val()) + 1;
            $("#page_" + no).val(page);
            var form = document.getElementById("frm_" + no);
            var data = new FormData(form);
            var more = $("#section_" + no).data('more');
            if (more === false) {
                console.log(more);
                return false;
            }
            data.append('csrf_field', reloadCsrf());
            $.ajax({
                type: "post",
                url: getLocale() + "/gallery/ajaxgallery",
                processData: false,
                contentType: false,
                data: data,
                dataType: 'Json',
                success: function (result) {
                    reloadCsrf();
                    $("#page_" + no).val(page);
                    var html = new Array();
                    $pc_col_group = $("#section_" + no).find(".pc-visible").find(".collage-group-" + no);
                    $m_col_group = $("#section_" + no).find(".m-visible").find(".collage-group-" + no);
                    var pc_coll_cnt = $pc_col_group.length;
                    var m_coll_cnt = $m_col_group.length;
                    var more = false;
                    if (result.hasOwnProperty('more')) {
                        more = result.more;
                        delete result.more;
                    }
                    $("#section_" + no).data('more', more);
                    var i = 0;
                    var m = 0;
                    $.each(result, function (idx, val) {
                        num++;
                        html[idx] = '<figure class="wrapper" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">';
                        html[idx] += '<a class="wrap" href="' + val.server_file_name + '" data-caption="<div class=\'title\'>' + val.title + '</div><div>' + val.contents + '</div>" data-width="' + val.size[0] + '" data-height="' + val.size[1] + '" itemprop="contentUrl" data-num="">';
                        html[idx] += '<img src="' + val.server_file_name + '" alt="' + val.contents + '">';
                        html[idx] += '<div class="hover-box">';
                        html[idx] += '<div class="con1">';
                        html[idx] += '<div class="con2">';
                        html[idx] += '<p>' + val.title + '</p>';
                        html[idx] += '<p>' + val.contents + '</p>';
                        html[idx] += '</div>';
                        html[idx] += '</div>';
                        html[idx] += '</div>';
                        html[idx] += '</a>';
                        html[idx] += '</figure>';
                        if (i > pc_coll_cnt) {
                            i = 0;
                        }
                        if (m > m_coll_cnt) {
                            m = 0;
                        }
                        var pc_height = new Array();
                        var m_height = new Array();
                        $.each($pc_col_group, function (k, v) {
                            pc_height[k] = $(v).innerHeight();
                        });
                        $.each($m_col_group, function (c, n) {
                            m_height[c] = $(n).innerHeight();
                        });

                        var pc_max_height = Math.max.apply(null, pc_height);
                        var pc_min_height = Math.min.apply(null, pc_height);
                        var m_max_height = Math.max.apply(null, m_height);
                        var m_min_height = Math.min.apply(null, m_height);
                        if ((pc_max_height - pc_min_height) > 800) {
                            i = pc_height.indexOf(pc_min_height);
                        }
                        if ((m_max_height - m_min_height) > 300) {
                            m = m_height.indexOf(m_min_height);
                        }
                        $pc_col_group.eq(i).append(html[idx]);
                        $m_col_group.eq(m).append(html[idx]);
                        i++;
                        m++;
                    });

                    load_collage_gallery();
                }
            });
        } else {

        }
    });
});

// Define click event on gallery item
$(document).on('click', '.grid-gallery-b a', function (event) {
    if ($(this).closest('.m-visible').length > 0) {
        var div = 'm';
    } else {
        var div = 'pc';
    }
    var id = $(this).closest('.section').attr('id');
    var container = load_detail_gallery();
    event.preventDefault();
    // Define object and gallery options
    var $pswp = $('.pswp')[0],
        options = {
            index: $(this).closest('.gal').index(),
            bgOpacity: 0.85,
            showHideOpacity: true,
            closeOnScroll: false,
        };
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container[id][div], options);
    gallery.init();
});



// Define click event on gallery item
$(document).on('click', '.grid-gallery-a a', function (event) {
    if ($(this).closest('.m-visible').length > 0) {
        var div = 'm';
    } else {
        var div = 'pc';
    }
    var id = $(this).closest('.section').attr('id');
    var container = load_simple_gallery();
    // Prevent location change
    event.preventDefault();
    $(this).closest('.gal').index();
    // Define object and gallery options
    var $pswp = $('.pswp')[0],
        options = {
            index: $(this).closest('.gal').index(),
            bgOpacity: 0.85,
            showHideOpacity: true,
            closeOnScroll: false,
        };
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container[id][div], options);
    gallery.init();
});
//
// Define click event on gallery item
$(document).on('click', '.masonry-gallery a', function (event) {

    var id = $(this).closest('.section').attr('id');

    var container = load_collage_gallery();
    var idx = $(this).data('num');
    // Prevent location change
    event.preventDefault();
    // Define object and gallery options
    $('figure').length;
    var $pswp = $('.pswp')[0],
        options = {
            index: idx,
            bgOpacity: 0.85,
            showHideOpacity: true,
            closeOnScroll: false,
        };
    // Initialize PhotoSwipe
    if ($(this).closest('.m-visible').length > 0) {
        var div = 'm';
    } else {
        var div = 'pc';
    }
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container[id][div], options);
    gallery.init();
});

$(document).on('click', '.save-form-btn', function () {
    var url = $(this).data('url');
    var form_id = $(this).data('form');
    $(".modal").modal("hide");
    var form = document.getElementById(form_id);
    var data = new FormData(form);
    $.ajax({
        type: "post",
        url: url,
        processData: false,
        contentType: false,
        data: data,
        dataType: 'Json',
        success: function (result) {
            if (result.code) {
                $('.modal').modal('hide');
                $(".valid-txt").hide();
                if (result.hasOwnProperty('redirect')) {
                    redirect = result.redirect;
                } else {
                    redirect = 'reload';
                }
                $('#modal_reload .modal-body').html("<div class='text-center'>" + result.message + "</div>");
                $("#modal_reload_btn").data("type", redirect);
                $('#modal_reload').modal('show');
            } else {
                if (result.hasOwnProperty('redirect')) {
                    redirect = result.redirect;
                } else {
                    redirect = 'none';
                }
                $('#modal_reload .modal-body').html("<div class='text-center'>" + result.message + "</div>");
                $("#modal_reload_btn").data("type", redirect);
                $('#modal_reload').modal('show');
                reloadCsrf();
                $(".valid-txt").hide();
                $.each(result.data, function (id, text) {
                    $("#valid_" + id).text(text);
                    $("#valid_" + id).show();
                });
            }
        }
    });
});
$(document).on('click', '.save-form-capcha-btn', function (e) {
    e.preventDefault();
    var capcha_g_id = $("#capcha_g_id").val();
    var url = $(this).data('url');
    var form_id = $(this).data('form');
    $(".modal").modal("hide");
    var form = document.getElementById(form_id);
    var data = new FormData(form);
    grecaptcha.ready(function () {
        try {
            grecaptcha.execute(capcha_g_id, {
                action: 'submit'
            }).then(function (token) {
                $.ajax({
                    type: "post",
                    url: url,
                    processData: false,
                    contentType: false,
                    data: data,
                    dataType: 'Json',
                    success: function (result) {
                        if (result.code) {
                            $('.modal').modal('hide');
                            $(".valid-txt").hide();
                            if (result.hasOwnProperty('redirect')) {
                                redirect = result.redirect;
                            } else {
                                redirect = 'reload';
                            }
                            $('#modal_reload .modal-body').html("<div class='text-center'>" + result.message + "</div>");
                            $("#modal_reload_btn").data("type", redirect);
                            $('#modal_reload').modal('show');
                        } else {
                            if (result.hasOwnProperty('redirect')) {
                                redirect = result.redirect;
                            } else {
                                redirect = 'none';
                            }
                            $('#modal_reload .modal-body').html("<div class='text-center'>" + result.message + "</div>");
                            $("#modal_reload_btn").data("type", redirect);
                            $('#modal_reload').modal('show');
                            reloadCsrf();
                            $(".valid-txt").hide();
                            $.each(result.data, function (id, text) {
                                $("#valid_" + id).text(text);
                                $("#valid_" + id).show();
                            });
                        }
                    }
                });
            });
        } catch (err) {
            $('#modal_reload .modal-body').html("<div class='text-center'>The captcha API is incorrect.<br/>Please check again.</div>");
            $("#modal_reload_btn").data("type", 'none');
            $('#modal_reload').modal('show');
        }
    });
});


function DatePicker(selector, date) {

    var DatePicker = tui.DatePicker;
    DatePicker.localeTexts['customKey'] = {
        titles: {
            // days
            DD: ['일', '월', '화', '수', '목', '금', '토'],
            // daysShort
            D: ['일', '월', '화', '수', '목', '금', '토'],
            // months
            MMMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            // monthsShort
            MMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
        },
        titleFormat: 'yyyy년 MMM ',
        todayFormat: '오늘: yyyy년  MMMM dd일  DD요일',
        date: 'Date',
    };


    var datepicker = new tui.DatePicker('#' + selector + '_wrapper', {
        date: date,
        input: {
            element: '#' + selector,
            format: 'yyyy-MM-dd'
        },
        language: 'customKey',
    });

    return datepicker;
}




function load_detail_gallery() {
    // Init empty gallery array
    // Init empty gallery array
    var container = new Array();
    var id = '';

    $(".gallery2").each(function () {
        id = $(this).attr('id');
        container[id] = ['pc', 'm'];
        container[id]['pc'] = [];
        container[id]['m'] = [];
        // Loop over gallery items and push it to the array
        $(this).find(".pc-visible").find('.grid-gallery-b').find('figure').each(function () {
            var url = $(this).find('.wrap').attr('href');
            $(this).css('background', 'url("' + url + '") center center / cover no-repeat');
            var $link = $(this).find('a'),
                item = {
                    src: $link.attr('href'),
                    w: $link.data('width'),
                    h: $link.data('height'),
                    title: $link.data('captionTitle')
                };
            container[id]['pc'].push(item);
        });
        $(this).find(".m-visible").find('.grid-gallery-b').find('figure').each(function () {
            var url = $(this).find('.wrap').attr('href');
            $(this).css('background', 'url("' + url + '") center center / cover no-repeat');
            var $link = $(this).find('a'),
                item = {
                    src: $link.attr('href'),
                    w: $link.data('width'),
                    h: $link.data('height'),
                    title: $link.data('captionTitle')
                };
            container[id]['m'].push(item);
        });
    });
    return container;
}

function load_simple_gallery() {

    // Init empty gallery array
    var container = new Array();
    var id = '';
    $(".gallery1").each(function () {
        id = $(this).attr('id');
        container[id] = ['pc', 'm'];
        container[id]['pc'] = [];
        container[id]['m'] = [];

        $(this).find('.pc-visible').find('.grid-gallery-a').find('figure').each(function () {
            var url = $(this).find('.wrap').attr('href');
            $(this).css('background', 'url("' + url + '") center center / cover no-repeat');
            var $link = $(this).find('a'),
                item = {
                    src: $link.attr('href'),
                    w: $link.data('width'),
                    h: $link.data('height'),
                    title: $link.data('captionTitle')
                };
            container[id]['pc'].push(item)
        });

        $(this).find(".m-visible").find('.grid-gallery-a').find('figure').each(function () {
            var url = $(this).find('.wrap').attr('href');
            $(this).css('background', 'url("' + url + '") center center / cover no-repeat');
            var $link = $(this).find('a'),
                item = {
                    src: $link.attr('href'),
                    w: $link.data('width'),
                    h: $link.data('height'),
                    title: $link.data('captionTitle')
                };
            container[id]['m'].push(item)
        });
    });
    return container;
}

function load_collage_gallery() {
    // Init empty gallery array
    var container = new Array();
    var id = '';
    $(".gallery3").each(function () {
        id = $(this).attr('id');
        container[id] = ['pc', 'm'];
        container[id]['pc'] = [];
        container[id]['m'] = [];
        var num = 0;
        $(this).find('.masonry-gallery').find(".pc-visible").find('.gal').each(function (idx, el) {
            $(el).find('figure').each(function (i) {
                var $link = $(this).find('a'),
                    item = {
                        src: $link.attr('href'),
                        w: $link.data('width'),
                        h: $link.data('height'),
                        title: $link.data('captionTitle')
                    };

                $link.data('num', num);
                num++;
                container[id]['pc'].push(item);
            });
        });
        var num = 0;
        $(this).find('.masonry-gallery').find(".m-visible").find('.gal').each(function (idx, el) {
            $(el).find('figure').each(function (i) {
                var $link = $(this).find('a'),
                    item = {
                        src: $link.attr('href'),
                        w: $link.data('width'),
                        h: $link.data('height'),
                        title: $link.data('captionTitle')
                    };
                $link.data('num', num);
                num++;
                container[id]['m'].push(item);
            });
        });
    });
    return container;
}
$(document).on('change', "[name='sort_key']", function (e) {
    var block_type = $(this).closest('.section').data('blockType');
    if (block_type == 'board') {
        search_board(this);
    } else if (block_type == 'gallery') {
        search_gallery(this);
    } else if (block_type == 'shop-board') {
        search_shop(this);
    }
});
$(document).on('change', "[name='category']", function (e) {
    var block_type = $(this).closest('.section').data('blockType');
    if (block_type == 'board') {
        search_board(this);
    } else if (block_type == 'gallery') {
        search_gallery(this);
    } else if (block_type == 'shop-board') {
        search_shop(this);
    }
});

function search_board(el) {
    var section_id = $(el).closest(".section").attr('id').toString();
    var form_id = $(el).closest("form").attr('id');
    var section_no = $("#" + form_id).find("[name='section_no']").val();
    var form = document.getElementById(form_id);
    $("#page_" + section_no).val(1);
    var data = new FormData(form);
    $.ajax({
        type: "post",
        url: getLocale() + '/board/ajaxboarddata',
        processData: false,
        contentType: false,
        data: data,
        dataType: 'html',
        success: function (result) {
            $("#" + section_id).html(result);
        }
    });
}

function search_gallery(el) {
    var section_id = $(el).closest(".section").attr('id').toString();
    var form_id = $(el).closest("form").attr('id');
    var section_no = $("#" + form_id).find("[name='section_no']").val();
    var form = document.getElementById(form_id);
    $("#page_" + section_no).val(1);
    var data = new FormData(form);
    $.ajax({
        type: "post",
        url: getLocale() + '/gallery/ajaxgallerydata',
        processData: false,
        contentType: false,
        data: data,
        dataType: 'html',
        success: function (result) {
            $("#" + section_id).html(result);
        }
    });
}

function search_shop(el) {
    var section_id = $(el).closest(".section").attr('id').toString();
    var form_id = $(el).closest("form").attr('id');
    var section_no = $("#" + form_id).find("[name='section_no']").val();
    var form = document.getElementById(form_id);
    $("#page_" + section_no).val(1);
    var data = new FormData(form);
    $.ajax({
        type: "post",
        url: getLocale() + '/shop/ajaxshopdata',
        processData: false,
        contentType: false,
        data: data,
        dataType: 'html',
        success: function (result) {
            $("#" + section_id).html(result);
        }
    });
}

function instaMore(el) {
    var count = Number($(el).data("show"));
    var i = 0;
    for (var i = 0; i < count; i++) {
        $(el).closest(".insta-wrap").find(".gal").not(":visible").eq(0).removeClass("d-none d-md-none");
        if ($(el).closest(".insta-wrap").find(".gal").not(":visible").length == 0) {

            $(el).hide();
        }
    }

}
$(document).ready(function () {
    $('.datepicker').datetimepicker({
        format: 'YYYY-MM-DD'
    });

    $('.timepicker').datetimepicker({
        format: 'HH:mm'
    });
});