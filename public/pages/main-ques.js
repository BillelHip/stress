/**
 * Created by lightwaylab on 01/07/2018.
 */
$(function() {

    var Im_new_agent = 0;
    var socket = io();
    jQuery(window).ready(function () {
        //console.log(""+window.location.pathname);
        if(window.location.pathname == "/pages/questionnaire.html") {
            //console.log("enter"+window.location);
            //calculation();
            socket.emit('add user',"");
            $( "#alert_admin_online" ).hide();


            $("#successfully_msg").hide();
            $("#complete_msg").hide();

            //socket.emit("admin_online");

            //update_loc_for_spinners
            Im_new_agent = 1;
            socket.emit('get_locations_name');


            socket.emit("update_value_nodes");

        }
        //console.log("The page para loaded");
    });

    $('#ques_submit').click(function() {

        var loc_id = $('#loc_id').val();

        var typework_id = $('#typework_id').val();

        var ex_q ;
        var er_q ;
        var sc_q ;
        var py_q ;
        var tp_q ;
        var ab_q ;
        var jl_q ;

        var ex_q_1 = $('#ex_q_1').val();
        var ex_q_2 = $('#ex_q_2').val();

        if(ex_q_1 != 'None' && ex_q_2 != 'None'){

            ex = (1 - 0.7) * parseFloat(give_me_float_from_string(ex_q_1)) + 0.7 * parseFloat(give_me_float_from_string(ex_q_2));
            Ex_float = (1 - 0.7) * parseFloat(give_me_float_from_string(ex_q_1)) + 0.7 * parseFloat(give_me_float_from_string(ex_q_2));

            ex_q = 'PASS';

        }else{
            ex_q = 'None';
        }

        var er_q_1 = $('#er_q_1').val();
        var er_q_2 = $('#er_q_2').val();
        var er_q_3 = $('#er_q_3').val();

        if(er_q_1 != 'None' && er_q_2 != 'None' && er_q_3 != 'None'){

            //Float.toString((float) (0.33 * Float.parseFloat(er_1) + 0.33 * Float.parseFloat(er_2) + 0.33 * Float.parseFloat(er_3)));

            er = 0.33 * parseFloat(give_me_float_from_string(er_q_1)) + 0.33 * parseFloat(give_me_float_from_string(er_q_2)) + 0.33 * parseFloat(give_me_float_from_string(er_q_3));
            Er_float = 0.33 * parseFloat(give_me_float_from_string(er_q_1)) + 0.33 * parseFloat(give_me_float_from_string(er_q_2)) + 0.33 * parseFloat(give_me_float_from_string(er_q_3));

            er_q = 'PASS';

        }else{
            er_q = 'None';
        }

        var sc_q_1 = $('#sc_q_1').val();
        var sc_q_2 = $('#sc_q_2').val();

        if(sc_q_1 != 'None' && sc_q_2 != 'None'){

            sc = (1 - 0.7) * parseFloat(give_me_float_from_string(sc_q_1)) + 0.7 * parseFloat(give_me_float_from_string(sc_q_2));
            Sc_float = (1 - 0.7) * parseFloat(give_me_float_from_string(sc_q_1)) + 0.7 * parseFloat(give_me_float_from_string(sc_q_2));

            sc_q = 'PASS';

        }else{
            sc_q = 'None';
        }

        var py_q_1 = $('#py_q_1').val();
        var py_q_2 = $('#py_q_2').val();
        var py_q_3 = $('#py_q_3').val();
        var py_q_4 = $('#py_q_4').val();
        var py_q_5 = $('#py_q_5').val();
        var py_q_6 = $('#py_q_6').val();
        var py_q_7 = $('#py_q_7').val();
        var py_q_8 = $('#py_q_8').val();
        var py_q_9 = $('#py_q_9').val();
        var py_q_10 = $('#py_q_10').val();

        if(py_q_1 != 'None' && py_q_2 != 'None' && py_q_3 != 'None' && py_q_4 != 'None' && py_q_5 != 'None' && py_q_6 != 'None' && py_q_7 != 'None' && py_q_8 != 'None' && py_q_9 != 'None' && py_q_10 != 'None'){


            Py_float = (

                0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string(py_q_1)) + 0.7 * parseFloat(give_me_float_from_string_neg(py_q_6))) +
                0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string_neg(py_q_2)) + 0.7 * parseFloat(give_me_float_from_string(py_q_7))) +
                0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string(py_q_3)) + 0.7 * parseFloat(give_me_float_from_string_neg(py_q_8))) +
                0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string(py_q_5)) + 0.7 * parseFloat(give_me_float_from_string_neg(py_q_10)))

            ) * ( 1 - ((1 - 0.7) * parseFloat(give_me_float_from_string_neg(py_q_4)) + 0.7 * parseFloat(give_me_float_from_string(py_q_9))));

            py = (

                    0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string(py_q_1)) + 0.7 * parseFloat(give_me_float_from_string_neg(py_q_6))) +
                    0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string_neg(py_q_2)) + 0.7 * parseFloat(give_me_float_from_string(py_q_7))) +
                    0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string(py_q_3)) + 0.7 * parseFloat(give_me_float_from_string_neg(py_q_8))) +
                    0.25 * ((1 - 0.7) * parseFloat(give_me_float_from_string(py_q_5)) + 0.7 * parseFloat(give_me_float_from_string_neg(py_q_10)))

                ) * ( 1 - ((1 - 0.7) * parseFloat(give_me_float_from_string_neg(py_q_4)) + 0.7 * parseFloat(give_me_float_from_string(py_q_9))));

            py_q = 'PASS';

        }else{
            py_q = 'None';
        }

        var tp_q_1 = $('#tp_q_1').val();
        var tp_q_2 = $('#tp_q_2').val();
        var tp_q_3 = $('#tp_q_3').val();

        if(tp_q_1 != 'None' && tp_q_2 != 'None' && tp_q_3 != 'None'){

            tp = 0.33 * parseFloat(give_me_float_from_string_neg(tp_q_1)) + 0.33 * parseFloat(give_me_float_from_string_neg(tp_q_2)) + 0.33 * parseFloat(give_me_float_from_string(tp_q_3));
            Tp_float = 0.33 * parseFloat(give_me_float_from_string_neg(tp_q_1)) + 0.33 * parseFloat(give_me_float_from_string_neg(tp_q_2)) + 0.33 * parseFloat(give_me_float_from_string(tp_q_3));

            tp_q = 'PASS';

        }else{
            tp_q = 'None';
        }

        var ab_q_1 = $('#ab_q_1').val();
        var ab_q_2 = $('#ab_q_2').val();

        if(ab_q_1 != 'None' && ab_q_2 != 'None'){

            //Ab_float = Float.toString((float) ((1 - 0.7) * Float.parseFloat(ab_1) + 0.7 * Float.parseFloat(ab_2)));

            ab = (1 - 0.7) * parseFloat(give_me_float_from_string(ab_q_1)) + 0.7 * parseFloat(give_me_float_from_string(ab_q_2));
            Ab_float = (1 - 0.7) * parseFloat(give_me_float_from_string(ab_q_1)) + 0.7 * parseFloat(give_me_float_from_string(ab_q_2));

            ab_q = 'PASS';

        }else{
            ab_q = 'None';
        }

        var jl_q_1 = $('#jl_q_1').val();
        var jl_q_2 = $('#jl_q_2').val();

        if(jl_q_1 != 'None' && jl_q_2 != 'None'){

            jl = (1 - 0.7) * parseFloat(give_me_float_from_string_neg(jl_q_1)) + 0.7 * parseFloat(give_me_float_from_string_neg(jl_q_2));
            Jl_float = (1 - 0.7) * parseFloat(give_me_float_from_string_neg(jl_q_1)) + 0.7 * parseFloat(give_me_float_from_string_neg(jl_q_2));

            jl_q = 'PASS';

        }else{
            jl_q = 'None';
        }


        if(loc_id != 'None' && typework_id != 'None' && ex_q == 'PASS' && er_q == 'PASS' && sc_q == 'PASS' && py_q == 'PASS' && tp_q == 'PASS' && ab_q == 'PASS' && jl_q == 'PASS'){
            socket.emit("Loc_node" , loc_id);

            if(typework_id == 'Academician'){
                type_worker = 1;
            }else if(typework_id == 'Administration'){
                type_worker = 2;
            }else if(typework_id == 'Graduate Student Master/PhD'){
                type_worker = 3;
            }else if(typework_id == 'Intern'){
                type_worker = 4;
            }else if(typework_id == 'Research Assistant<'){
                type_worker = 5;
            }

            //Ex_float,Er_float,Sc_float,Py_float,Tp_float,Ab_float,Jl_float;
            calculation();
        }else{
            if(typework_id == 'None'){
                //Please select your position at work.
                $('[id$=typework_msg]').text("Please select your position at work.");
            }
            if(loc_id == 'None'){
                $('[id$=loc_msg]').text("Please select your location.");
            }
            if(ex_q == 'None'){
                $('[id$=ex_msg]').text("Please select.");
            }
            if(er_q == 'None'){
                $('[id$=er_msg]').text("Please select.");
            }
            if(sc_q == 'None'){
                $('[id$=sc_msg]').text("Please select.");
            }
            if(py_q == 'None'){
                $('[id$=py_msg]').text("Please select.");
            }
            if(tp_q == 'None'){
                $('[id$=tp_msg]').text("Please select.");
            }
            if(ab_q == 'None'){
                $('[id$=ab_msg]').text("Please select.");
            }
            if(jl_q == 'None'){
                $('[id$=jl_msg]').text("Please select.");
            }

            $("#successfully_msg").hide();
            $("#complete_msg").show();
        }

    });

    function give_me_float_from_string(string_data) {
        /*
         <option>None</option>
         <option>Strongly Disagree</option>
         <option>Disagree</option>
         <option>Neutral</option>
         <option>Agree</option>
         <option>Strongly Agree</option>
         */
        var float_number;
        switch(string_data){
            case 'Strongly Disagree':
                float_number = 0.1;
                break;
            case 'Disagree':
                float_number = 0.3;
                break;
            case 'Neutral':
                float_number = 0.5;
                break;
            case 'Agree':
                float_number = 0.7;
                break;
            case 'Strongly Agree':
                float_number = 0.9;
                break;
        }
        return float_number;
    }
    function give_me_float_from_string_neg(string_data) {
        /*
         <option>None</option>
         <option>Strongly Disagree</option>
         <option>Disagree</option>
         <option>Neutral</option>
         <option>Agree</option>
         <option>Strongly Agree</option>
         */
        var float_number;
        switch(string_data){
            case 'Strongly Disagree':
                float_number = 0.9;
                break;
            case 'Disagree':
                float_number = 0.7;
                break;
            case 'Neutral':
                float_number = 0.5;
                break;
            case 'Agree':
                float_number = 0.3;
                break;
            case 'Strongly Agree':
                float_number = 0.1;
                break;
        }
        return float_number;
    }

    function calculation(){
        // call first function and pass in a callback function which
        // first function runs when it has completed
        cala(function() {
            //console.log(':D, I\'m done!');
            if((newLa != -1) && (newLp != -1) && (newLv != -1) && (newLs != -1)){
                //console.log('Longterm_node, I\'m done!' + newLa +','+ newLp +','+ newLv +','+ newLs);
                socket.emit("Longterm_node" ,newLa,newLp,newLv,newLs,Ex_float,Er_float,Sc_float,Py_float,Tp_float,Ab_float,Jl_float, type_worker);
                //window.location.replace("index.html");

                    $('[id$=loc_msg]').text("");

                    $('[id$=typework_msg]').text("");

                    $('[id$=ex_msg]').text("");

                    $('[id$=er_msg]').text("");

                    $('[id$=sc_msg]').text("");

                    $('[id$=py_msg]').text("");

                    $('[id$=tp_msg]').text("");

                    $('[id$=ab_msg]').text("");

                    $('[id$=jl_msg]').text("");


                $("#successfully_msg").show();
                $("#complete_msg").hide();

                document.getElementById("loc_id").selectedIndex = "0";
                document.getElementById("typework_id").selectedIndex = "0";

                //ex_q_1 2
                document.getElementById("ex_q_1").selectedIndex = "0";
                document.getElementById("ex_q_2").selectedIndex = "0";

                //er_q_1 3
                document.getElementById("er_q_1").selectedIndex = "0";
                document.getElementById("er_q_2").selectedIndex = "0";
                document.getElementById("er_q_3").selectedIndex = "0";

                //sc_q_1 2
                document.getElementById("sc_q_1").selectedIndex = "0";
                document.getElementById("sc_q_2").selectedIndex = "0";

                //py_q_1 10
                document.getElementById("py_q_1").selectedIndex = "0";
                document.getElementById("py_q_2").selectedIndex = "0";
                document.getElementById("py_q_3").selectedIndex = "0";
                document.getElementById("py_q_4").selectedIndex = "0";
                document.getElementById("py_q_5").selectedIndex = "0";
                document.getElementById("py_q_6").selectedIndex = "0";
                document.getElementById("py_q_7").selectedIndex = "0";
                document.getElementById("py_q_8").selectedIndex = "0";
                document.getElementById("py_q_9").selectedIndex = "0";
                document.getElementById("py_q_10").selectedIndex = "0";

                //tp_q_1 3
                document.getElementById("tp_q_1").selectedIndex = "0";
                document.getElementById("tp_q_2").selectedIndex = "0";
                document.getElementById("tp_q_3").selectedIndex = "0";

                //ab_q_1 2
                document.getElementById("ab_q_1").selectedIndex = "0";
                document.getElementById("ab_q_2").selectedIndex = "0";

                //ab_q_1 2
                document.getElementById("jl_q_1").selectedIndex = "0";
                document.getElementById("jl_q_2").selectedIndex = "0";
            }
        });
    }
    var ex = 0.1,er = 0.1,sc = 0.1,py = 0.1,tp = 0.9,ab = 0.1,jl = 0.9;
    var newLa = -1,newLp = -1,newLv = -1,newLs= -1;
    var type_worker = 0;
    // For analysis part
    var Ex_float,Er_float,Sc_float,Py_float,Tp_float,Ab_float,Jl_float;

    function cala(_callback) {

        time = 1000;

        var Ex = new Array();
        var Er = new Array();
        var Sc = new Array();
        var Py = new Array();
        var Tp =new Array();
        var Abnorm =new Array();
        var Jlbasic =new Array();

        var Ab = new Array();
        var Tc = new Array();
        var Pr = new Array();
        var Sr = new Array();
        var Jc = new Array();
        var Jd = new Array();
        var Jl = new Array();
        var Sv = new Array();
        var Pj = new Array();
        var Aj = new Array();
        var Js = new Array();
        var Ss = new Array();

        var La = new Array();
        var Lp = new Array();
        var Lv = new Array();
        var Ls = new Array();

        for (t = 0 ; t < time ; t++) {
            Ex[t] = ex;
            Er[t] = er;
            Sc[t] = sc;
            Py[t] = py;
            Tp[t] = tp;
            Abnorm[t] = ab;
            Jlbasic[t] = jl;
        }

        var delT;
        var nLs =  0.3;
        var nLa =  0.3;
        var nLv =  0.3;
        var nLp =  0.3;
        if((Cu_nLa > 0 && Cu_nLa < 1) && (Cu_nLp > 0 && Cu_nLp < 1) && (Cu_nLv > 0 && Cu_nLv < 1) && (Cu_nLs > 0 && Cu_nLs < 1) && (CuDalt > 0 && CuDalt < 1)){
            nLa =  Cu_nLa;
            nLp =  Cu_nLp;
            nLv =  Cu_nLv;
            nLs =  Cu_nLs;
            delT = CuDalt;
            console.log(' joined --- Yes they take value'+Cu_nLa+','+Cu_nLp+','+Cu_nLv+','+Cu_nLs+','+CuDalt);
        }else{
            nLs =  0.3;
            nLa =  0.3;
            nLv =  0.3;
            nLp =  0.3;
            delT =  0.5;
        }

        //  For this case

        var aAb =  0.7;

        var aTc =  0.7;

        var bPr =  0.7;

        var aJl =  0.7;

        var yJc =  0.7;

        var uJd =  0.7;

        var uPj =  0.7;

        var bAj =  0.7;

        var yJs =  0.7;

        var ySs =  0.7;

        var wSr1 =  0.33;
        var wSr2 =  0.33;
        var wSr3 =  0.33;

        var wJs1 =  0.33;
        var wJs2 =  0.33;
        var wJs3 =  0.33;


        La[1] =  0.1;
        Lp[1] =  0.1;
        Lv[1] =  0.1;
        Ls[1] =  0.1;

        //

        Ab[1] = aAb * Abnorm[1] + (1-aAb) * (La[1] * (1-Lp[1])) * Abnorm[1];
        Tc[1] = aTc * Ab[1] + (1-aTc) * Ex[1];
        Sr[1] = wSr1 * Py[1] + wSr2 * Er[1] + wSr3 * Sc[1];

        Pr[1] = bPr * Sr[1] + (1-bPr) * Tc[1];

        Jl[1] = aJl * Jlbasic[1] + (1-aJl) * Lv[1];

        Jc[1] = (yJc * Ex[1] + (1-yJc) * Py[1]) * (1-Ls[1]);
        Jd[1] = (uJd * Jl[1] + (1-uJd) * Tp[1]) * (1-Jc[1]);


        Sv[1] = Tp[1] * (1-Jc[1]);


        Pj[1] = Pr[1] * (1-(uPj * Jc[1] + (1-uPj) * Jd[1]));
        Aj[1] = (bAj* Pr[1]+(1-bAj)*Jc[1])*(1-Jd[1]);

        Js[1] = (yJs * Jd[1] + (1-yJs) * Ls[1]) * (1-((wJs1 * Pr[1] + wJs2 * Er[1] + wJs3 * Jc[1]) * (1-Ls[1])));

        Ss[1] = ySs * Js[1] + (1-ySs) * Sv[1];

        //publishProgress(1);

        for(t = 2; t < time ; t++){

            Ab[t] = aAb * Abnorm[t-1] + (1-aAb) * (La[t-1] * (1-Lp[t-1])) * Abnorm[t-1];
            Tc[t] = aTc * Ab[t] + (1-aTc) * Ex[t];
            Sr[t] = wSr1 * Py[t] + wSr2 * Er[t] + wSr3 * Sc[t];

            Pr[t] = bPr * Sr[t] + (1-bPr) * Tc[t];

            Jl[t] = aJl * Jlbasic[t-1] + (1-aJl) * Lv[t-1];

            Jc[t] = (yJc * Ex[t] + (1-yJc) * Py[t]) * (1-Ls[t-1]);
            Jd[t] = (uJd * Jl[t] + (1-uJd) * Tp[t]) * (1-Jc[t]);

            Sv[t] = Tp[t] * (1-Jc[t]);

            Pj[t] = Pr[t] * (1-(uPj * Jc[t] + (1-uPj) * Jd[t]));
            Aj[t] = (bAj* Pr[t]+(1-bAj)*Jc[t])*(1-Jd[t]);

            Js[t] = (yJs * Jd[t] + (1-yJs) * Ls[t-1]) * (1- (( wJs1 * Pr[t] + wJs2 * Er[t] + wJs3 * Jc[t]) * (1-Ls[t-1]) ));

            Ss[t] = ySs * Js[t] + (1-ySs) * Sv[t];

            //Log.e("Ls", La[t-1]+" ,"+Aj[t]+ " ,");


            La[t] = La[t-1] + nLa * (Aj[t]-La[t-1]) * (1-La[t-1]) * La[t-1] * delT;
            Lp[t] = Lp[t-1] + nLp * (Pj[t]-Lp[t-1]) * (1-Lp[t-1]) * Lp[t-1] * delT;
            Lv[t] = Lv[t-1] + nLv * (Sv[t]-Lv[t-1]) * (1-Lv[t-1]) * Lv[t-1] * delT;
            Ls[t] = Ls[t-1] + nLs * (Ss[t]-Ls[t-1]) * (1-Ls[t-1]) * Ls[t-1] * delT;

            //Log.e("Ls", t+ "");

            //publishProgress(t);
        }
        newLa = La[time - 1];
        newLp = Lp[time - 1];
        newLv = Lv[time - 1];
        newLs = Ls[time - 1];

        _callback();
    }

    var CuDalt,Cu_nLa,Cu_nLp,Cu_nLv,Cu_nLs;
    socket.on('Loud_Para', function (dat,nLa,nLp,nLv,nLs){
        CuDalt = dat;
        Cu_nLa = nLa;
        Cu_nLp = nLp;
        Cu_nLv = nLv;
        Cu_nLs = nLs;
    });


    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
        //log(data.username + ' joined');
        //addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
        //log(data.username + ' left');
        //ddParticipantsMessage(data);
        //removeChatTyping(data);
    });

    socket.on('disconnect', function () {
        console.log('you have been disconnected');
    });

    socket.on('reconnect', function () {
        //log('you have been reconnected');
        if (username) {
            socket.emit('add user', "");
        }
    });

    socket.on('reconnect_error', function () {
        //log('attempt to reconnect has failed');
    });


    socket.on('admin_online', function (data) {
        if(data.isAdminOnline == 1){

            $( "#alert_admin_online" ).show();
            $( "#ques_submit" ).hide();

        }else if(data.isAdminOnline == 0){

            $( "#alert_admin_online" ).hide();
            $( "#ques_submit" ).show();

        }
        console.log('admin_online'+data.isAdminOnline);
    });


    socket.on('update_loc_for_spinners', function (data) {


        //console.log(data+"");

        var loc_i = 0;
        var main_obj_all = data;

        /*
        if(loc_i == 0){
            var x = document.getElementById("loc_id");
            if(Im_new_agent == 0){
                if (x.length > 0) {
                    x.remove(x.length-1);
                }
            }


            var option = document.createElement("option");
            option.text = "None";
            x.add(option);
        }
        */
        var x = document.getElementById("loc_id");
        if (x.length > 0) {
            for(var i = 0 ; x.length > 0 ; i++){
                if(Im_new_agent == 0){
                    x.remove(x.length - 1);
                }
            }
        }
        var option = document.createElement("option");
        option.text = "None";
        x.add(option);

        //var obj_Names = [];
        for (var main_key in main_obj_all) {
            if (main_obj_all.hasOwnProperty(main_key)) {
                var obj_all_ = main_obj_all[main_key];
                //console.log(" -> " + obj_all_);

                for (var key_ in obj_all_) {
                    if (obj_all_.hasOwnProperty(key_)) {

                        //console.log(loc_i+" -> " + obj_Names);

                        //console.log(key_+" -> " + obj_all_[key_][loc_i]);


                        var xX = document.getElementById("loc_id");
                        //if (Im_new_agent == 0) {
                        //    if (xX.length > 0) {
                        //        xX.remove(xX.length - 1);
                        //    }
                        //}

                        var option = document.createElement("option");
                        option.text = obj_all_[key_][loc_i] + "";
                        xX.add(option);

                        //var oName = {};
                        //oName[loc_i] = key_;
                        //obj_Names.push(oName);
                        //console.log(key_+" -> " + obj_Names[loc_i][loc_i]);//obj_Names[loc_i][loc_i]

                    }
                    loc_i++;
                }
            }
        }
        if(Im_new_agent == 1){
            Im_new_agent = 0;
        }


    });


});