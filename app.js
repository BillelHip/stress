/*var express = require('express');
 var path = require('path');
 var favicon = require('static-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');

 var routes = require('./routes/index');
 var users = require('./routes/users');

 var app = express();

 // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');

 app.use(favicon());
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded());
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', routes);
 app.use('/users', users);

 /// catch 404 and forwarding to error handler
 app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });

 /// error handlers

 // development error handler
 // will print stacktrace
 if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: err
 });
 });
 }

 // production error handler
 // no stacktraces leaked to user
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: {}
 });
 });


 module.exports = app;*/
// Setup basic express server
var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var port = process.env.PORT || 3001;
var path = require('path');

var data_temp = JSON.parse(fs.readFileSync('temp_file.json'));
//console.log(path.join(__dirname, '/public/pages/temp_file.json'));
fs.createReadStream('temp_file.json').pipe(fs.createWriteStream(path.join(__dirname, '/public/pages/temp_file.json')));

// ==================== Get Avg
var avg_la = [],avg_lp = [],avg_lv = [],avg_ls = [];
var loc_i = 0;
var obj_all = data_temp;

var main_obj_all = obj_all;
for (var main_key in main_obj_all) {
    if (main_obj_all.hasOwnProperty(main_key)) {
        obj_all_ = main_obj_all[main_key];
        //console.log(" -> " + obj_all_);
        //var loc_i = 0;
        for (var key_ in obj_all_) {
            if (obj_all_.hasOwnProperty(key_)) {
                //console.log(key_ + " length -> " + obj_all_[key_].length);
                length_array = obj_all_[key_].length;
                if(length_array > 0){
                    // AVG La============================================
                    var sum = 0;
                    //console.log(key_ + " -> " + obj_all_[key_][loc_i].La);
                    for (var i = 0; i < length_array; i++) {
                        sum += obj_all_[key_][i].La; //don't forget to add the base
                    }
                    var avg = sum / length_array;
                    avg_la[loc_i] = avg;
                    //console.log('loc'+loc_i+'La avg: '+avg);

                    // AVG Lp=============================================
                    sum = 0;
                    for (var i = 0; i < length_array; i++) {
                        sum += obj_all_[key_][i].Lp; //don't forget to add the base
                    }
                    avg = sum / length_array;
                    avg_lp[loc_i] = avg;
                    //console.log('loc'+loc_i+'Lp avg: '+avg);

                    // AVG Lv==============================================
                    sum = 0;
                    for (var i = 0; i < length_array; i++) {
                        sum += obj_all_[key_][i].Lv; //don't forget to add the base
                    }
                    avg = sum / length_array;
                    avg_lv[loc_i] = avg;
                    //console.log('loc'+loc_i+'Lv avg: '+avg);

                    // AVG Ls=============================================
                    sum = 0;
                    for (var i = 0; i < length_array; i++) {
                        sum += obj_all_[key_][i].Ls; //don't forget to add the base
                    }
                    avg = sum / length_array;
                    avg_ls[loc_i] = avg;
                    //console.log('loc'+loc_i+'Ls avg: '+avg);
                }else if(length_array == 0){
                    avg_la[loc_i] = 0.1;
                    avg_lp[loc_i] = 0.1;
                    avg_lv[loc_i] = 0.1;
                    avg_ls[loc_i] = 0.1;
                }
            }
            loc_i++;
        }
    }
}
/*
for (var key in obj_all) {
    if (obj_all.hasOwnProperty(key)) {
        //console.log(key + " -> " + obj_all[key]);
        // AVG La============================================
        var sum = 0;
        for (var i = 0; i < obj_all[key].length; i++) {
            sum += obj_all[key][i].La; //don't forget to add the base
        }
        var avg = sum / obj_all[key].length;
        avg_la[loc_i] = avg;
        //console.log('loc'+key+'La avg: '+avg);

        // AVG Lp=============================================
        sum = 0;
        for (var i = 0; i < obj_all[key].length; i++) {
            sum += obj_all[key][i].Lp; //don't forget to add the base
        }
        avg = sum / obj_all[key].length;
        avg_lp[loc_i] = avg;
        //console.log('loc'+key+'Lp avg: '+avg);;

        // AVG Lv==============================================
        sum = 0;
        for (var i = 0; i < obj_all[key].length; i++) {
            sum += obj_all[key][i].Lv; //don't forget to add the base
        }
        avg = sum / obj_all[key].length;
        avg_lv[loc_i] = avg;
        //console.log('loc'+key+'Lv avg: '+avg);

        // AVG Ls=============================================
        sum = 0;
        for (var i = 0; i < obj_all[key].length; i++) {
            sum += obj_all[key][i].Ls; //don't forget to add the base
        }
        avg = sum / obj_all[key].length;
        avg_ls[loc_i] = avg;
        //console.log('loc'+key+'Ls avg: '+avg);

        //=====================================================
        loc_i++;
    }
}*/
var loc_max = [];
var key_i = 0;//console.log(obj_all);
for (var key in obj_all) {
    if (obj_all.hasOwnProperty(key)) {
        loc_max[key_i] = [avg_la[key_i],avg_lp[key_i],avg_lv[key_i],avg_ls[key_i]];

        //console.log(key_i+":"+loc_max[key_i]);
        if(isNaN(loc_max[key_i][0])){
            //console.log("yes null");
        }
        key_i ++ ;
    }
}
key_i = 0;
var loc1_max = [avg_la[0],avg_lp[0],avg_lv[0],avg_ls[0]];
var loc2_max = [avg_la[1],avg_lp[1],avg_lv[1],avg_ls[1]];
var loc3_max = [avg_la[2],avg_lp[2],avg_lv[2],avg_ls[2]];
var loc4_max = [avg_la[3],avg_lp[3],avg_lv[3],avg_ls[3]];

// ====================================================================================  Get Para
var data_para = JSON.parse(fs.readFileSync('para.json'));
//console.log('Para'+data_para.nLa);

// ====================================================================================

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
//console.log('loc1 : ' +indexOfMax(loc1_max));
//console.log('loc2 : ' +indexOfMax(loc2_max));
//console.log('loc3 : ' +indexOfMax(loc3_max));
//console.log('loc4 : ' +indexOfMax(loc4_max));

// ========================

//console.log(data_temp);

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});


// Test 001 =============================================================================

var exec = require('child_process').exec;

// Test 001 =============================================================================

// Routing
app.use(express.static(__dirname + '/public'));

var numUsers = 0;

var numHappy = 0;
var numSad = 0;
var isAdminOnline = 0;
var isAdminFirstLogin = 0;
var isAdmin_leaving = 0;
io.on('connection', function (socket) {
    var addedUser = false;
    //socket.broadcast.emit('Temporals_node');

    socket.on('add user', function (username) {
        //username
        //console.log("admin like boss :B "+username);
       /* if(username == 'admin'){
            console.log("admin like boss :B STOP EVERYTHING until THE boss done !! ");
            isAdminOnline = 1;
            socket.broadcast.emit('admin joined', {
                username: socket.username
            });

        }else{*/
            if (addedUser) return;

            // we store the username in the socket session for this client

            ++numUsers;
            socket.username = numUsers;
            addedUser = true;
            //console.log(numUsers +" :(");
            socket.emit('login', {
                numUsers: numUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username
            });

        //}
    });

    socket.on('admin_online', function () {
        socket.isAdminOnline = isAdminOnline;
        socket.broadcast.emit('admin_online', {
            isAdminOnline: socket.isAdminOnline
        });
        socket.emit('admin_online_tester',socket.isAdminOnline);
        //console.log(' joined admin online --- ');
    });

    socket.on('Loud_Para', function () {
        //console.log(' joined --- ');
    });

    socket.on('web_user', function () {
        //console.log('WEB');
    });

    //isAdmin_leaving

    socket.on('admin_leaving', function (data) {
        //console.log(' admin_leaving --- ' + data);
        isAdmin_leaving = 1;
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        //console.log(isAdminOnline + ".... ??? who loops!! disconnect " + isAdminFirstLogin);
        //if (isAdminOnline == 0) {
         //   if (isAdmin_leaving == 0) {
               // console.log("user is disconnect");
               if (addedUser) {
                    --numUsers;
                    socket.username = numUsers;
                    // echo globally that this client has left
                    socket.broadcast.emit('user left', {
                        username: socket.username,
                        numUsers: numUsers
                    });
                    //console.log(numUsers);
                }
            //}
        /*} else if (isAdmin_leaving == 1) {
                isAdminOnline = 0;
                isAdminFirstLogin = 0;
                isAdmin_leaving = 0;
                socket.isAdminOnline = isAdminOnline;
                socket.broadcast.emit('admin_online', {
                    isAdminOnline: socket.isAdminOnline
                });
                console.log(isAdminOnline + " IF ??? who loops!! disconnect " + isAdminFirstLogin);
                console.log("admin is disconnect");
        } *//*else {
            if(isAdminOnline == 1 && isAdminFirstLogin == 0){
                isAdminFirstLogin = 1;
            }else if(isAdminOnline == 1 && isAdminFirstLogin == 1){
                console.log("user is disconnect");
                if (addedUser) {
                    --numUsers;
                    socket.username = numUsers;
                    // echo globally that this client has left
                    socket.broadcast.emit('user left', {
                        username: socket.username,
                        numUsers: numUsers
                    });
                    //console.log(numUsers);
                }
                console.log(isAdminOnline + " ELSE ??? who loops!! disconnect " + isAdminFirstLogin);
            }
        }*/


    });

    // ========================================================== Location

    socket.on('Loc_node', function (loc_string) {

        socket.Loc_node = loc_string;
        //console.log(socket.Loc_node+":"+socket.username);
        socket.broadcast.emit('Loc_node', {
            Loc_node: socket.Loc_node,
            username: socket.username
        });

    });

    // ========================================================== Temporal Variables
    socket.on('update_value_nodes', function () {
        //console.log("Para Socket === :) ;
        socket.emit('Loud_Para', data_para.dat, data_para.nLa, data_para.nLp, data_para.nLv, data_para.nLs);

    });

    socket.on('Temporals_Para', function (dat,nLa,nLp,nLv,nLs) {

        if(dat == 2 && nLa == 2 && nLp == 2 && nLv == 2 && nLs == 2){

            //data_para
            socket.emit('Loud_Para', data_para.dat, data_para.nLa, data_para.nLp, data_para.nLv, data_para.nLs);

        }else {
            socket.dat_ = dat;
            socket.nLa_ = nLa;
            socket.nLp_ = nLp;
            socket.nLv_ = nLv;
            socket.nLs_ = nLs;
            //console.log("Para Socket === :) "+dat+nLa+nLp+nLv+nLs);
            /*
             {
             "dat":0.5,
             "nLa":0.3,
             "nLp":0.3,
             "nLv":0.3,
             "nLs":0.3
             }
             */
            var newdata_para = ({
                dat: socket.dat_,
                nLa: socket.nLa_,
                nLp: socket.nLp_,
                nLv: socket.nLv_,
                nLs: socket.nLs_
            });
            //console.log("Para Socket === :) "+newdata_para);
            var data = JSON.stringify(newdata_para, null, 2);
            fs.writeFile('para.json', data, function (err) {
                if (err) {
                    return console.log(err);
                }
                data_para = JSON.parse(fs.readFileSync('para.json'));
                //console.log("The file was saved!");
                socket.emit('Loud_Para', dat, nLa, nLp, nLv, nLs);
            });
            socket.broadcast.emit('Temporals_Para', {
                dat_: socket.dat_,
                nLa_: socket.nLa_,
                nLp_: socket.nLp_,
                nLv_: socket.nLv_,
                nLs_: socket.nLs_
            });
        }
    });


    socket.on('Temporals_node', function () {
        socket.avgLa_ = avg_la;
        socket.avgLp_ = avg_lp;
        socket.avgLv_ = avg_lv;
        socket.avgLs_ = avg_ls;
        //console.log(socket.avgLa_+":"+socket.avgLv_);
        socket.broadcast.emit('Temporals_node', {
            avgLa_: socket.avgLa_,
            avgLp_: socket.avgLp_,
            avgLv_: socket.avgLv_,
            avgLs_: socket.avgLs_
        });
    });

    /*
     socket.la_state_ = la_st;
     socket.lp_state_ = lp_st;
     socket.lv_state_ = lv_st;
     socket.ls_state_ = ls_st;
     socket.broadcast.emit('temp_state', {
     la_state_: socket.la_state_,
     lp_state_: socket.lp_state_,
     lv_state_: socket.lv_state_,
     ls_state_: socket.ls_state_
     });
*/
    socket.on('temp_state_first', function () {
        //la_state
        //console.log("temp_state");
        var loc_state = 0;
        if(loc_state == 0){
            //console.log("temp_state");
            var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
            if(indexOfMax(loc1_max) == 0){
                la_st = "1";
            }else if(indexOfMax(loc1_max) == 1){
                lp_st = "1";
            }else if(indexOfMax(loc1_max) == 2){
                lv_st = "1";
            }else if(indexOfMax(loc1_max) == 3){
                ls_st = "1";
            }
            socket.la_state_ = la_st;
            socket.lp_state_ = lp_st;
            socket.lv_state_ = lv_st;
            socket.ls_state_ = ls_st;
            socket.broadcast.emit('temp_state', {
                la_state_: socket.la_state_,
                lp_state_: socket.lp_state_,
                lv_state_: socket.lv_state_,
                ls_state_: socket.ls_state_
            });
            //console.log(socket.la_state_);
        }else if(loc_state == 1){
            var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
            if(indexOfMax(loc2_max) == 0){
                la_st = "1";
            }else if(indexOfMax(loc2_max) == 1){
                lp_st = "1";
            }else if(indexOfMax(loc2_max) == 2){
                lv_st = "1";
            }else if(indexOfMax(loc2_max) == 3){
                ls_st = "1";
            }
            socket.la_state_ = la_st;
            socket.lp_state_ = lp_st;
            socket.lv_state_ = lv_st;
            socket.ls_state_ = ls_st;
            socket.broadcast.emit('temp_state', {
                la_state_: socket.la_state_,
                lp_state_: socket.lp_state_,
                lv_state_: socket.lv_state_,
                ls_state_: socket.ls_state_
            });
        }else if(loc_state == 2){
            var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
            if(indexOfMax(loc3_max) == 0){
                la_st = "1";
            }else if(indexOfMax(loc3_max) == 1){
                lp_st = "1";
            }else if(indexOfMax(loc3_max) == 2){
                lv_st = "1";
            }else if(indexOfMax(loc3_max) == 3){
                ls_st = "1";
            }
            socket.la_state_ = la_st;
            socket.lp_state_ = lp_st;
            socket.lv_state_ = lv_st;
            socket.ls_state_ = ls_st;
            socket.broadcast.emit('temp_state', {
                la_state_: socket.la_state_,
                lp_state_: socket.lp_state_,
                lv_state_: socket.lv_state_,
                ls_state_: socket.ls_state_
            });
        }else if(loc_state == 3){
            var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
            if(indexOfMax(loc4_max) == 0){
                la_st = "1";
            }else if(indexOfMax(loc4_max) == 1){
                lp_st = "1";
            }else if(indexOfMax(loc4_max) == 2){
                lv_st = "1";
            }else if(indexOfMax(loc4_max) == 3){
                ls_st = "1";
            }
            socket.la_state_ = la_st;
            socket.lp_state_ = lp_st;
            socket.lv_state_ = lv_st;
            socket.ls_state_ = ls_st;
            socket.broadcast.emit('temp_state', {
                la_state_: socket.la_state_,
                lp_state_: socket.lp_state_,
                lv_state_: socket.lv_state_,
                ls_state_: socket.ls_state_
            });
        }
    });

    socket.on('get_locations_name', function () {
        //console.log("Yes I need locations neme -> ");
        // get all names of locations
        var loc_i = 0;
        var main_obj_all = obj_all;
        var obj_Names = [];
        for (var main_key in main_obj_all) {
            if (main_obj_all.hasOwnProperty(main_key)) {
                var obj_all_ = main_obj_all[main_key];
                //console.log(" -> " + obj_all_);

                for (var key_ in obj_all_) {
                    if (obj_all_.hasOwnProperty(key_)) {

                        //console.log(loc_i+" -> " + obj_Names);

                        var oName = {};
                        oName[loc_i] = key_;
                        obj_Names.push(oName);
                        //console.log(key_+" -> " + obj_Names[loc_i][loc_i]);//obj_Names[loc_i][loc_i]

                    }
                    loc_i++;
                }
            }
        }

        socket.update_loc_for_spinners_data = obj_Names;
        socket.emit('update_loc_for_spinners', {
            update_loc_for_spinners_data: socket.update_loc_for_spinners_data
        });


    });

    socket.on('write_cvs_file', function (data) {
        //var fs = require('fs');
        fs.writeFile(path.join(__dirname, '/public/pages/forthreedplot.cvs'), data, function(err) {
            if(err) {
                return console.log(err);
            }

            //console.log("The file was saved!");
        });
    });

    socket.on('add_new_location', function (tag_name) {
        var obj_all = data_temp;
        var new_loc_name = tag_name;
        //console.log(obj_all.length+" ---------------------------------------------------------- HERE");

        //var newdata = '{'+new_loc_name+':[]}';
        var o = {};
        o[new_loc_name] = [];

        obj_all.push(o);

        var data = JSON.stringify(obj_all, null , 2);
        //console.log(data+" ---------------------------------------------------------- HERE");
        fs.writeFile('temp_file.json',data,finished);

        function finished () {

            fs.createReadStream('temp_file.json').pipe(fs.createWriteStream(path.join(__dirname, '/public/pages/temp_file.json')));

            //console.log(data+"Done  ---------------------------------------------------------- HERE");
            //data

            // get all names of locations
            var loc_i = 0;
            var main_obj_all = obj_all;
            var obj_Names = [];
            for (var main_key in main_obj_all) {
                if (main_obj_all.hasOwnProperty(main_key)) {
                    var obj_all_ = main_obj_all[main_key];
                    //console.log(" -> " + obj_all_);

                    for (var key_ in obj_all_) {
                        if (obj_all_.hasOwnProperty(key_)) {

                            //console.log(loc_i+" -> " + obj_Names);

                            var oName = {};
                            oName[loc_i] = key_;
                            obj_Names.push(oName);
                            //console.log(key_+" -> " + );//obj_Names[loc_i][loc_i]

                        }
                        loc_i++;
                    }
                }
            }


            socket.update_loc_for_spinners_data = obj_Names;
            socket.broadcast.emit('update_loc_for_spinners', {
                update_loc_for_spinners_data: socket.update_loc_for_spinners_data
            });

        }
        //data_temp


    });

    socket.on('Longterm_node', function (La_string,Lp_string,Lv_string,Ls_string, Ex_string, Er_string, Sc_string, Py_string, Tp_string, Ab_string, Jl_string) {

        socket.La_node = La_string;
        socket.Lp_node = Lp_string;
        socket.Lv_node = Lv_string;
        socket.Ls_node = Ls_string;
        socket.Ex_string = Ex_string;
        socket.Er_string = Er_string;
        socket.Sc_string = Sc_string;
        socket.Py_string = Py_string;
        socket.Tp_string = Tp_string;
        socket.Ab_string = Ab_string;
        socket.Jl_string = Jl_string;

        //console.log(socket.Ls_node+":"+socket.username);
        socket.broadcast.emit('La_node', {
            La_node: socket.La_node,
            username: socket.username
        });
        socket.broadcast.emit('Lp_node', {
            Lp_node: socket.Lp_node,
            username: socket.username
        });
        socket.broadcast.emit('Lv_node', {
            Lv_node: socket.Lv_node,
            username: socket.username
        });
        socket.broadcast.emit('Ls_node', {
            Ls_node: socket.Ls_node,
            username: socket.username
        });

        var obj_all = data_temp;
        var newdata = ({
            agent:socket.username,  // re look on it !!! ==============================
            Date:Date(),
            La:socket.La_node,
            Lp:socket.Lp_node,
            Lv:socket.Lv_node,
            Ls:socket.Ls_node,
            Ex:socket.Ex_string,
            Er:socket.Er_string,
            Sc:socket.Sc_string,
            Py:socket.Py_string,
            Tp:socket.Tp_string,
            Ab:socket.Ab_string,
            Jl:socket.Jl_string
        });
        main_obj_all = obj_all;
        for (var main_key in main_obj_all) {
            if (main_obj_all.hasOwnProperty(main_key)) {
                obj_all_ = main_obj_all[main_key];
                for (var key_ in obj_all_) {
                    if (obj_all_.hasOwnProperty(key_)) {
                        if (socket.Loc_node == key_) {
                            obj_all_[socket.Loc_node + ""].push(newdata);
                            //console.log(key_ + " ---------------------------------------------------------- HERE");
                        }
                        key_i++;
                    }
                }
            }
        }
        key_i = 0;

        //console.log(obj_all);
        /*if(socket.Loc_node == 'loc1'){
            obj_all.loc1.push(newdata);
        }else if(socket.Loc_node == 'loc2'){
            obj_all.loc2.push(newdata);
        }else if(socket.Loc_node == 'loc3'){
            obj_all.loc3.push(newdata);
        }else if(socket.Loc_node == 'loc4'){
            obj_all.loc4.push(newdata);
        }*/
        var data = JSON.stringify(obj_all, null , 2);
        fs.writeFile('temp_file.json',data,finished);

        function finished () {

            fs.createReadStream('temp_file.json').pipe(fs.createWriteStream(path.join(__dirname, '/public/pages/temp_file.json')));

            //console.log('Done!!.. somethings wrong json file');

            //console.log('avg = '+avg);

            //avg_la,avg_lp,avg_lv,avg_ls
            main_obj_all = obj_all;var loc_i = 0;
            for (var main_key in main_obj_all) {
                if (main_obj_all.hasOwnProperty(main_key)) {
                    obj_all_ = main_obj_all[main_key];
                    //console.log(" -> " + obj_all_);

                    for (var key_ in obj_all_) {
                        if (obj_all_.hasOwnProperty(key_)) {
                            //console.log(key_ + " length -> " + obj_all_[key_].length);
                            length_array = obj_all_[key_].length;
                            if(length_array > 0){
                                // AVG La============================================
                                var sum = 0;
                                //console.log(key_ + " -> " + obj_all_[key_][loc_i].La);
                                for (var i = 0; i < length_array; i++) {
                                    sum += obj_all_[key_][i].La; //don't forget to add the base
                                }
                                var avg = sum / length_array;
                                avg_la[loc_i] = avg;
                                //console.log('loc'+loc_i+'La avg: '+avg);

                                // AVG Lp=============================================
                                sum = 0;
                                for (var i = 0; i < length_array; i++) {
                                    sum += obj_all_[key_][i].Lp; //don't forget to add the base
                                }
                                avg = sum / length_array;
                                avg_lp[loc_i] = avg;
                                //console.log('loc'+loc_i+'Lp avg: '+avg);

                                // AVG Lv==============================================
                                sum = 0;
                                for (var i = 0; i < length_array; i++) {
                                    sum += obj_all_[key_][i].Lv; //don't forget to add the base
                                }
                                avg = sum / length_array;
                                avg_lv[loc_i] = avg;
                                //console.log('loc'+loc_i+'Lv avg: '+avg);

                                // AVG Ls=============================================
                                sum = 0;
                                for (var i = 0; i < length_array; i++) {
                                    sum += obj_all_[key_][i].Ls; //don't forget to add the base
                                }
                                avg = sum / length_array;
                                avg_ls[loc_i] = avg;
                                //console.log('loc'+loc_i+'Ls avg: '+avg);
                            }else if(length_array == 0){
                                avg_la[loc_i] = 0.1;
                                avg_lp[loc_i] = 0.1;
                                avg_lv[loc_i] = 0.1;
                                avg_ls[loc_i] = 0.1;
                            }
                        }
                        loc_i++;
                    }
                }
            }

            /*var loc_i = 0;
            for (var key in obj_all) {
                if (obj_all.hasOwnProperty(key)) {
                    //console.log(key + " -> " + obj_all[key]);
                    // AVG La============================================
                    var sum = 0;
                    for (var i = 0; i < obj_all[key].length; i++) {
                        sum += obj_all[key][i].La; //don't forget to add the base
                    }
                    var avg = sum / obj_all[key].length;
                    avg_la[loc_i] = avg;
                    //console.log('loc'+key+'La avg: '+avg);

                    // AVG Lp=============================================
                    sum = 0;
                    for (var i = 0; i < obj_all[key].length; i++) {
                        sum += obj_all[key][i].Lp; //don't forget to add the base
                    }
                    avg = sum / obj_all[key].length;
                    avg_lp[loc_i] = avg;
                    //console.log('loc'+key+'Lp avg: '+avg);;

                    // AVG Lv==============================================
                    sum = 0;
                    for (var i = 0; i < obj_all[key].length; i++) {
                        sum += obj_all[key][i].Lv; //don't forget to add the base
                    }
                    avg = sum / obj_all[key].length;
                    avg_lv[loc_i] = avg;
                    //console.log('loc'+key+'Lv avg: '+avg);

                    // AVG Ls=============================================
                    sum = 0;
                    for (var i = 0; i < obj_all[key].length; i++) {
                        sum += obj_all[key][i].Ls; //don't forget to add the base
                    }
                    avg = sum / obj_all[key].length;
                    avg_ls[loc_i] = avg;
                    //console.log('loc'+key+'Ls avg: '+avg);

                    //=====================================================
                    loc_i++;
                }
            }*/

            socket.avgLa_ = avg_la;
            socket.avgLp_ = avg_lp;
            socket.avgLv_ = avg_lv;
            socket.avgLs_ = avg_ls;
            socket.broadcast.emit('Temporals_node', {
                avgLa_: socket.avgLa_,
                avgLp_: socket.avgLp_,
                avgLv_: socket.avgLv_,
                avgLs_: socket.avgLs_
            });



            //var loc1_max = [avg_la[0],avg_lp[0],avg_lv[0],avg_ls[0]];
            //var loc2_max = [avg_la[1],avg_lp[1],avg_lv[1],avg_ls[1]];
            //var loc3_max = [avg_la[2],avg_lp[2],avg_lv[2],avg_ls[2]];
            //var loc4_max = [avg_la[3],avg_lp[3],avg_lv[3],avg_ls[3]];

            function indexOfMax(arr) {
                if (arr.length === 0) {
                    return -1;
                }

                var max = arr[0];
                var maxIndex = 0;

                for (var i = 1; i < arr.length; i++) {
                    if (arr[i] > max) {
                        maxIndex = i;
                        max = arr[i];
                    }
                }

                return maxIndex;
            }

            //console.log('loc1 : ' +indexOfMax(loc1_max));
            //console.log('loc2 : ' +indexOfMax(loc2_max));
            //console.log('loc3 : ' +indexOfMax(loc3_max));
            //console.log('loc4 : ' +indexOfMax(loc4_max));

            //la_state
            /*
            for (var key_ in obj_all) {
                if (obj_all.hasOwnProperty(key_)) {
                    console.log(obj_all[key_] +' loc ====== loc_where :'+ socket.Loc_node);
                    loc_max[key_i] = [avg_la[key_i],avg_lp[key_i],avg_lv[key_i],avg_ls[key_i]];
                    //Obj_by_one = obj_all[key_];
                    //var Obj_by_one = JSON.parse(obj_all[key_]);
                    //console.log(obj_all[key_] +' loc ====== loc_where :'+ socket.Loc_node);

                    if(socket.Loc_node == key_){

                        var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
                        if(indexOfMax(loc_max[key_i]) == 0){
                            la_st = "1";
                        }else if(indexOfMax(loc_max[key_i]) == 1){
                            lp_st = "1";
                        }else if(indexOfMax(loc_max[key_i]) == 2){
                            lv_st = "1";
                        }else if(indexOfMax(loc_max[key_i]) == 3){
                            ls_st = "1";
                        }
                        //console.log(socket.Loc_node+' loc ====== : ' +loc_max[key_i][0] + loc_max[key_i][1]+loc_max[key_i][2]+loc_max[key_i][3]);

                        socket.loc_state = key_;
                        socket.la_state_ = la_st;
                        socket.lp_state_ = lp_st;
                        socket.lv_state_ = lv_st;
                        socket.ls_state_ = ls_st;
                        socket.broadcast.emit('temp_state', {
                            loc_state: socket.loc_state,
                            la_state_: socket.la_state_,
                            lp_state_: socket.lp_state_,
                            lv_state_: socket.lv_state_,
                            ls_state_: socket.ls_state_
                        });
                    }
                    key_i ++ ;
                }
            }
            key_i = 0;
            */

            main_obj_all = obj_all;var loc_i = 0;
            for (var main_key in main_obj_all) {
                if (main_obj_all.hasOwnProperty(main_key)) {
                    obj_all_ = main_obj_all[main_key];
                    //console.log(" -> " + obj_all_);
                    for (var key_ in obj_all_) {
                        if (obj_all_.hasOwnProperty(key_)) {
                            //console.log(key_ + " length -> " + obj_all_[key_]);
                            length_array = obj_all_[key_].length;


                            loc_max[loc_i] = [avg_la[loc_i],avg_lp[loc_i],avg_lv[loc_i],avg_ls[loc_i]];
                            if(socket.Loc_node == key_){

                                var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
                                if(indexOfMax(loc_max[loc_i]) == 0){
                                    la_st = "1";
                                }else if(indexOfMax(loc_max[loc_i]) == 1){
                                    lp_st = "1";
                                }else if(indexOfMax(loc_max[loc_i]) == 2){
                                    lv_st = "1";
                                }else if(indexOfMax(loc_max[loc_i]) == 3){
                                    ls_st = "1";
                                }
                                //console.log(socket.Loc_node+' loc ====== : ' +loc_max[key_i][0] + loc_max[key_i][1]+loc_max[key_i][2]+loc_max[key_i][3]);

                                socket.loc_state = key_;
                                socket.la_state_ = la_st;
                                socket.lp_state_ = lp_st;
                                socket.lv_state_ = lv_st;
                                socket.ls_state_ = ls_st;
                                socket.broadcast.emit('temp_state', {
                                    loc_state: socket.loc_state,
                                    la_state_: socket.la_state_,
                                    lp_state_: socket.lp_state_,
                                    lv_state_: socket.lv_state_,
                                    ls_state_: socket.ls_state_
                                });
                            }
                        }
                        loc_i++;
                    }
                }
            }

            /*var loc_state = -1;
            if(loc_state == 0){
                var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
                if(indexOfMax(loc1_max) == 0){
                    la_st = "1";
                }else if(indexOfMax(loc1_max) == 1){
                    lp_st = "1";
                }else if(indexOfMax(loc1_max) == 2){
                    lv_st = "1";
                }else if(indexOfMax(loc1_max) == 3){
                    ls_st = "1";
                }
                socket.la_state_ = la_st;
                socket.lp_state_ = lp_st;
                socket.lv_state_ = lv_st;
                socket.ls_state_ = ls_st;
                socket.broadcast.emit('temp_state', {
                    la_state_: socket.la_state_,
                    lp_state_: socket.lp_state_,
                    lv_state_: socket.lv_state_,
                    ls_state_: socket.ls_state_
                });
            }else if(loc_state == 1){
                var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
                if(indexOfMax(loc2_max) == 0){
                    la_st = "1";
                }else if(indexOfMax(loc2_max) == 1){
                    lp_st = "1";
                }else if(indexOfMax(loc2_max) == 2){
                    lv_st = "1";
                }else if(indexOfMax(loc2_max) == 3){
                    ls_st = "1";
                }
                socket.la_state_ = la_st;
                socket.lp_state_ = lp_st;
                socket.lv_state_ = lv_st;
                socket.ls_state_ = ls_st;
                socket.broadcast.emit('temp_state', {
                    la_state_: socket.la_state_,
                    lp_state_: socket.lp_state_,
                    lv_state_: socket.lv_state_,
                    ls_state_: socket.ls_state_
                });
            }else if(loc_state == 2){
                var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
                if(indexOfMax(loc3_max) == 0){
                    la_st = "1";
                }else if(indexOfMax(loc3_max) == 1){
                    lp_st = "1";
                }else if(indexOfMax(loc3_max) == 2){
                    lv_st = "1";
                }else if(indexOfMax(loc3_max) == 3){
                    ls_st = "1";
                }
                socket.la_state_ = la_st;
                socket.lp_state_ = lp_st;
                socket.lv_state_ = lv_st;
                socket.ls_state_ = ls_st;
                socket.broadcast.emit('temp_state', {
                    la_state_: socket.la_state_,
                    lp_state_: socket.lp_state_,
                    lv_state_: socket.lv_state_,
                    ls_state_: socket.ls_state_
                });
            }else if(loc_state == 3){
                var la_st = "0",lp_st = "0",lv_st = "0",ls_st = "0";
                if(indexOfMax(loc4_max) == 0){
                    la_st = "1";
                }else if(indexOfMax(loc4_max) == 1){
                    lp_st = "1";
                }else if(indexOfMax(loc4_max) == 2){
                    lv_st = "1";
                }else if(indexOfMax(loc4_max) == 3){
                    ls_st = "1";
                }
                socket.la_state_ = la_st;
                socket.lp_state_ = lp_st;
                socket.lv_state_ = lv_st;
                socket.ls_state_ = ls_st;
                socket.broadcast.emit('temp_state', {
                    la_state_: socket.la_state_,
                    lp_state_: socket.lp_state_,
                    lv_state_: socket.lv_state_,
                    ls_state_: socket.ls_state_
                });
            }*/


        }

    });





    // ========================================================== Ex Variables
    /*
    socket.on('Ex_node', function (Ex_string) {

        socket.Ex_node = Ex_string;
        console.log(socket.Ex_node+":"+socket.username);
        socket.broadcast.emit('Ex_node', {
            Ex_node: socket.Ex_node,
            username: socket.username
        });


         {

         "loc1":[],
         "loc2":[],
         "loc3":[],
         "loc4":[]

         }


        var obj_all = data_temp;
        //console.log(obj_all);
        obj_all.loc1.push({test2:'trying'});
        var data = JSON.stringify(obj_all, null , 2);
        fs.writeFile('temp_file.json',data,finished);
        function finished () {
            console.log('.. somethings wrong json file');
        }

    });

    socket.on('Er_node', function (Er_string) {

        socket.Er_node = Er_string;
        console.log(socket.Er_node+":"+socket.username);
        socket.broadcast.emit('Er_node', {
            Er_node: socket.Er_node,
            username: socket.username
        });

    });

    socket.on('Sc_node', function (Sc_string) {

        socket.Sc_node = Sc_string;
        console.log(socket.Sc_node+":"+socket.username);
        socket.broadcast.emit('Sc_node', {
            Sc_node: socket.Sc_node,
            username: socket.username
        });

    });

    socket.on('Py_node', function (Py_string) {

        socket.Py_node = Py_string;
        console.log(socket.Py_node+":"+socket.username);
        socket.broadcast.emit('Py_node', {
            Py_node: socket.Py_node,
            username: socket.username
        });

    });

    socket.on('Tp_node', function (Tp_string) {

        socket.Tp_node = Tp_string;
        console.log(socket.Tp_node+":"+socket.username);
        socket.broadcast.emit('Tp_node', {
            Tp_node: socket.Tp_node,
            username: socket.username
        });

    });

    socket.on('Abnorm_node', function (Abnorm_string) {

        socket.Abnorm_node = Abnorm_string;
        console.log(socket.Abnorm_node+":"+socket.username);
        socket.broadcast.emit('Abnorm_node', {
            Abnorm_node: socket.Abnorm_node,
            username: socket.username
        });

    });

    socket.on('Jlbasic_node', function (Jlbasic_string) {

        socket.Jlbasic_node = Jlbasic_string;
        console.log(socket.Jlbasic_node+":"+socket.username);
        socket.broadcast.emit('AJlbasic_node', {
            Jlbasic_node: socket.Jlbasic_node,
            username: socket.username
        });

    });*/
});

