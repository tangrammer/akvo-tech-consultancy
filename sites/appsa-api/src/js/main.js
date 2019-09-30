import './../css/custom.css';
const axios = require("axios");
const baseurl = $("meta[name=path]").attr("content");


let post_data = {};
let project_option = () => {
    let selected = $("input[name='project-option']:checked").map(function(_, el) {
        return $(el).val();
    }).get();
    if (selected.length > 0){
        return selected;
    }
    return false;
};

let project_selection = () => {
    let selected = $("input[name='project-selection']:checked").map(function(_, el) {
        return $(el).val();
    }).get();
    if (selected[0]){
        return selected[0];
    }
    return false;
};

let project_type = () => {
    let yearly = $("#period-yearly").prop("checked");
    let semester = $("#period-semester").prop("checked");
    if (yearly) {
        return "yearly";
    }
    if (semester) {
        return "semester";
    }
    return false;
};

let date_selected = (x) => {
    let selected = $("#period-" + x + "-select option:selected").text();
    if (selected === ""){
        return false
    }
    return selected;
};

let showModal = (html) => {
    $(".modal-data").children().remove();
    $(".modal-data").append("<div>" + html + "</div>");
    $("#modal").modal('toggle');
    $('#modal').on('hidden.bs.modal', function() {
        $("#save-comment").remove();
        $("#discard-comment").hide();
        $("#close-modal").show();
        $(".modal-data").children().remove();
        $(".modal-comment").children().hide();
        $(".text-comment").remove();
    });
};

let generateModal = (data) => {
    data = JSON.parse(data);
    if (data.length > 0) {
        let indicator = (data[0]['indicator_name']);
        let indicator_id = (data[0]['indicator_id']);
        let dimension_name = (data[0]['dimension_name']);
        $("#modal-title").text(indicator);
        $("#modal-subtitle").text(dimension_name);
        let html = "<table class='table table-striped'>";
        html += "<thead>";
        html += "<tr>";
        html += "<td>Report Date</td>";
        html += "<td>Country</td>";
        html += "<td>Disaggregation</td>";
        html += "<td>Value</td>";
        html += "</tr>"
        html += "</thead>";
        html += "<tbody>";
        let content = data.map(x => {
            html += "<tr>";
            html += "<td>" + x.date + "</td>";
            html += "<td>" + x.country + "</td>";
            html += "<td>" + x.commodity + "</td>";
            html += "<td>" + x.value + "</td>";
            html += "</tr>";
        });
        html += "</tbody>";
        html += "<table>";
        showModal(html);
        axios.get(baseurl + '/api/live/indicator_period_framework/indicator/' + indicator_id)
            .then(response => {
                $(".text-comment").remove();
                return response.data.map(x => {
                    if (x['actual_comment'].length > 0) {
                        $(".modal-comment").append("<div class='text-comment'>" + x['actual_comment'] + "</div>");
                    }
                });
            });
        return true;
    }
    return true;
};

let mergecomment = (data) => {
    $(".modal-comment").prepend("<div class='text-comment'>" + data['event_date'] + ": " + data['text'] + "</div>");
    return true;
}
let mergecomments = (data) => {
    data.map(x => {
        return $(".modal-comment").prepend("<div class='text-comment'>" + x['event_date'] + ": " + x['text'] + "</div>");
    })
    return true;
}

