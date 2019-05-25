var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var comments = [{
    name: '张三',
    message: 'hello world!',
    dateTime: '2018-10-12'
    },
    {
    name: '李四',
    message: 'hello world!',
    dateTime: '2018-10-12'
    },
    {
        name: '王五',
        message: 'hello world!',
        dateTime: '2018-10-12'
    }
];
//模板引擎
app.engine('html', require('express-art-template'));
 
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false})); //加入这个配置，则在request请求上会多出一个属性body，从而获取post请求
//parse application/json
app.use(bodyParser.json());

app.get('/', function(request, response){
    response.render('index.html', {comments: comments});
});
app.get('/index.html', function(request, response){
    response.render('index.html', {comments: comments});
});
app.get('/post.html', function(request, response){
    response.render('post.html');
});

app.post('/post', function(request, response){
    var comment = request.body;
    // console.log(request.body);
    // comment.dateTime = '2018-12-01';
    comments.unshift(comment);
    response.redirect('/');
});

app.use('/public/', express.static('./public/'));
app.listen(3000, function(){
    console.log('server is running...');
});