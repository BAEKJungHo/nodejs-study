# HTTP 모듈로 서버 만들기

## HTTP 서버 만들기

```javascript
// HTTP 모듈로 서버 만들기
const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello JungHo</p>');
})
    .listen(8080, () => {
        console.log('8080 번 포트에서 서버 대기 중');
    })
```

![nodehttpterminal](https://user-images.githubusercontent.com/47518272/156536776-34c49956-b18b-4adc-9ae9-7f732327105a.png)

서버를 실행 시키면 하나의 Terminal 을 잡아먹는다. 실행 결과는 아래와 같다.

![nodehttp](https://user-images.githubusercontent.com/47518272/156536634-757b95aa-bd9e-417a-8c16-aac3157edbf9.png)

아래 처럼 listen 콜백을 따로 뺄 수 있다.

```javascript
// HTTP 모듈로 서버 만들기
const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello JungHo</p>');
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
})

server.on('error', (error) => {
    console.error(error);
})
```

## fs 로 HTML 읽어 제공하기

사파리의 경우 `<h1>Hello Node!</h1>` 가 HTML 인지 문자열인지 모른다. 따라서 아래 처럼 추가해줘야 한다.

```
res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
```

fs 를 사용하여 아래와 같이 리팩토링할 수 있다.

```javascript
// HTTP 모듈로 서버 만들기
const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    try {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        const data = await fs.readFile('./server2.html');
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
})

server.on('error', (error) => {
    console.error(error);
})
```

## REST API 서버 만들기

- https://github.com/ZeroCho/nodejs-book/tree/master/ch4/4.2
