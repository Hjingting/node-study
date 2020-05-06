var send = document.getElementById('send');
var content = document.getElementById('content');

send.addEventListener('click', function (e) {
  e.preventDefault();
  var str = content.value;
  console.log(str);
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/searchAjax');
  xhr.setRequestHeader('Content-type', 'application/json');
  var data = JSON.stringify({
    "content": str
    , "list": [1, 2, 3, 4]
  });
  xhr.send(data);
  xhr.onload = function () {
    console.log(xhr.responseText);
  }
})