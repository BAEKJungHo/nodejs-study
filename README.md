# Node.js Study

> Inflearn. [리뉴얼] Node.js 교과서 - 기본부터 프로젝트 실습까지

## NodeJS vs Spring

- https://www.inexture.com/nodejs-vs-spring-boot-choosing-the-best-technology/

## 자바스크립트

> https://ko.javascript.info/

## 노드의 정의

- __Node.js 는 크롬 V8 자바스크립트 엔진으로 빌드된 `자바스크립트 런타임`이다.__
  - `런타임` : 특정 언어로 만든 프로그램들을 실행할 수 있게 해주는 가상 머신(크롬의 V8 엔진 사용)의 상태
  - Node.js 는 서버가 아니다.
  - Node.js 는 자바스크립트로 만든 프로그램들을 실행할 수 있게 해 준다.
  - Node.js 가 없었던 시절에는 자바스크립트를 어떻게 실행했을까?
    - HTML 에서 `<script>` 태그 사이에 자바스크립트 언어로 함수 등을 작성하면, 브라우저가 HTML 과 SCRIPT 를 읽어서 실행했다.
    - 어떻게 보면, 자바스크립트는 HTML 에 `종속적`이었다고 볼 수 있다.
  - Node.js 가 등장함에 따라, 자바스크립트는 브라우저나 HTML 의 종속성에서 벗어나게 되었다.

> 노드 이전에도 자바스크립트 런타임을 만들기 위한 많은 시도가 있었는데 엔진 속도 문제 때문에 실패하였다.

## 내부 구조

