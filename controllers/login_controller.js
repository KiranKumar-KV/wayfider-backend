const { router, dbcontroller, FILES_PATH } = require("./controller-config");

const jwt = require('jsonwebtoken');
const config = require('../constants/config.js');
const nodemailer = require('nodemailer');

router.post('/get-login', async (req,res) => {
    try {
        let postdata = req.body.data;
        let {email,password} = postdata;
        password = parseInt(password)
        let newdata = await dbcontroller.getLoginData(email);
        if(newdata.length > 0){
            // console.log(newdata)
            if(newdata[0].email === email && parseInt(newdata[0].password) === password){
                var token = jwt.sign({ id : newdata[0].email}, config.secret, {
                    expiresIn : 86400 // expires in 24 hours
                });
                let responsedata = {
                    token : token,
                    username : newdata[0].name,
                    role : newdata[0].role_name,
                    user_id :newdata[0].user_id,
                    role_id : newdata[0].role_id,
                    mall_id : newdata[0].mall_id,
                    mall_name : newdata[0].mall_name
                }
                console.log(responsedata)
                return res.status(200).send(responsedata);
            }
            else {
                return res.status(400).send({error : 'username and password mis-match'})
            }
        }
        else { 
            return res.status(404).send({error :'user not found'});
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error ${e}`});
    }
})

router.post('/forget-password', async (req,res) => {
    try {
        let {email} = req.body.data;
        let emailcheck  = await dbcontroller.checkForEmailValidity(email);
        if(emailcheck.length > 0) {

            let user_id = emailcheck[0].user_id;
            let passwordChange = await dbcontroller.changeUserPassword(user_id);
            if(passwordChange.length > 0) {
                let newpassword = passwordChange[0].password
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'vrvinfoled@gmail.com',
                        pass: 'Vrvinfoled001@@@'
                    }
                });

                var mailOptions = {
                    from: 'vrvinfoled@gmail.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    text: `password changed... This is your new password ${newpassword}`
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.status(200).send({message : 'reset password link sent to the mail'})
                    }
                });
            }
            else {
                return res.status(404).send({error : 'failed to change password try again later'})
            }
        }
        else {
            return res.status(400).send({error : 'email does not exists'})
        }
    }
    catch(e) {
        console.log(e)
    return res.status(500).send({error : `server error ${e}`})
    }
})


module.exports = router;