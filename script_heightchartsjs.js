const dataFill = function () {
    let data = [];
    const img_url = 'https://giapdc.ru/forms/mpmk/img/';
    const img_ext = '.jpg';
    const fillClassObj = () => {};
    const zapros = () => {
        $.ajax({
            url: 'https://service.giapdc.ru/index.php/InfoController/getSiteInfo?key=1316c5212b3a76df53b447f0332280bd&mode=1',
            method: 'post',
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data['mat'].length; i++) {
                    let option = "<option " + "value='" + data['mat'][i]['m'] + "' data-typeM='" + data['mat'][i]['tm'] + "'>" + data['mat'][i]['m'] + "</option>";
                    $("#materialList").append(option);
                }
                $("#materialList").selectpicker('refresh');

                for (let i = 0; i < data['tM'].length; i++) {
                    let option = "<option " + "value='" + data['tM'][i]['key'] + "'>" + data['tM'][i]['label'] + "</option>";
                    $("#materialTypeList").append(option);
                }
                $("#materialTypeList").selectpicker('refresh');

                for (let i = 0; i < data['pS'].length; i++) {
                    let option = "<option " + "value='" + data['pS'][i]['key'] + "'>" + data['pS'][i]['label'] + "</option>";
                    $("#protectSredaList").append(option);
                }
                $("#protectSredaList").selectpicker('refresh');

                for (let i = 0; i < data['ogrS'].length; i++) {
                    let option = "<option " + "value='" + data['ogrS'][i]['key'] + "'>" + data['ogrS'][i]['label'] + "</option>";
                    $("#agrCompList").append(option);
                }
                $("#agrCompList").selectpicker('refresh');

                for (let i = 0; i < data['dopF'].length; i++) {
                    let option = "<option " + "value='" + data['dopF'][i]['key'] + "'>" + data['dopF'][i]['label'] + "</option>";
                    $("#dopFactList").append(option);
                }
                $("#dopFactList").selectpicker('refresh');

                for (let i = 0; i < data['sre'].length; i++) {
                    let option = "<option " + "value='" + data['sre'][i]['key'] + "'>" + data['sre'][i]['label'] + "</option>";
                    $("#sredaList").append(option);
                }
                $("#sredaList").selectpicker('refresh');

                for (let i = 0; i < data['agrList'].length; i++) {
                    let option = "<option " + "value='" + data['agrList'][i]['key'] + "'>" + data['agrList'][i]['label'] + "</option>";
                    $("#agrList").append(option);
                }
                $("#agrList").selectpicker('refresh');
            }
        });
    }

    const groupTable = ($rows) => {
        var i, count = 1;
        var vids = $rows.find('td:eq(1)');
        var pics = $rows.find('td:eq(0)');
        var vid = $(vids[0]);
        var pic = $(pics[0]);
        for (i = 1; i < vids.length; i++) {
            if (vid.text() == $(vids[i]).text()) {
                count++;
                $(vids[i]).addClass('deleted');
                $(pics[i]).addClass('deleted');
            } else {
                if (count > 1) {
                    vid.attr('data-rowspan', count);
                    pic.attr('data-rowspan', count);
                }
                count = 1;
                vid = $(vids[i]);
                pic = $(pics[i]);
            }
        }
        if (count > 1) {
            vid.attr('data-rowspan', count);
            pic.attr('data-rowspan', count);
        }
    }
    const events = () => {

        $('#materialList').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            let val = $(this).val();

            if ($(this).attr('disabled') != true) {
                if (val == 'Ничего не выбрано') {
                    let typM = $("#materialList option[value='" + previousValue + "']").data('typem');
                    $("#materialTypeList option.tizemec").remove();
                    $("#materialTypeList").attr('disabled', false);
                    $("#materialTypeList").val('Ничего не выбрано');
                } else {
                    let typM = $("#materialList option[value='" + val + "']").data('typem');
                    let option = "<option " + "value='" + typM + "' class='tizemec'>" + typM + "</option>";
                    $("#materialTypeList").append(option);
                    $("#materialTypeList").attr('disabled', true);
                    $("#materialTypeList").val(typM);
                }
                $("#materialTypeList").selectpicker('refresh');
            }
        });
        $('#materialTypeList').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            let val = $(this).val();
            if ($(this).attr('disabled') != true) {
                if (val == 'Ничего не выбрано') {
                    $("#materialList").attr('disabled', false);
                } else {
                    $("#materialList").attr('disabled', true);
                    $("#materialList").val('Ничего не выбрано');
                }
                $("#materialList").selectpicker('refresh');
            }
        });
        $('#sredaList').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            let val = $(this).val();
            $('#sredaList option:selected').prependTo('#sredaList');
            $("#sredaList").selectpicker('refresh');
            if (val == null) {
                //тут пусто
                $('#sredaList').find('option').attr('disabled', false);
                $("#sredaList").selectpicker('refresh');
            } else if (val.length == 1) {
                if (val[0] == 'Атмосферный воздух') {
                    $('#sredaList').find('option[value!="Атмосферный воздух"]').attr('disabled', true);
                } else {
                    $('#sredaList').find('option[value="Атмосферный воздух"]').attr('disabled', true);
                }
                $("#sredaList").selectpicker('refresh');
            }

        });

        $('#agrList').on('changed.bs.select', function () {
            $('#agrList option:selected').prependTo('#agrList');
            $("#agrList").selectpicker('refresh');
        });

        $('#dopFactList').on('changed.bs.select', function () {
            $('#dopFactList option:selected').prependTo('#dopFactList');
            $("#dopFactList").selectpicker('refresh');
        });

        $('#getResult').on('click', function () {
            $(".my-error-message").css("display", "none");
            $(".my-error-control").removeClass('my-error-control');
            $(".calc").css('display', 'block');


            let dt = {};
            dt.material = $("#materialList").val() == '' || $("#materialList").val() == 'Ничего не выбрано' ? null : $("#materialList").val();
            dt.materialType = $("#materialTypeList").val() == '' || $("#materialTypeList").val() == 'Ничего не выбрано' ? null : $("#materialTypeList").val();
            dt.protectSreda = $("#protectSredaList").val() == '' || $("#protectSredaList").val() == 'Ничего не выбрано' ? null : $("#protectSredaList").val();
            dt.ogrContr = $("#agrCompList").val();
            dt.expSreda = $("#sredaList").val();
            dt.agrComp = $("#agrList").val();
            dt.dopFact = $("#dopFactList").val();
            dt.davl = $("#davl").val() == "" ? null : $("#davl").val();
            dt.temp = $("#temp").val() == "" ? null : $("#temp").val();
            if ((dt.material == null && dt.materialType == null) || dt.expSreda == null || dt.temp == null) {
                if (dt.material == null && dt.materialType == null) {
                    $("#materialList").siblings('.my-error-message').css("display", "block");
                    $("#materialList").siblings('.bootstrap-select').addClass('my-error-control');
                    $("#materialTypeList").siblings('.my-error-message').css("display", "block");
                    $("#materialTypeList").siblings('.bootstrap-select').addClass('my-error-control');
                    $(".calc").css('display', 'none');
                }
                if (dt.expSreda == null) {
                    $("#sredaList").siblings('.my-error-message').css("display", "block");
                    $("#sredaList").siblings('.bootstrap-select').addClass('my-error-control');
                    $(".calc").css('display', 'none');
                }
                if (dt.temp == null) {
                    $("#temp").siblings('.my-error-message').css("display", "block");
                    $("#temp").addClass('my-error-control');
                    $(".calc").css('display', 'none');

                }
                console.log("Необходимо заполнить обязательные параметры");

                return;
            }
            $("#getResult").attr('disabled', true);


            $.ajax({
                url: 'https://service.giapdc.ru/index.php/InfoController/getSiteInfo?key=1316c5212b3a76df53b447f0332280bd&mode=2',
                method: 'post',
                dataType: 'json',
                data: {
                    dt:dt
                },
                success: function (data1) {
                    $("#getResult").removeAttr('disabled');
                    $(".calc").css('display', 'none');
                    if (data1.res == 1) {
                        $("#dataAnswerCorProc").html(data1.vkk.join('<br/>'));

                        // График. Преобразовываем данные

                        // var ctx = document.getElementById('myChart').getContext('2d');

                    let dataVid = Array.from(data1.table, ({vid}) => vid),
                        dataUniVid = [...new Set(dataVid)];

                    let dataMk = Array.from(data1.table, ({mk}) => mk);
                    let dataUniMk = [...new Set(dataMk)];
                    let dataVer = Array.from(data1.table, ({ver}) => ver);

                    console.log(dataVid);
                    console.log(dataUniVid);
                    console.log(dataMk);
                    console.log(dataVer);
                    console.log(dataUniMk);
                   
                    // Данные для графика

                    
                    
           


                                            
                        let tableB = '';
                        let dataSeries = [];
                            
                        for (let i = 0; i < data1.table.length; i++) {
                            
                            

                            

                            
                            

                             dataSeries.push({
                                name: data1.table[i].mk,
                                data: +data1.table[i].ver
                            })

                            

                            //  График

                            Highcharts.chart('container', {
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    text: 'Теоретически возможные дефекты '
                                },
                                subtitle: {
                                    text: 'Рекомендации по их выявлению'
                                },
                                xAxis: {
                                    categories: dataUniVid,
                                    crosshair: true
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Выявляемость, %'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    column: {
                                        pointPadding: 0.2,
                                        borderWidth: 0
                                    }
                                },
                                
                                series: dataSeries
                                
                            });

                            

                            // Таблица

                            tableB += '<tr>';
                            if (data1.table[i].img == false) {
                                tableB += '<td></td>';
                            } else {

                                tableB += '<td><img src="' + img_url + data1.table[i].img + img_ext + '?rnd=' + Math.floor(Math.random() * 101) + ' class="result_img" tabindex="0">';
                                tableB += '<img src="' + img_url + data1.table[i].img + '1' + img_ext + '?rnd=' + Math.floor(Math.random() * 101) + 'alt="" class="result_img" tabindex="0"></td>';

                            }

                            tableB += '<td class="vidd">' + data1.table[i].vid + '</td>';
                            tableB += '<td>' + data1.table[i].mk + '</td>';
                            tableB += '<td class="viyavl">' + data1.table[i].ver + '%</td>';

                            tableB += '<td class="prim">' + data1.table[i].prim + '</td>';
                            tableB += '<td class="rec">' + data1.table[i].rec + '</td>';
                            tableB += '</tr>';

                            }  
                           
                     
                            console.log(dataSeries);
    
                                                                            
                            
                                     
                                
                        
                        $('#dataAnswerDefTable tbody').html(tableB);
                        groupTable($('#dataAnswerDefTable tbody tr'), 1, 1);
                        $('#dataAnswerDefTable .deleted').remove();
                        $('#dataAnswerDefTable td[data-rowspan]').each(function () {
                            $(this).attr('rowspan', $(this).attr('data-rowspan'));
                        });
                        $('#material').text(dt.material);
                        $('#materialType').text(dt.materialType);
                        $('#protect').text(dt.protectSreda || 'нет');
                        $('#confines').text(dt.ogrContr || 'нет');
                        $('#techsreda').text(dt.expSreda || 'нет');
                        $('#components').text(dt.agrComp || 'нет');
                        $('#dopfactors').text(dt.dopFact || 'нет');
                        $('#davlenie').text(dt.davl || 'нет');
                        $('#temper').text(dt.temp);
                        $('#stageResult').css('display', 'block');
                        $('.enterform').css('display', 'none');
                        $('.indata-link').on('click', function () {
                        $('.indataflx').slideToggle(500);

                        });

                        $('#mod').modal('show');
                        $("img").error(function () {
                            $(this).hide();


                        });

                    }

                },
                error: function () {
                    console.log("fhgfgfgf");
                    $("#getResult").removeAttr('disabled');
                }
            });
            console.log(dt);

        });
        //тултипы
        $('[data-toggle="tooltip"],[data-toggle="dropdown"]').tooltip();
    }
    return {
        init: function () {
            zapros();
            events();
        }
    }


}();


// Защита от копирования

$(function () {
    $('.allform').attr('oncopy', 'return false;');
    $('#mod').attr('oncopy', 'return false;');
});

$(function () {
    $(".selectpicker").selectpicker({
        liveSearch: true,
        noneResultsText: 'Ничего не найдено',
        size: 10
    });
    dataFill.init();
    $('.select-multiple').on('changed.bs.select', function (e) {
        const $this = $(this);
        selectData = $this.data('selectpicker');
        if (selectData) {
            selectData.$newElement.removeClass('open');
        }
    });
});


