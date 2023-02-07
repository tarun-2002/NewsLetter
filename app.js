const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
 const firstName = req.body.first;
 const lastName = req.body.last;
 const email = req.body.Email;
const data ={
    members:[
        {
            email_address :email,
            status : "subscribed",
            merge_fields : {
                FNAME : firstName,
                LNAME : lastName,
            },
        },
    ]
}
const jsonData = JSON.stringify(data);
const url = "https://us9.api.mailchimp.com/3.0/lists/8805c4d37e"
const options={
    method:"post",
    auth:"tarun:8c9930b1422397337ae1d59d5d3b27f8-us9"
}
const request=https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
    console.log(JSON.parse(data));
})
})
// request.write(jsonData);
request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/");

})

app.listen(process.env.PORT,function(){
    console.log("Server Running");
})