![node](https://user-images.githubusercontent.com/47518272/155958444-9f3905a6-66f1-4a36-85e0-12844f9d9325.png)

- __V8 엔진__
  - 오픈 소스 자바스크립트 엔진 -> 속도 문제 개선
- __libuv__
  - 노드의 특성인 이벤트 기반, 논블로킹 I/O 모델을 구현한 라이브러리

> 내부는 C or C++ 로 만들어졌다.

## 노드의 특성

- __이벤트 기반__
  - 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식
    - Ex. 클릭, 네트워크 요청, 타이머 등
  - `이벤트 리스너` : 이벤트를 등록하는 함수
  - `콜백 함수` : 이벤트가 발생했을 때 실행될 함수
  - ![nodeevent](https://user-images.githubusercontent.com/47518272/155959104-0924405f-d2b1-434d-add1-74528258294c.png)
- __논 블로킹 I/O__
  - 오래 걸리는 함수를 백그라운드로 보내서 다음 코드가 먼저 실행되게 하고, 나중에 오래 걸리는 함수를 실행
  - 논 블로킹 방식 하에서 일부 코드는 백그라운드에서 병렬로 실행됨
  - 일부 코드: I/O 작업(파일 시스템 접근, 네트워크 요청), 압축, 암호화 등
  - 나머지 코드는 블로킹 방식으로 실행됨
  - I/O 작업이 많을 때 노드 활용성이 극대화
  - ![blocking](https://user-images.githubusercontent.com/47518272/155965468-cf138fee-9451-4fb4-8ffa-06e5da854183.png)
- __프로세스와 스레드__
  - 노드 프로세스는 멀티 스레드이지만 `직접 다룰 수 있는 스레드는 하나`이기 때문에 `싱글 스레드`라고 표현
  - 노드는 주로 멀티 프로세스를 활용
    - 노드 14 부터 멀티 스레드 사용 가능
  - `싱글 스레드라 주어진 일을 하나밖에 처리하지 못함`
  - 블로킹이 발생하는 경우 나머지 작업은 모두 대기해야 함 -> 비효율 발생

## 노드의 역할

### 서버로서의 노드

- __노드 서버의 장단점__
  - ![noderole](https://user-images.githubusercontent.com/47518272/155966986-7f3e15ca-fa8f-4b87-917e-7a23f73dc5d3.png)
  - CPU 작업을 위해 AWS Lambda 나 Google Cloud Functions 같은 별도 서비스 사용
  - 페이팔, 넷플릭스, 나사, 월마트, 링크드인, 우버 등에서 메인 또는 서브 서버로 사용

## 서버 외의 노드

- __웹 모바일, 데스크탑 애플리케이션에서도 사용__
  - 웹 프레임워크: Angular, React, Vue, Meteor 등
  - 모바일 앱 프레임워크: React Native
  - 데스크탑 개발 도구: Electron(Atom, Slack, VSCode, Discord 등 제작
  - 위 프레임워크들이 노드 기반으로 동작함

## 노드 설치

- __윈도(10 기준), 맥(카탈리나 기준)__
  - https://nodejs.org 접속
  - LTS는 안정된 버전, Current는 최신 버전(실험적)
  - ![nodeinstall](https://user-images.githubusercontent.com/47518272/155970433-1ded16a3-7548-41bc-9cad-8da09e036bee.png)
- __리눅스(우분투 18 LTS 기준)__
  - ![nodelinux](https://user-images.githubusercontent.com/47518272/155970447-91dfaef7-5c8f-484a-99a7-b1202ba434df.png)
- __설치 확인__
  - `node -v`
  - `npm -v`
  - npm 버전 업데이트 방법(맥과 리눅스는 앞에 sudo 입력)
    - `npm install -g npm`

## JS 호출스택

![javascriptcallstack](https://user-images.githubusercontent.com/47518272/155972402-60ece306-26c8-4e41-bfa8-3d2d15ccc696.png)

- Anonymous 는 가상의 전역 컨텍스트(항상 있다고 생각하는게 좋음)
  - 함수 호출 순서대로 쌓이고, 역순으로 실행됨
  - 함수 실행이 완료되면 스택에서 빠짐
  - LIFO 구조라서 스택이라고 불림

> JS 와 Node 의 동작은 `Call Stack, Background, Task Queue` 만 기억하면된다.
> 
> Call Stack 부분만 자바스크립트 언어이고, Background, Task Queue 는 C, C++ 과 같은 다른 언어로 만들어져 있다. 이 부분은 자바스크립트 엔진이 알아서 처리해주는 것이다.

## JS 이벤트 루프

```javascript
function run() {
  console.log('3초 후 실행');
}
console.log('시작');
setTimeout(run, 3000);
console.log('끝');
```

![javascripteventloop](https://user-images.githubusercontent.com/47518272/155972663-20c20733-e532-490f-b1ff-d09eb5385560.png)

![javascripteventloop2](https://user-images.githubusercontent.com/47518272/155973003-b6ad4f64-3386-4f4e-9d39-f17576788c2a.png)

![javascripteventloop3](https://user-images.githubusercontent.com/47518272/155973372-f39c18a2-ec43-4ce9-9d9c-694ffc39a36c.png)

- __이벤트 루프__
  - 이벤트 발생(setTimeout 등)시 호출할 콜백 함수들(위의 예제에서는 run)을 관리하고, 호출할 순서를 결정하는 역할
  - `Task Queue` : 이벤트 발생 후 호출되어야 할 콜백 함수들이 순서대로 기다리는 공간
  - `Background` : 타이머나 I/O 작업 콜백, 이벤트 리스너들이 대기하는 공간, 여러 작업이 동시에 실행될 수 있음
  - setTimeout과 anonymous가 실행 완료된 후 `호출 스택(Call Stack)`이 완전히 비워지면, 이벤트 루프가 Task Queue 의 콜백을 호출 스택으로 올림
    - 호출 스택이 `비워져야만` 올림
    - 호출 스택에 함수가 많이 차 있으면 그것들을 처리하느라 3초가 지난 후에도 run 함수가 태스크 큐에서 대기하게 됨 -> `타이머가 정확하지 않을 수 있는 이유`
  - run 이 호출 스택에서 실행되고, 완료 후 호출 스택에서 나감
    - 이벤트 루프는 Task Queue 에 다음 함수가 들어올 때 까지 대기
    - Task Queue 는 실제로 여러 개고, Task Queue 들과 함수들 간의 순서를 이벤트 루프가 결정함

### async 내 동기 코드와 비동기 코드

```javascript
fun async() {
  const { ... } = blahblah
  
  // 동기
  const { a, b } = findClosedDate()
  
  // 비동기
  await DB.User.save()
  await DB.User.blahblah()

}
```

- await 은 비동기 함수 내에서 비동기 작업을 순차적으로 처리하기 위해 사용
- 동기 코드는 백그라운드에 들어가지 않고 호출 스택에서 먼저 처리된다.
  - Ex. 동기 코드 : 폐업일 날짜를 계산하는 로직 등

### Example

다음 코드가 어떻게 동작할지 `Call Stack, Background, Task Queue` 를 그리면서 확인해보자.

```javascript
function oneMore() {
  console.log('one more');
}

function run() {
  console.log('run run');
  setTimeout(() => {
    console.log('wow');
  }, 0);
  new Promise((resolve) => {
    resolve('hi');
  }).then(console.log);
  oneMore();
}

setTimeout(run, 5000);
```

- Call Stack 맨 아래에 anonymous 가 깔린다.
- setTimeout 이 Call Stack 에 쌓이고, 실행되면서 콜백함수를 Background 에 올린다.
- Call Stack 이 전부 비워지고, TaskQueue 에 있던 콜백함수(run())을 Call Stack 에 올린다.
- console.log('run run') 이 Call Stack 에 쌓이고 바로 실행되면서 콘솔창에 run run 을 찍는다.

> 현재 Call Stack 모습

```
// Call Stack
run
```

- setTimeout(익명, 0) 이 Call Stack 에 쌓이고, 실행 되면서 콜백함수를 Background 에 올린다.
- new Promise 가 Call Stack 쌓인다. 내부가 동기이므로 resolve('hi')가 같이 Call Stack 에 쌓이면서 실행된다.
  - Promise 는 내부 코드 까지는 동기이며, `then` 을 만나는 순간 비동기로 된다.

> 현재 Call Stack 모습

```
// Call Stack
resolve('hi')
new Promise
run
```

- resolve 와 new Promise 가 끝나고, then 이 비동기이므로 console.log('hi') 가 Background 에 쌓인다.

> 현재 Background 모습

```
// Background
타이머(익명, 0)
then console.log('hi')
```

- 그 다음 oneMore 가 Call Stack 에 쌓이고 실행 되면서 Call Stack 에는 run 만 남게된다.
- 마지막 남은 run 도 Call Stack 에서 실행 되면서 빠져나간다.

> 백그라운드에는 2개의 작업이 들어있으며, 어떤 것이 먼저 실행될지는 모른다. 백그라운드 작업이 먼저 끝난애가 `Task Queue` 에 먼저 들어간다.

- 먼저 실행 된 애가 먼저 Task Queue 에 들어가있다고 가정하자. (즉, console.log('wow') - console.log('hi'))
- 그런데, Promise 가 `새치기`를 해서(then 이 Timer 보다 우선순위가 높아서), Timer 보다 먼저 Call Stack 에 쌓이고 실행된다.
  - __Promise 의 then/catch or process.nextTick 은 Timer 보다 우선순위가 높아서 Task Queue 에서 새치기를 한다.__

> 최종 출력 결과는 다음과 같다.

```
run run
one more
hi
wow
```

