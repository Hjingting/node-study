var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
var user = require('./routes/user');
app.use('/user', user);//归类user相关的资料至routes文件夹下

//增加静态档案的路径
app.use(express.static('public'));//放在开头

//增加body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//在跳转到首页之前进行一些判断，如是否登录账号等
var login = function (req, res, next) {
  var _url = req.url;
  if (_url == '/') {
    next();
  }
  else {
    res.send('您的登录资料有错~')
  }
}

//首页
app.get('/', login, function (req, res) {
  // res.send('<html><head><body><h1>index</h1><img src="images/logo.png"></body></head></html>')
  // res.send('你现在进入的是首页');
  res.render('index', {
    'title': 'express-test',
    'author': 'jillty',
    'show': false,
    'course': ['html', 'css', 'js', 'php', 'bs']
  });//使用render就直到要使用ejs，系统会自动去寻找对应的ejs文件
  console.log('有人造访首页');
})

//用户页
app.get('/user', function (req, res) {
  // res.send('<html><head><body><h1>index</h1><img src="images/logo.png"></body></head></html>')
  res.render('user');
})

//搜寻页
app.get('/search', function (req, res) {
  res.render('search');
})

app.post('/searchList', function (req, res) {
  console.log(req.body);
  res.redirect('/search');
})

app.post('/searchAjax', function (req, res) {
  res.send('hello!!!');
  console.log(req.body);
})


//路径的设置
app.get('/user/:name', function (req, res) {
  var myName = req.params.name;
  var limit = req.query.limit;
  var q = req.query.q;
  res.send(myName + '想要找关于' + q + '的前' + limit + '笔资料');
})


app.use(function (req, res, next) {
  res.status(404).send('抱歉，您的页面找不到')
})

app.use(function (err, req, res, next) {
  res.status(500).send('程式有些问题，请稍后再试')
})

var port = process.env.PORT || 3000;
app.listen(port);