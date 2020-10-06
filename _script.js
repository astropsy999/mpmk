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
                success: function (data) {
                    $("#getResult").removeAttr('disabled');
                    $(".calc").css('display', 'none');
                    if (data.res == 1) {
                        $("#dataAnswerCorProc").html(data.vkk.join('<br/>'));

                        var ctx = document.getElementById('myChart').getContext("2d");
                        console.log(data);

                    let dataVid = Array.from(data.table, ({vid}) => vid),
                        dataUniVid = [...new Set(dataVid)];

                    let dataMk = Array.from(data.table, ({mk}) => mk);
                    let dataVer = Array.from(data.table, ({ver}) => ver);





                    console.log(dataVid);
                    console.log(dataUniVid);
                    console.log(dataMk);
                    console.log(dataVer);

                        
                                                   

                        
                        
                        let tableB = '';
                        for (let i = 0; i < data.table.length; i++) {

                            tableB += '<tr>';
                            if (data.table[i].img == false) {
                                tableB += '<td></td>';
                            } else {

                                tableB += '<td><img src="' + img_url + data.table[i].img + img_ext + '?rnd=' + Math.floor(Math.random() * 101) + ' class="result_img" tabindex="0">';
                                tableB += '<img src="' + img_url + data.table[i].img + '1' + img_ext + '?rnd=' + Math.floor(Math.random() * 101) + 'alt="" class="result_img" tabindex="0"></td>';

                            }

                            tableB += '<td class="vidd">' + data.table[i].vid + '</td>';
                            tableB += '<td>' + data.table[i].mk + '</td>';
                            tableB += '<td class="viyavl">' + data.table[i].ver + '%</td>';

                            tableB += '<td class="prim">' + data.table[i].prim + '</td>';
                            tableB += '<td class="rec">' + data.table[i].rec + '</td>';
                            tableB += '</tr>';

                            }  
                           
// График

am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end



    var chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 30;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = [{
            category: 'Place #1',
            first: 40,
            second: 55,
            third: 60
        },
        {
            category: 'Place #2',
            first: 30,
            second: 78,
            third: 69
        },
        {
            category: 'Place #3',
            first: 27,
            second: 40,
            third: 45
        },
        {
            category: 'Place #4',
            first: 50,
            second: 33,
            third: 22
        }
    ]


    createSeries('first', 'The First');
    createSeries('second', 'The Second');
    createSeries('third', 'The Third');

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    } else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({
                        property: "dx",
                        to: dx
                    }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({
                        property: "dx",
                        to: dx
                    }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }

}); // end am4core.ready()
                                                                            
                            
                                     
                                
                        
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


