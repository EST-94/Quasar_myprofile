const express = require('express');
const app = express();
const send_message = require('../api/naverSMS')
const http = require('http')

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
console.log('Express server listening on port ' + server.address().port);
});

app.use(express.json())

// http://devitter.com:3000/aws/getList 에 컨트롤러 매핑
app.get('/aws/getList', function(req, res) {
    res.send('proxy connected');
  });

app.post('/aws/sendnaver', function(req, res) {
    const contect = req.body.contect
    const content = req.body.newDeviContent

    res.setHeader('Content-Type', 'application/json')
    console.log('post is work')

     try {
       // send_message 모듈을 실행시킨다. 
        send_message(contect, content)
        res.send("send message!")
     }catch(err){
        console.log(err)
    }
});

//app.listen(3000);