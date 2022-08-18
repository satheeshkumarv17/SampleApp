const express = require('express');
const app = express();
var nodemailer = require('nodemailer');
var constant=require('./commoncostant');
const multer = require("multer");


var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    auth: {
      user: constant.CREDENTIALS.EMAILID,
      pass: constant.CREDENTIALS.PASSWORD
    }
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+'-'+file.originalname)
    }
  })
  var upload = multer({storage:storage});  
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;  

function sendMail(data,files){
    // console.log('data=',data);
    // console.log('data=',files);
    const attachments = files.map((file)=>{
        return { filename: file.originalname, path: file.path };
      });
      console.log('email::',data.email);
    const mailConfigurations = {
        from: 'csatheeshkumar0709@gmail.com',
        to: data.email,
        subject: 'Sample APP TESTING',
        html: '<h1>Hello!<h1/><p>FirstName:'+data.firstname +'</p><p>Lastname:'+data.lastname +'</p><p>Description:'+data.description +'</p>',
        attachments:attachments
    };
    console.log('mail',mailConfigurations);
    console.log('daata::',data);
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
           console.log('Email Sent Successfully');
        console.log(info);
    });
}    

const port = 3000;
app.use(express.json());
app.use(upload.array()); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
  res.end('Hello World!');
});
app.post('/savedata',(req, res) => {

    sendMail(JSON.parse(req.body.data),req.files);
    res.end('Hello World!');
  });

app.listen(port, () => {
    console.log(`APP listening at http://localhost:${port}`)
});