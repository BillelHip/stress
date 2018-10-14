/**
 * Created by lightwaylab on 19/06/2018.
 */
$(function() {

    var socket = io();

    $('.btn.btn-lg.btn-success.btn-block').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
        var remember = document.getElementById("remember");// 'on' (checked) or undefined (off)
        //console.log('TEST' + username + ":" + remember.checked);
        if (username != '' && password != '') {
            if (username == 'admin' && password == 'admin') {
                if (remember.checked) {
                    //add user
                    socket.emit('add user','admin');
                    window.location.replace("para_loc.html");
                    //console.log('Nice !!!');
                } else {
                    socket.emit('add user','admin');
                    window.location.replace("para_loc.html");
                    //console.log('Nice !!!');
                }
            }else{
                //console.log('Try again!!!');
            }
        }

    });

    jQuery(window).ready(function () {
        //console.log(""+window.location.pathname);
        if(window.location.pathname == "/pages/para_loc.html") {
            //console.log("enter"+window.location);
            //socket.emit('admin_online');
            socket.emit('Temporals_Para', "" + 2, "" + 2, "" + 2, "" + 2, "" + 2);
        }
        //console.log("The page para loaded");
    });


    window.onbeforeunload = function (event) {
        var message = 'Important: Please click on \'Save\' button to leave this page.';
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {
            event.returnValue = message;
        }
        return message;
    };

    $(window).bind('beforeunload', function () {
        console.log('Try again!!!');
        return '';
    });

    $(window).bind('unload', function () {
        //logout();
        //socket.emit('admin_leaving', 'yes');
        if(window.location.pathname == "/pages/para_loc.html") {
            socket.emit('admin_leaving', 'yes');
        }
    });

    socket.on('admin_online_tester', function (data){
        console.log("The page para loaded and admin is " +data);
        if(data == 1){
            socket.emit('Temporals_Para', "" + 2, "" + 2, "" + 2, "" + 2, "" + 2);
            console.log("Welcome Admin =) ");
        }else if(data == 0){
            window.location.replace("login.html");
        }
        // console.log("Temporals_Para: "+ dat+nLa+nLp+nLv+nLs);//('socket on'+data);
    });
    // ======= loc

    $('#loc_submit').click(function () {
        var new_loc = $('#new_loc').val();
        socket.emit('add_new_location', new_loc);
    });

    // ======= Para
    $('#para_submit').click(function() {
        //console.log("Temporals_Para: btn");
        //$('#dat_para').set(2);
        var dat_para = $('#dat_para').val();
        var nLa_para = $('#nLa_para').val();
        var nLp_para = $('#nLp_para').val();
        var nLs_para = $('#nLs_para').val();
        var nLv_para = $('#nLv_para').val();

        socket.emit('Temporals_Para',dat_para,nLa_para,nLp_para,nLv_para,nLs_para);

    });

    socket.on('Temporals_Para', function (dat,nLa,nLp,nLv,nLs){
       // console.log("Temporals_Para: "+ dat+nLa+nLp+nLv+nLs);//('socket on'+data);
    });

    socket.on('Loud_Para', function (dat,nLa,nLp,nLv,nLs){ //
        // console.log("Temporals_Para: "+ dat+nLa+nLp+nLv+nLs);//('socket on'+data);
        //console.log(' joined --- '+dat);
        $('[id$=dat_currently]').text(""+dat);
        $('[id$=nLa_currently]').text(""+nLa);
        $('[id$=nLp_currently]').text(""+nLp);
        $('[id$=nLs_currently]').text(""+nLs);
        $('[id$=nLv_currently]').text(""+nLv);
    });
/*
    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('admin joined', function (data) {
        //console.log(' joined --- ');
        //addParticipantsMessage(data);
    });

    socket.on('admin_online', function (data) {
        console.log(' joined --- '+data);
        //addParticipantsMessage(data);
    });
*/
});