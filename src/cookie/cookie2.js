const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

console.log(fs);
console.log(url);
console.log(qs);

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }

  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();

    // 쿠키 유효 시간을 현재시간 + 5분으로 설정
    // 한글 처리 때문에 encodeURIComponent 설정
    // Expires 없으면 세션 쿠키, 만료 시간 설정하면 영속 쿠키
    // HttpOnly : 자바스크립트로 쿠키에 접근하지 못하도록 막아주는 역할
    // Path : Path 에 설정한 경로 밑으로는 쿠키를 사용할 수 있다는 의미
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();

  } 
  // name이라는 쿠키가 있는 경우
  else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } 
  
  else {
    try {
      const data = await fs.readFile('./cookie/cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });