var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'@khozi#0104',
    database:''
});

con.connect(function(err){
    if(err){
        throw err;

    }else{
        console.log('you are now connected to database');

    }
});

module.exports.signup = function(username, email, password, status, callback){

    con.query('SELECT email FROM users WHERE email = "'+email+'" ' ,function(err, result){
        console.log(result[0])
        if(result[0]==undefined){
        var query = "insert into `users`(`username`, `email`, `password`, `email_status`) values('"+username+"', '"+email+"', '"+password+"', '"+status+"' )"
        con.query(query,callback);
        console.log(query);
        }else{
            console.log("error") ;   
        }
    })
}

module.exports.verify =  function(username, email, token, callback){
    var query = "insert into `verify`(`username`, `email`, `token`) values ('"+username+"', '"+email+"', '"+token+"')"
    con.query(query, callback);
}

module.exports.getuserid =  function(email, callback){
    var query = "select * from `verify` where email = '"+email+"' "
    con.query(query, callback);
}

module.exports.matchtoken =  function(id, token, callback){
    var query = "select * from `verify` where token = '"+token+"'  and id= "+id;
    con.query(query, callback);
    console.log(query);
}

module.exports.updateverify =  function(email, email_status, callback){
    var query = "update `users` set `email_status` = '"+email_status+"'  where `email`= '"+email_status+"'";
    con.query(query, callback);
    console.log(query);
}

module.exports.findOne =  function(email, callback){
    var query = "select * from `verify` where email = '"+email+"' "
    con.query(query, callback);
    console.log(query);
}

module.exports.temp = function(id, email, token, callback){
    var query = "insert into `temp`(`id`, `email`, `token`)values('"+id+"', '"+email+"', '"+token+"')"
    con.query(query, callback);
    console.log(query);
}

module.exports.add_doctor = function(first_name, last_name, email, dob, gender, address, phone, image, department, biography, callback){
    var query = "insert into `doctor`(`first_name`, `last_name`, `email`, `gender`, `address`, `phone`, `image`, `department`, `biography`)values('"+first_name+"', '"+last_name+"', '"+email+"', '"+dob+"', '"+gender+"', '"+address+"', '"+phone+"', '"+image+"', '"+department+"', '"+biography+"')"
    con.query(query, callback);
    console.log(query);
}

module.exports.getAllDoc =  function(callback){
    var query = "select * from doctor"
    con.query(query, callback);
    console.log(query);
}

module.exports.getDocbyId =  function(id, callback){
    var query = "select * from doctors where id = '"+id
    con.query(query, callback);
    console.log(query);
}

module.exports.editDoc = function(first_name, last_name, email, dob, gender, address, phone, image, department, biography, callback){
    var query = "update `doctor` set `first_name`= '"+first_name+"', `last_name`= '"+last_name+"', `email`= '"+email+"', `gender`= '"+gender+"', `address`= '"+address+"', `phone`= '"+phone+"', `image`= '"+image+"', `department`= '"+department+"', `biography`= '"+biography+"' where id = '"+id
    con.query(query, callback);
    console.log(query);
    
}

module.exports.deleteDoc =  function(id, callback){
    var query = "delete from doctors where id = '"+id;
    con.query(query, callback);
    console.log(query);
}

module.exports.searchDoc =  function(id, callback){
    var query = "SELECT from where first_name like "%'+key+'%"'";  
    con.query(query, callback);
    console.log(query);
};
module.exports.getalldept =  function(callback){
    var query = "select * from departments" ;
    con.query(query, callback);
    console.log(query);
}