let postcomment = (json) => {
    return axios.post(baseurl + "/api/postcomment", json)
        .then(response => {
            mergecomment(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}
let getcomments = (data) => {
    return axios.post(baseurl + "/api/getcomments", data)
        .then(response => {
            return mergecomments(response.data);
        }).catch(error => {
            console.log(error);
        });
}

let generateModalComment = (data) => {
    data = JSON.parse(data);
    let indicator = (data[0]['indicator_name']);
    let result_id = (data[0]['result_id']);
    $("#modal-title").text('Add New Comment');
    $("#modal-subtitle").text(indicator);
    getcomments(data);
    axios.post(baseurl + "api/comment-validator", data)
        .then(response => {
            let validator = response.data;
            $("#comment-validator").val(validator);
            return true;
        }).catch(error => {
            console.log(error);
        });
    $("#save-comment").remove();
    $(".comment-group").show();
    $("#comment-title").val("");
    $("#comment-input").val("");
    $("#discard-comment").show();
    $("#close-modal").hide();
    $(".modal-footer").append('<button type="button" class="btn btn-primary" id="save-comment">Save Comment</button>');
    $("#save-comment").on('click', () => {
        console.log("test");
        let title = () => {return $("#comment-input").val();}
        let content = () => {return $("#comment-title").val();}
        let validator = () => {return $("#comment-validator").val();}
        let json = {
            "validator": validator(),
            "message": content(),
            "title": title(),
        };
        console.log(json);
        postcomment(json);
    });
    return showModal("");
};

let generateGroup = (val, json) => {
    let html = "<td class='text-right has-data' data-details='" + JSON.stringify(json) + "'>" + val + "</td>";
    return html;
}

let generateReport = (pd) => {
    $("#generate-report i").show();
    axios.post(baseurl + "/api/datatables/" + pd.project_id, pd)
        .then(response => {
            return generateTable(response.data);
        })
        .catch(error => {
            $("#list-of-alerts").append(
                "<h4 class='text-center'>Data is Not Available</h4>"
            );
            $("#alert").modal().show();
        })
};

$("#period-yearly").on('click', () => {
    $("#period-semester").prop('checked',false);
});
$("#period-semester").on('click', () => {
    $("#period-yearly").prop('checked',false);
});


$("input[name='project-selection'").map((x) => {
    let selection = $("input[name='project-selection'");
    let selected = $("input[name='project-selection'")[x];
    let selected_id = $("input[name='project-selection'")[x];
    $(selected).on('click', () =>{
        $(selection).map((a) => {
            let ids = $("input[name='project-selection'")[a];
            if (ids !== selected_id) {
                $(ids).prop('checked', false);
            }
        });
    });
});

let update_data = () => {
    let report_type = project_type();
    let data = {
        'report_type': report_type,
        'filter_date': date_selected(report_type),
        'project_id': project_selection(),
        'project_option': project_option()
    };
    return data;
};

$("#generate-report").on('click', () => {
    let post_data = update_data();
    $("#list-of-alerts").children().remove();
    let show_alert = false;
    let html = "<h4><i class='fa fa-times-circle' style='color:red;'></i> ";
    if(post_data["project_id"] === false) {
        show_alert = true;
        $("#list-of-alerts").append(
            html + "<a href='#projects'>Project ID is not Set</a></h4>"
        );
    }
    if(post_data["project_option"] === false) {
        show_alert = true;
        $("#list-of-alerts").append(
            html + "<a href='#settings'>Country is not Set</a></h4>"
        );
    }
    if(post_data["filter_date"] === false) {
        show_alert = true;
        $("#list-of-alerts").append(
            html + "<a href='#settings'>Period is not Set</a></h4>"
        );
    }
    if (show_alert) {
        $("#alert").modal('toggle');
        return false;
    }
    return generateReport(post_data);
});

let destroyTable = () => {
    let table = $("#rsr_table").Datatable();
    table.destroy();
    table.empty();
    $("#rsr_table tbody").children().remove();
};

let createRow = (data, col_type, country) => {
    col_type += "-" + country;
    let details = col_type + "-D";
    let tdclass = "no-data";
    if (data[details] !== null) {
        tdclass = "has-data";
    }
    let html = "<td class='text-right " + tdclass + "' data-details='" + JSON.stringify(data[details]) + "'>";
    html += data[col_type];
    html += "</td>";
    return html;
}

let generateTable = (response) => {
    if ($.fn.DataTable.isDataTable('#rsr_table')) {
        $('#rsr_table').DataTable().destroy();
    }
    $('#rsr_table tbody').empty();
    let data = response.values;
    let resultTitle = response.result_titles;
    let groupTitle = response.titles;
    data.map((x, i) => {
        let html = "<tr>";
        html += "<td>" + x['project_title'] + "</td>";
        html += "<td>" + x['indicator'] + "</td>";
        html += "<td>" + x['dimension_name'] + "</td>";
        html += "<td style='padding-left:50px;'>" + x['commodity'] + "</td>";
        ["TTL", "MW", "MZ", "ZA"].map(tvalue => {
            html += createRow(x, "TG", tvalue);
        });
        ["MW", "MZ", "ZA", "TTL"].map(tvalue => {
            html += createRow(x, "CA", tvalue);
        });
        html += "</tr>";
        $("#rsr_table tbody").append(html);
        return html;
    });
    /* dom: 'Brftip', */
    $("#rsr_table").show();
    const table = $("#rsr_table").DataTable({
        dom: 'Brftip',
        ordering: false,
        buttons: ['copy', 'print', 'excel', 'pdf'],
        fixedHeader: true,
        rowGroup: {
            startRender: (rows, group) => {
                let getattr = (x) => {
                    let rowidx = rows[0];
                    let camw = rows.cells().column(x).nodes();
                    let cells = [];
                    rowidx.map((a, i) => {
                        let json = camw[a].dataset.details;
                        try {
                            cells.push(JSON.parse(json)[0]);
                        } catch (error) {
                            console.log('no-data');
                        }
                        return true;
                    });
                    return cells;
                }
                let getvalue = (x) => {
                    let camw = rows
                        .data()
                        .pluck(x)
                        .reduce((a, b) => {
                            return a + b * 1;
                        }, 0);
                    return camw;
                }
                let html = '';
                if (groupTitle.indexOf(group) === -1) {
                    [4, 5, 6, 7, 8, 9, 10, 11].map((x) => {
                        let td = getvalue(x);
                        let act = getattr(x);
                        html += generateGroup(td, act);
                    })
                    return $("<tr/>")
                        .append("<td>" + group + "</td>")
                        .append(html)
                }
                let indicator_level = [];
                if (resultTitle.indexOf(group) === -1) {
                    [4, 5, 6, 7, 8, 9, 10, 11].map((x) => {
                        let td = getattr(x);
                        td.map((x) => {
                            indicator_level.push(x);
                        });
                    })
                    let comment_data = JSON.stringify(indicator_level);
                    html = "<td colspan=7>" + group + "</td>";
                    html += "<td class='has-data comment-form-show' data-comments=true data-details='" + comment_data + "' colspan=2>";
                    html += "<i class='fa fa-plus'></i> Comments</td>"
                    return $("<tr/>")
                        .append(html)
                }
                return $("<tr/>")
                    .append("<td colspan=9>" + group + "</td>")
            },
            endRender: null,
            dataSrc: [0, 1, 2]
        },
        columnDefs: [{
            targets: [0, 1, 2],
            visible: false
        }],
        scrollY: (screen.height - 300).toString() + "px",
        scrollCollapse: true,
        responsive: true,
        paging: false
    });
    table.columns.adjust();
    $('div.dataTables_filter input').addClass('search');
    $("#rsr_table tbody").on('click', 'td', function() {
        let iscomment = $(this).attr('data-comments');
        let cell = table.cell(this);
        let abs = $(this).attr('data-details');
        if (!iscomment) {
            generateModal(abs);
        } else {
            generateModalComment(abs);
        }
    });
    $("#generate-report i").hide();
    $("#scroll-report").click();
};
