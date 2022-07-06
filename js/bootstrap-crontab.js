/* bootstrap-crontab.js v 1.0.0 | © 2022 for DDReki | https://github.com/DDReki/bootstrap-crontab.git */
(function ($) {
    // creat cron main element
    $.crontabSelector = function () {
        var cronContainer = $("<div/>",{"id":"cronContainer"});
        // popover header
        var cronHeader = $('<div/>',{"id":"cronHeader"});
        $(cronHeader).appendTo(cronContainer);
        $(cronHeader).append('<code>Cron Expression：</code>');
        var cronExpression = $('<div>',{"class":"badge bg-success","id":"cronExpression"});
        $(cronExpression).appendTo(cronHeader);
        var cronExpressionList = ['minute-expresssion','hour-expresssion','day-expresssion','month-expresssion','week-expresssion']
        for (var cel=0;cel < cronExpressionList.length;cel++){
            $(cronExpression).append('<span class='+cronExpressionList[cel]+'> * </span> ');
        }
        // popover body
        var cronBody = $('<div/>',{"id":"cronBody","class":"mt-3 mb-3","style":"border:1px solid #dcdfe6;padding:10px;"});
        $(cronBody).appendTo(cronContainer);
        // popover footer
        var cronFooter = $('<div/>',{"id":cronFooter});
        $(cronFooter).append('<button type="button" class="btn btn-outline-secondary" id="cronCloseBtn">取消</button>');
        $(cronFooter).append('<button type="button" class="btn btn-outline-success pull-right" id="cronSubmitBtn">确认</button>');
        $(cronFooter).appendTo(cronContainer);

        // cron header
        var cronMenu = $("<ul/>",{"class":"nav nav-tabs","id":"cronTab"});
        $("<li/>",{"class":"nav-item","role":"presentation"}).html($('<a class="nav-link active" id="minute-tab" data-bs-toggle="tab" href="#minute-cron" role="tab" aria-controls="minute" aria-selected="true"><i class="fa fa-calendar" aria-hidden="true"></i> 分</a>')).appendTo(cronMenu);
        $("<li/>",{"class":"nav-item","role":"presentation"}).html($('<a class="nav-link" id="hour-tab" data-bs-toggle="tab" href="#hour-cron" role="tab" aria-controls="hour" aria-selected="false"><i class="fa fa-calendar" aria-hidden="true"></i> 时</a>')).appendTo(cronMenu);
        $("<li/>",{"class":"nav-item","role":"presentation"}).html($('<a class="nav-link" id="day-tab" data-bs-toggle="tab" href="#day-cron" role="tab" aria-controls="day" aria-selected="false"><i class="fa fa-calendar" aria-hidden="true"></i> 天</a>')).appendTo(cronMenu);
        $("<li/>",{"class":"nav-item","role":"presentation"}).html($('<a class="nav-link" id="month-tab" data-bs-toggle="tab" href="#month-cron" role="tab" aria-controls="month" aria-selected="false"><i class="fa fa-calendar" aria-hidden="true"></i> 月</a>')).appendTo(cronMenu);
        $("<li/>",{"class":"nav-item","role":"presentation"}).html($('<a class="nav-link" id="week-tab" data-bs-toggle="tab" href="#week-cron" role="tab" aria-controls="week" aria-selected="false"><i class="fa fa-calendar" aria-hidden="true"></i> 周</a>')).appendTo(cronMenu);
        $(cronMenu).appendTo(cronBody);
        // cron body
        var cronContent = $("<div/>",{"class":"tab-content mt-3","id":"cronTabContent"});
        $(cronContent).appendTo(cronBody);
        // minute content
        var minuteTab = cronContentSelector('minute','分钟');
        $(minuteTab).appendTo(cronContent);
        // hour content
        var hourTab = cronContentSelector('hour','小时');
        $(hourTab).appendTo(cronContent);
        // day content
        var dayTab = cronContentSelector('day','天');
        $(dayTab).appendTo(cronContent);
        // month content
        var monthTab = cronContentSelector('month','月');
        $(monthTab).appendTo(cronContent);
        // week content
        var weekTab = cronContentSelector('week','周');
        $(weekTab).appendTo(cronContent);
        return cronContainer
    }

    // cron content element
    var cronContentSelector = function(cron_type,cron_p){
        var min_num = 0;
        var max_num;
        var multip_list;
        if (cron_type == "minute"){
            max_num = 59;
            multip_list = Array.from({ length: max_num+1 }, (v, n) => n);
        }
        else if (cron_type == "hour"){
            max_num = 23;
            multip_list = Array.from({ length: max_num+1 }, (v, n) => n);
        }
        else if (cron_type == "day"){
            min_num = 1;
            max_num = 31;
            multip_list = Array.from({ length: max_num }, (v, n) => n+1);
        }
        else if(cron_type == "month"){
            min_num = 1;
            max_num = 12;
            multip_list = Array.from({ length: max_num }, (v, n) => n+1);			
        }
        else{
            min_num = 1;
            max_num = 7;
            multip_list = ["星期一","星期二","星期三","星期四","星期五","星期六","星期天"]
        }
        var cronTab = $("<div/>",{"class":"tab-pane fade",id:cron_type+"-cron","aria-labelledby":cron_type+"-tab"});
        /*
            每一..
        */
        var cronEvery = $("<div/>",{"class":"form-check mb-3","id":"cron-radio-select"});
        $(cronEvery).appendTo(cronTab);
        $(cronEvery).append('<input class="form-check-input" type="radio" name="'+cron_type+'Radio" id="'+cron_type+'Every" checked>');
        $(cronEvery).append('<span> 每一'+cron_p+'</span>')
        if (cron_type != 'week'){
            /*
                每隔..执行，从..开始
            */
            var cronInterval = $("<div/>",{"class":"form-check mb-3","id":"cron-radio-select"});
            $(cronInterval).appendTo(cronTab);
            $(cronInterval).append('<input class="form-check-input" type="radio" name="'+cron_type+'Radio" id="'+cron_type+'Interval">');
            var cronIntervalContent = $("<div/>",{"class":"input-group","id":cron_type+"IntervalContent"});
            $(cronIntervalContent).appendTo(cronInterval);
            $(cronIntervalContent).append('<span style="transform:translateY(15%)"> 每隔&emsp;</span>');
            $(calculateInput(min_num,max_num)).appendTo(cronIntervalContent);
            $(cronIntervalContent).append('<span style="transform:translateY(15%)">&emsp;'+cron_p+'执行 从&emsp;</span>');
            $(calculateInput(min_num,max_num)).appendTo(cronIntervalContent);
            $(cronIntervalContent).append('<span style="transform:translateY(15%)">&emsp;'+cron_p+'开始</span>');
        }

        /*
            具体..数
        */
        var cronSpecific = $("<div/>",{"class":"form-check mb-3","id":"cron-radio-select"});
        $(cronSpecific).appendTo(cronTab);
        $(cronSpecific).append('<input class="form-check-input" type="radio" name="'+cron_type+'Radio" id="'+cron_type+'Specific">');
        var cronSpecificContent = $("<div/>",{"class":"form-group","id":cron_type+"SpecificContent"});
        $(cronSpecificContent).appendTo(cronSpecific);
        var cronSpecificSelect = multipleSelect(multip_list);
        $(cronSpecificContent).append(' 具体'+cron_p+'数(可多选)');
        $(cronSpecificSelect).appendTo(cronSpecificContent);
        /*
            周期
        */ 
        var cronPeriodic = $("<div/>",{"class":"form-check mb-3","id":"cron-radio-select"});
        $(cronPeriodic).appendTo(cronTab);
        $(cronPeriodic).append('<input class="form-check-input" type="radio" name="'+cron_type+'Radio" id="'+cron_type+'Periodic">');
        var cronPeriodicContent = $("<div/>",{"class":"input-group","id":cron_type+"PeriodicContent"});
        $(cronPeriodicContent).appendTo(cronPeriodic);
        $(cronPeriodicContent).append('<span style="transform:translateY(15%)"> 周期从&emsp;</span>');
        $(calculateInput(min_num,max_num)).appendTo(cronPeriodicContent);
        $(cronPeriodicContent).append('<span style="transform:translateY(15%)">&emsp;到&emsp;</span>');
        $(calculateInput(min_num,max_num)).appendTo(cronPeriodicContent);
        $(cronPeriodicContent).append('<span style="transform:translateY(15%)">&emsp;'+cron_p+'</span>');
        return cronTab
    }

    // calculate input button element
    var calculateInput = function(min_num,max_num){
        var addreduceElement = $("<div/>",{"class":"input-group","id":"addReduce","style":"width:100px;"})
        $("<button/>",{"class":"btn btn-secondary btn-sm","type":"button","id":"reduceNum"}).html($('<i class="fa fa-chevron-left" aria-hidden="true"></i>')).appendTo(addreduceElement);
        $("<input/>",{"class":"form-control form-control-sm text-center","type":"text","value":min_num,"min":min_num,"max":max_num}).appendTo(addreduceElement);
        $("<button/>",{"class":"btn btn-secondary btn-sm","type":"button","id":"addNum"}).html($('<i class="fa fa-chevron-right" aria-hidden="true"></i>')).appendTo(addreduceElement);
        return addreduceElement
    };

    // add multi select element value
    var multipleSelect = function(value_list){
        var selectElement = $("<select/>",{"class":"choices form-select multiple-remove","multiple":"multiple"});
        if (value_list.length >=1){
            for (var vl=0;vl<value_list.length;vl++){
                var option_element = $('<option value='+value_list[vl]+'>'+value_list[vl]+'</option>');
                $(option_element).appendTo(selectElement); 
            }
        }
        return selectElement
    };

    // return chinese to number 
    var chineseToNumber = function(value){
        var result;
        switch (value) {
            case "星期一":
                result = 1;
                break;
            case "星期二":
                result = 2;
                break;
            case "星期三":
                result = 3;
                break;
            case "星期四":
                result = 4;
                break;
            case "星期五":
                result = 5;
                break;
            case "星期六":
                result = 6;
                break;
            case "星期天":
                result = 7;
                break;
            default:
                result = value;
                break;
        }
        return result
    };

    // radio click to cron select,get the value
    $(document).on("click","#cron-radio-select",function(){
        var input_element = $(this).find("input").attr("id");
        $("#"+input_element).prop('checked',true);
        if (input_element.endsWith("Every")){
            $("."+input_element.replace("Every","")+"-expresssion").text("*");
        }
        else if (input_element.endsWith("Interval")){
            var cronInterval = $("#"+input_element+"Content #addReduce>input:eq(1)").val() + "/" + $("#"+input_element+"Content #addReduce>input:eq(0)").val()
            $("."+input_element.replace("Interval","")+"-expresssion").text(cronInterval);
        }
        else if (input_element.endsWith("Specific")){
            var select_option_array = [];
            $(this).find("option").each(function(){
                    select_option_array.push(chineseToNumber($(this).val()));
                })
            if (select_option_array.length > 0){
                select_option_array = select_option_array.sort().join(',')
            }
            else{
                select_option_array = '*'
            }
            $("."+input_element.replace("Specific","")+"-expresssion").text(select_option_array);
            $(document).on("DOMNodeInserted","#"+input_element+"Content .choices__inner>select",function(){
                var select_option_array = [];
                $(this).find("option").each(function(){
                    select_option_array.push(chineseToNumber($(this).val()));
                })
                $("."+input_element.replace("Specific","")+"-expresssion").text(select_option_array);
            });
        }
        else if (input_element.endsWith("Periodic")){
            var cronPeriodic = $("#"+input_element+"Content #addReduce>input:eq(0)").val() + "-" + $("#"+input_element+"Content #addReduce>input:eq(1)").val()
            $("."+input_element.replace("Periodic","")+"-expresssion").text(cronPeriodic);
        }
        else{
            console.log("error")
        }
    });

    // number calculate
    var intervalId;
    // click reduce
    $(document).on("click","#reduceNum",function() {
        var reduce_result = parseInt($(this).parent().find("input").val()) - 1;
        var min_num = parseInt($(this).parent().find("input").attr("min"));
        if (reduce_result < min_num){
            reduce_result = min_num;
        };
        $(this).parent().find("input").val(reduce_result);
    });
    // long press reduce
    $(document).on("mousedown","#reduceNum",function(){
        var reduce_result_element = $(this).parent().find("input");
        var reduce_result = parseInt(reduce_result_element.val());
        var min_num = parseInt($(this).parent().find("input").attr("min"));
        intervalId = setInterval(function(){
            reduce_result --;
            if (reduce_result < min_num){
                reduce_result = min_num;
            }
            reduce_result_element.val(reduce_result);
        },100);
    });
    $(document).on("mouseup","#reduceNum",function(){
        clearInterval(intervalId);
    });
    $(document).on("mouseout","#reduceNum",function(){
        clearInterval(intervalId);
    });
    // click add
    $(document).on("click","#addNum",function() {
        var add_result = parseInt($(this).parent().find("input").val()) + 1;
        var max_num = parseInt($(this).parent().find("input").attr("max"));
        if (add_result > max_num){
            add_result = max_num;
        }
        $(this).parent().find("input").val(add_result);
    });
    // long press add
    $(document).on("mousedown","#addNum",function(){
        var add_result_element = $(this).parent().find("input");
        var add_result = parseInt(add_result_element.val());
        var max_num = parseInt($(this).parent().find("input").attr("max"));
        intervalId = setInterval(function(){
            add_result ++;
            if (add_result > max_num){
                add_result = max_num;
            }
            add_result_element.val(add_result);
        },100);
    });
    $(document).on("mouseup","#addNum",function(){
        clearInterval(intervalId);
    });
    $(document).on("mouseout","#addNum",function(){
        clearInterval(intervalId);
    });
})(jQuery);