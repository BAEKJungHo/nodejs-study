// Node js 에서 동기관련 코드는 서버를 처음 실행할 때 초기화 용으로나 쓰지,
// 서버가 띄워지고 나서는 동기 코드를 작성하게되면, 사용자가 많을때 뒷 사람들이 계속 기다려야 함
// 대부분은 비동기 작업을 하면서 순서를 유지하게 끔 설계
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');

console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');

console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');

console.log('3번', data.toString());
console.log('끝');