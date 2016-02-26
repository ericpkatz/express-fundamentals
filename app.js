var express = require('express');
var app = express();

app.use(function(req, res, next){
  res.messages = [];
  res.messages.push('Hi I am middleware! I will log for EVERY REQUEST');
  res.messages.push(`URL: ${req.url}`);
  res.messages.push('----');
  next();
});

app.use(function(req, res, next){
  res.messages.push('Hi I am ALSO middleware! I will log for EVERY REQUEST');
  res.messages.push(`Something Random: ${Math.random()}`);
  res.messages.push('----');
  next();
});

app.get('/foo', function(req, res, next){
  res.messages.push('Hi I am in the /foo route handler- I will pass to next route.');
  res.messages.push('----');
  next();
});

app.get('/bar', function(req, res, next){
  res.messages.push('Hi I am in the /bar route handler- . I will throw an error. By calling next with an argument');
  res.messages.push('----');
  next('I am an error from the bar route');
});
app.get('/bar', function(req, res, next){
  res.messages.push('I am a typical route');
  res.send(messages);
});


app.use(function(req, res, next){
  res.messages.push('Hi I am the catch all route-- you will hit me if I fall through from everything else. I am the place to send out a 404-- because you should never make it down here');
  res.status(404).send(res.messages);
});

app.use(function(err, req, res, next){
  res.messages.push('I have four parameters. I get called if next is called with an error. My first param is the error');
  res.messages.push(err);
  res.status(500).send(res.messages);
});

app.listen(3000);
