const dataFill = function () {
    let data = [];
    const img_url = 'https://giapdc.ru/forms/mpmk/img/';
    const img_ext = '.jpg';
    const fillClassObj = () => {};
    
    // Формируем запрос
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
    
    // Проверка и передача данных

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

    // Получаем ответ

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
                                
                    
                        
                        
                        
                                   
                        
                        let tableB = '',
                            x = 0, 
                            ww=15, // расстояние между видами на графике 
                            
                            // Определяем ширину линий баров в зависимости от количества возможных дефектов
                            
                            $width = $('#svg.visualchart').width(),
                             datLen = data1.table.length,
                             wl = Math.round(0.6*$width / datLen); // ширина одного бара
                             
                            // Пишем название 1го дефекта
                            
                            // $('.data-vidname').append(`<text x="${x}" y="98%" class="vidname0">${data1.table[0].vid}</text>`)
                             let frstwdth = [],
                                 alltheVid = [],
                                 legMetds = [],
                                 col = '',
                                 lastEl = '',
                                 vidLen = []


                            //    function findLastEl() {
                            //        let f = data1.table.length - 1,
                                       
                            //        lastEl = data1.table[f].vid; }

                            //        return lastEl;                               


                              

                          
                        for (let i = 0;  i < data1.table.length; i++) {

                          

                            alltheVid.push(data1.table[i].vid)
                            legMetds.push(data1.table[i].mk)
                           
    // Помещаем данные в таблицу

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

        // Раскрашиваем методы контроля на графике 

        
        
       
        switch (data1.table[i].mk) {
            
            case 'Акустико-эмиссионный контроль': col = '#7FFFD4' 
            break
            case 'Вибродиагностика': col = '#78DBE2'
            break
            case 'Внутренний осмотр': col = '#FF2400'
            break
            case 'Геодезия': col = '#9F2B68'
            break
            case 'Гидравлические испытания': col = '#CD9575'
            break
            case 'Исследования механических свойств': col = '#44944A'
            break
            case 'Метод магнитной памяти': col = '#A8E4A0'
            break
            case 'Ультразвуковая дефектоскопия': col = '#990066'
            break
            case 'Цветная дефектоскопия': col = '#003153'
            break
            case 'Вихретоковый контроль': col = '#3D2B1F'
            break
            case 'Магнитный контроль': col = '#8CCB5E'
            break
            case 'Радиографический контроль': col = '#FFCF40'
            break
            case 'МИТ': col = '#2A8D9C'
            break
            case 'Металлографические исследования': col = '#DD80CC'
            break
            case 'Наружный осмотр': col = '#009B76'
            break
            case 'Пневмоиспытания': col = '#B00000'
            break
            case 'Стилоскопирование': col = '#3E5F8A'
            break
            case 'Тепловой контроль': col = '#FFB02E'
            break
            case 'Ультразвуковая толщинометрия': col = '#6495ED'
            break
            case 'Ультразвуковое скрининговое сканирование': col = '#34C924'
            break
            case 'Визуально-измерительный контроль': col = '#A7FC00'
            break
            case 'Магнитопорошковая дефектоскопия': col = '#0095B6'
            break
            case 'Прочность материалов': col = '#DCDCDC'
            break
            case 'Влажность элементов': col = '#F64A46'
            break
            case 'Замеры сопротивления': col = '#004524'
            break
            case 'Динамическое испытание': col = '#D1E231'
            break
            case 'Коэрцитиметрия': col = '#423189'
            break
            default: col = ''
        } 

        

        

               
            
        
        

        // Рисуем график

                         let ych = 197 - data1.table[i].ver // расстояние от начала координат до цифры над столбцом
                        
                         // добавляем бары графика, вычисляя их толщину в зависимости от количества баров    
                         $('.barchart').append(`<rect width="${wl}" height="${data1.table[i].ver}%" x=${x} y=0 fill="${col}"></rect>`);
                         // пишем значения над каждым баром
                         $('.txtchart').append(`<text x="${x}" y="${ych}%" class="charttxt">${data1.table[i].ver}%</text>`);
                         
                         x = x + (wl+5) // двигаем графики
                         // ловим когда наступает смена вида деффекта
                         if (i > 0 && i < data1.table.length - 1 && data1.table[i].vid != data1.table[i+1].vid) {
                            
                            x = x + ww // делаем промежуток между видами
                            $('.data-vidname').append(`<text style="width:${vidLen} " x="${x}" y="98%">${data1.table[i].vid}</text>`)
                            
                            frstwdth.push(x) // собираем в массив 
                            // vidLen = frstwdth.map ()

                         

                            
                         }                    
                         
                         else {
                             
                             $('.data-vidname').append(`<text slyle="width: ${wl} px" x="${x}" y="98%"></text>`)
                         }
                                                 
                        } 

                       // Последнее название вида
                        // findLastEl();
                        let theLVid = alltheVid[alltheVid.length - 1]
                       $('.data-vidname').append(`<text style="width:auto" x="${x}" y="98%">${theLVid}</text>`)
                       
                       console.log(frstwdth)
                       

                        // Рисуем Легенду 

                        let unLegMk = [...new Set(legMetds)] // получаем массив с уникальными значениями методов

                        // Рисуем саму легенду 
                        unLegMk.forEach((item) => {
                            let colObj = {
                                'Акустико-эмиссионный контроль': '#7FFFD4', 'Вибродиагностика': '#78DBE2', 'Внутренний осмотр': '#FF2400', 'Геодезия': '#9F2B68',
                                'Гидравлические испытания': '#CD9575', 'Исследования механических свойств': '#44944A', 'Метод магнитной памяти': '#A8E4A0',
                                'Ультразвуковая дефектоскопия': '#990066', 'Цветная дефектоскопия': '#003153', 'Вихретоковый контроль': '#3D2B1F', 'Магнитный контроль': '#8CCB5E',
                                'Радиографический контроль': '#FFCF40', 'МИТ': '#2A8D9C', 'Металлографические исследования':'#DD80CC', 'Наружный осмотр': '#009B76', 'Пневмоиспытания': '#B00000',
                                'Стилоскопирование': '#3E5F8A', 'Тепловой контроль': '#FFB02E', 'Ультразвуковая толщинометрия': '#6495ED', 'Ультразвуковое скрининговое сканирование': '#34C924',
                                'Визуально-измерительный контроль': '#A7FC00', 'Магнитопорошковая дефектоскопия': '#0095B6', 'Прочность материалов': '#DCDCDC','Влажность элементов': '#F64A46',
                                'Замеры сопротивления':'#004524', 'Динамическое испытание': '#D1E231', 'Коэрцитиметрия': '#423189'
                            }
                            $('.charts-legend').append(`<div class="legend-one"><div class="legend-color" style="background-color:${colObj[item]}"></div><div class="legend-name">${item}</div></div>`)
                        });
                        
                        // Оставляем в массиве видов уникальные значения

                    //   let uniqueVid = [...new Set(alltheVid)]
                    //   // Перебираем массив и печатаем все виды под каждым дефектом                        
                    //   uniqueVid.forEach((item) => {
                    //       let vidWdth = item.length
                    //          console.log(vidWdth)
                    //       $('.data-vidname').append(`<text style="width: ${vidWdth} px" x="${x}" y="98%">${item}</text>`)

                    //   });




                       
                        
                                                
                        $("#svg").html($("#svg").html());
                        $('#dataAnswerDefTable tbody').html(tableB);
                        $('.visualchart').css('display', 'flex');
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
