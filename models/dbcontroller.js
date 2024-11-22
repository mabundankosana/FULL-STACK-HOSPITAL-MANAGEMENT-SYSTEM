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

module.exports.getleavebyid = function(id, callback){
    var query = "select * from leaves where id="+id;
    con.query(query, callback)
}
module.exports.getAllleave = function(callback){
    var query = "select * from leaves"
    con.query(query, callback)
}
module.exports.add_leave = function(name, id, type, from, to, reason, callback){
    var query = "INSERT into `leaves`(`employee`, `emp_id`, `leave_type`, `date_from`, `date-to`, `reason`) values('"+name+"', '"+id+"', '"+type+"', '"+from+"', '"+to+"', '"+reason+"',)"
    console.log(query)
    con.query(query, callback);
}

module.exports.deleteleave = function(id, callback){
    var query = "delete from leaves where id="+id;
    con.query(query, callback)
}

module.exports.getAllemployee = function(callback){
    var query = "select * from leaves"
    con.query(query, callback)
}

module.exports.add_employee = function(name, email, contact, join_date, role, salary, callback){
    var query = "INSERT into `employee`(`name`, `email`, `contact`, `join_date`, `role`, `salary`) values('"+name+"', '"+email+"', '"+contact+"', '"+join_date+"', '"+role+"', '"+salary+"',)"
    console.log(query)
    con.query(query, callback);
}

module.exports.searchEmp =  function(key, callback){
    var query = "SELECT * from employee where name like "%'+key+'%"'";  
    con.query(query, callback);
    console.log(query);

};

module.exports.deleteEmp = function(id, callback){
    var query = "delete from employee where id="+id;
    con.query(query, callback)
}

module.exports.editEmp = function(id, name, email, contact, join_date, role, callback){
    var query = "update `employee` set `name` = '"+name+"', `email`= '"+email+"', `contact`= '"+contact+"' , `join_date`= '"+join_date+"' , `role`= '"+role+"' where id = "+id;
    con.query(query, callback);
}

module.exports.getEmpbyid = function(id, callback){
    var query = "select * from employee where id="+id;
    con.query(query, callback)
}

module.exports.edit_leave = function(id, name, leave_type, from, to, reason, callback){
    var query = "update `leaves` set `employee` = '"+name+"', `leave_type`= '"+leave_type+"', `date_from`= '"+from+"' , `date_to`= '"+to+"' , `reason`= '"+reason+"' where id = "+id;
    con.query(query, callback);
}

module.exports.add_appointment = function(p_name, department, d_name, date, time, email, phone, callback){
    var query = "insert into appointment (patient_name, department, doctor_name, date, time, email, phone) values('"+p_name+"', '"+department+"', '"+d_name+"', '"+date+"', '"+time+"', '"+email+"', '"+phone+"')"
    con.query(query, callback)
}

module.exports.getallappointment = function(callback){
    var query = "select * from appointment";
    con.query(query, callback)
}

module.exports.editappointment = function(id, p_name, department, d_name, date, time, email, phone, callback){
    var query = "update `appointment` set `patient_name` = '"+p_name+"', `department`= '"+department+"', `doctor_name`= '"+d_name+"' , `date`= '"+date+"' , `email`= '"+email+"' , `phone`= '"+phone+"' where id = "+id;
    con.query(query, callback);
}

module.exports.deleteappointment = function(id, callback){
    var query = "delete from appointment where id="+id;
    con.query(query, callback)
}

module.exports.getallmed = function(callback){
    var query = "select * from store order by id desc";
    console.log(query)
    con.query(query, callback)
}

module.exports.addMed = function(name, p_date, expire, e_date, price, quantity, callback){
    var query = "Insert into `store` (name,p_date, expire, expire_end, price, quantity) values('"+name+"', '"+p_date+"', '"+expire+"', '"+e_date+"', '"+price+"', '"+quantity+"')";
    con.query(query, callback)
}

module.exports.getMedbyid = function(id, callback){
    var query = "select * from store where id="+id;
    con.query(query, callback)
}

module.exports.editmed = function(id, name, p_date, expire, e_date, price, quantity, callback){
    var query = "update store set name = '"+name+"', p_date = '"+p_date+"', expire = '"+expire+"', expire_end = '"+e_date+"', price = '"+price+"', quantity = '"+quantity+"' where id="+id;
    con.query(query, callback)
}
module.exports.deletemed = function(id, callback){
    var query = "delete from store where id="+id;
    con.query(query, callback)
}

module.exports.searchmed = function(key, callback){
    var query = 'SELECT * from store where name like "%'+key+'%"'
    con.query(query, callback)
}

module.exports.postcomplain = function(message, name, email, subject, callback){
    var query = "insert into complain(message, name, email, subject) values('"+message+"', '"+name+"', '"+email+"', '"+subject+"',)";
    con.query(query, callback);
}

module.exports.getcomplain = function(callback){
    var query = "select * from complain";
    con.query(query, callback)
}