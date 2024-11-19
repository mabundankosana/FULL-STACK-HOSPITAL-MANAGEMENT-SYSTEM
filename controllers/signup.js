var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var mysql = require('nodemailer');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
const {check, validationResult} = require('express-validator');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/', function(req, res){
    res.render('signup.ejs');
});

router.post('/', [check('username').notEmpty().withMessage("username is required"),
check('password').notEmpty().withMessage("password is required"),
check('email').notEmpty().withMessage("email is required")],function(req, result);
    
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array() })

        }
            var email_status = "not_verified";
            var email = req.body.email;
            var username = req.body.username;
        
        db.signup(req.body.username, req.body.email, req.body.password, email_status);
            var token = randomToken(8);

            db.verify(req.body.username,email, token);

            db.getuserid(email, function(err, result){

                var id = result[0].id;
                var output = `
                <p>Dear `+username+`,</p>
                <p>Thanks for sign up. Your verification id and token is given below: </p>
                <ul>
                    <li>User ID: `+ id +`</li>
                    <li>Token: `+ token +`</li>
                </ul>
                <p>verify link: <a href="http://localhost:3000/verify">Verify</a></p>

                <p><strong>This is automatically generated mail</strong></p>

                <p>Regards,</p>
                <p>H Manager</p>

            `;
            var transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port: 465,
                secure: true,
                auth:{
                    user:"mabundankosana@gmail.com",
                    pass:"@khozi#0104"
                }
            });
            var mailOptions = {
                from: 'Hms@gmail.com',
                to:email,
                subject: 'Email verification',
                html: output
            };
            transporter.sendEmail(mailOptions, function(err,info){
                if(err){
                    return console.log(err);
                }
                console.log(info);
            });
            res.send("check your email for token verify")
            
        })
    


module.exports = router;
