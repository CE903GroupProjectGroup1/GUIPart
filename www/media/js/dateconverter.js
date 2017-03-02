// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download.
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.

// three function below http://www.mattkruse.com/javascript/date/
// ===================================================================

/**
 * Created by EE on 28/02/2017.
 */
function _getInt(str,i,minlength,maxlength){for(var x=maxlength;x>=minlength;x--){var token=str.substring(i,i+x);if(token.length < minlength){return null;}if(_isInteger(token)){return token;}}return null;}
function _isInteger(val){var digits="1234567890";for(var i=0;i < val.length;i++){if(digits.indexOf(val.charAt(i))==-1){return false;}}return true;}
function getDateFromFormat(val,format){val=val+"";format=format+"";var i_val=0;var i_format=0;var c="";var token="";var token2="";var x,y;var now=new Date();var year=now.getYear();var month=now.getMonth()+1;var date=1;var hh=now.getHours();var mm=now.getMinutes();var ss=now.getSeconds();var ampm="";while(i_format < format.length){c=format.charAt(i_format);token="";while((format.charAt(i_format)==c) &&(i_format < format.length)){token += format.charAt(i_format++);}if(token=="yyyy" || token=="yy" || token=="y"){if(token=="yyyy"){x=4;y=4;}if(token=="yy"){x=2;y=2;}if(token=="y"){x=2;y=4;}year=_getInt(val,i_val,x,y);if(year==null){return 0;}i_val += year.length;if(year.length==2){if(year > 70){year=1900+(year-0);}else{year=2000+(year-0);}}}else if(token=="MMM"||token=="NNN"){month=0;for(var i=0;i<MONTH_NAMES.length;i++){var month_name=MONTH_NAMES[i];if(val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()){if(token=="MMM"||(token=="NNN"&&i>11)){month=i+1;if(month>12){month -= 12;}i_val += month_name.length;break;}}}if((month < 1)||(month>12)){return 0;}}else if(token=="EE"||token=="E"){for(var i=0;i<DAY_NAMES.length;i++){var day_name=DAY_NAMES[i];if(val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()){i_val += day_name.length;break;}}}else if(token=="MM"||token=="M"){month=_getInt(val,i_val,token.length,2);if(month==null||(month<1)||(month>12)){return 0;}i_val+=month.length;}else if(token=="dd"||token=="d"){date=_getInt(val,i_val,token.length,2);if(date==null||(date<1)||(date>31)){return 0;}i_val+=date.length;}else if(token=="hh"||token=="h"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<1)||(hh>12)){return 0;}i_val+=hh.length;}else if(token=="HH"||token=="H"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<0)||(hh>23)){return 0;}i_val+=hh.length;}else if(token=="KK"||token=="K"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<0)||(hh>11)){return 0;}i_val+=hh.length;}else if(token=="kk"||token=="k"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<1)||(hh>24)){return 0;}i_val+=hh.length;hh--;}else if(token=="mm"||token=="m"){mm=_getInt(val,i_val,token.length,2);if(mm==null||(mm<0)||(mm>59)){return 0;}i_val+=mm.length;}else if(token=="ss"||token=="s"){ss=_getInt(val,i_val,token.length,2);if(ss==null||(ss<0)||(ss>59)){return 0;}i_val+=ss.length;}else if(token=="a"){if(val.substring(i_val,i_val+2).toLowerCase()=="am"){ampm="AM";}else if(val.substring(i_val,i_val+2).toLowerCase()=="pm"){ampm="PM";}else{return 0;}i_val+=2;}else{if(val.substring(i_val,i_val+token.length)!=token){return 0;}else{i_val+=token.length;}}}if(i_val != val.length){return 0;}if(month==2){if( ((year%4==0)&&(year%100 != 0) ) ||(year%400==0) ){if(date > 29){return 0;}}else{if(date > 28){return 0;}}}if((month==4)||(month==6)||(month==9)||(month==11)){if(date > 30){return 0;}}if(hh<12 && ampm=="PM"){hh=hh-0+12;}else if(hh>11 && ampm=="AM"){hh-=12;}var newdate=new Date(year,month-1,date,hh,mm,ss);return newdate.getTime();}



function refreshNodeData() {

    $("#tables").empty();
    //console.log("Called  refreshNodeData");


    function getcolornumber(dateString) {
        //"20:40:45 23/02/2017"

        var mydate = new Date(getDateFromFormat(dateString, "HH:mm:ss d/MM/yyyy"));
        var subsec= Math.floor(Math.abs(new Date() - mydate)/1000);

        if (subsec<0)
            return 0;

        if (subsec<=86400 ) {

            if (subsec < 0)
                return 0;

            else if (subsec <= 30) { //30 sec
                return 100;
            }
            else if (subsec <= 60) { //1min
                return 90;
            }

            else if (subsec <= 120) { // 2 mins
                return 80;
            }

            else if (subsec <= 600) { //10 mins
                return 70;
            }

            else if (subsec <= 1800) { // 30 minutes
                return 60;
            }

            else if (subsec <= 3600) { // 1 hour
                return 50;
            }

            else if (subsec <= 7200) {// 2 hours
                return 40;
            }

            else if (subsec <= 10, 800) {// 3 hours
                return 30;
            }

            else if (subsec <= 21600) { // 6 hours
                return 20;
            }

            else if (subsec <= 43200) { // 12 hours
                return 10;
            }

            else if (subsec <= 86400) { // 24 hours
                return 0;
            }


        }
        else
            return 0;


    }

    $.getJSON('cluster_monitor_data.json?nocache=' + (new Date()).getTime(), function (data) {
        //console.log(data);
        for (var i = 0; i < 3; i++) {
            var tablestart = '<div class=\"col-sm-4">' +
                '<table class="table table-bordered">' +
                '<thead>' +
                '<tr>' +
                '<th class="myheading">Node</th>' +
                '<th class="myheading text-center">Cpu Usage</th>' +
                '<th class="myheading text-center">Memory Usage</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            var rowstring = '';
            var maxnode = 31;
            if (i == 2) maxnode++;
            for (var row = 0; row < maxnode; row++) {

                var freshness = getcolornumber(data[row + (i * 31)].Time);

                rowstring += '<tr>' +
                    '<td class="nodefont ">' + data[row + (i * 31)].Node + '</td>' +
                    '<td class="text-center  bg' + freshness + '">' +
                    '<span class="cpu" data-toggle="tooltip" title="<b>Latest Updated Time</b><br><br>' + data[row + (i * 31)].Time + '" >' + data[row + (i * 31)].CPU + '</span>' +
                    '</td>' +
                    '<td class="text-center bg' + freshness + '">' +
                    '<span class="memory" data-toggle="tooltip" title="<b>Latest Updated Time</b><br><br>' + data[row + (i * 31)].Time + '" >' + data[row + (i * 31)].Memory + '</span>' +
                    '</td>' +
                    '</tr>';
            }


            var tableend = '</tbody>' +
                '</table>' +
                '</div>';

            var tablestart = tablestart + '' + rowstring + '' + tableend;
            $("#tables").append(tablestart);

        }


        $('[data-toggle="tooltip"]').tooltip({html: true});

    });
}
