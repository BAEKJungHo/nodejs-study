# Event Loop

## 브라우저 동작 원리

- __크롬, 오페라, 파이어폭스 등 브라우저는 자바스크립트 실행해주는 애들임__
- __어떻게 실행되냐?__
  - Stack, Queue, Event Loop 라는 개념을 알아야함
  - Stack 은 하나 밖에 없어서 보통 자바스크립트는 `Single Threaded` 라고 부름
  - 정확히는 `Call Stack, Background, Task Queue` 라는 세 가지 공간이 존재함
  - Background 로 보내는 코드들은 Ajax 요청 코드, 이벤트리스너라고 생각하면 된다. 즉, `기다림이 필요한 코드`들은 Background 로 들어간다.
  - Task Queue 는 대기가 끝난 코드들이 들어간다.
  - 그리고 Task Queue 가 Stack 에 올라가는데, Stack 이 비어있을 때만 올라간다.
- __Example__
  - 가끔 for 반복문을 쓰는데, 천만번 돌리면 오래 걸림 -> 이런거 자바스크립트로 시키면 큰일남 -> Stack 에서 N 초간 실행되기 때문에 Single Threaded 환경인 자바스크립트에서 Stack 에서 N 초가 걸리면 다른 작업들을 처리할 수 없음
- __교훈__
  - Stack 을 바쁘게 만들지 말라
  - Stack 내부는 빠르게 빠르게 처리되어야 한다.
  - Queue 를 바쁘게 하지 말라
- __자바스크립트는 원래 동기적으로 처리__
  - `동기적` -> 한 번에 한 줄씩 순서대로 처리 (Stack 은 하나니까)
  - 자바스크립트는 `비동기적`인 처리도 가능
    - 즉, 시간이 걸리는 작업들(setTimeout, 이벤트 리스너 등)을 비동기적으로 처리

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
