const express = require('express');

// 경로 처리를 위한 모듈 불러오기
const path = require('path');
const { nextTick } = require('process');

const app = express();

// app.set('port', 포트번호)로 서버가 실행될 포트 지정
app.set('port', process.env.PORT || 3000);

// 미들웨어 장착
app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요.');
    next();
});


app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됨');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 감');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})

// app.get('주소', 콜백)로 GET 요청이 들어올 때 어떤 동작을 할지 지정
app.get('/', (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html'));
});

// app.listen('port', 콜백) 으로 몇 번 포트에서 서버를 실행할지 지정
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});