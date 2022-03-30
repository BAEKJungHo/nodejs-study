# Promise

> 노드의 생태계가 Call back 에서 Promise 로 바뀌고 있어서 필수로 알아야하는 개념이다.
> 
> 비동기는 항상 실패할 가능성을 염두해두어야 하기 때문에 에러 핸들링이 필수이다.

- __콜백 헬이라고 불리는 지저분한 자바스크립트 코드의 해결책__
  - `내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체`
  - `코드를 분리할 수 있는 장점이 있음`
    - Promise 의 결과를 변수에 저장해뒀다가 원할때 처리하면 되기 때문에
    - ```javascript
      const promise = setTimeoutPromise(3000);
      console.log('딴짓');
      promise.then(() => {
        console.log('지금 할래');
      });
      ```
  - Then 을 붙이면 결과를 반환함
  - Then 을 만나기 전까지의 내부 코드는 동기 방식, Then 을 만나면 비동기 방식
  - 실행이 완료되지 않았으면 완료된 후에 Then 내부 함수가 실행됨
  - `Resolve(성공리턴값)` -> then으로 연결
  - `Reject(실패리턴값)` -> catch로 연결
  - `Finally` 부분은 무조건 실행됨

![promise](https://user-images.githubusercontent.com/47518272/155984928-4b198ce8-9eef-445c-992c-144eaa8d34b8.png)

- const promise 는 Promise 의 내부 코드의 결과를 저장하는 변수.
- 결과를 담은 변수에 대해 처리를 원할 때, then 이나 catch 를 붙여서 처리할 수 있다.

## Promise Chaining

- __프로미스의 then 연달아 사용 가능(프로미스 체이닝)__
  - then 안에서 return 한 값이 다음 then 으로 넘어감
  - return 값이 프로미스면 resolve 후 넘어감
  - 에러가 난 경우 바로 catch로 이동
  - 에러는 catch 에서 한 번에 처리

![promise2](https://user-images.githubusercontent.com/47518272/155985130-859eb83e-11c5-4222-bb97-7d79176321f5.png)

- __Promise.resolve(성공리턴값) : 바로 resolve 하는 프로미스__
- __Promise.reject(실패리턴값) : 바로 reject 하는 프로미스__

```javascript
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

- __Promise.all(배열) : 여러 개의 프로미스를 동시에 실행__
  - 하나라도 실패하면 catch 로 감
  - [allSettled](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) 로 실패한 것만 추려낼 수 있음
  - allSettled 가 실무에서 사용되는 최신 스타일
  - Promise.allSettled는 안정된 메소드로 하나가 실패하더라도 모든 promise 들의 결과를 받을 수 있으며 status 값에 따라 잘 분기처리 해주면 된다. 하나가 실패하더라도 다른 값들은 사용해야할 때 사용하면 좋다.

```javascript
// all() 은 promises 중 하나라도 실패하면 catch 로 빠진다.
Promise.all([promise1, promise2, promise3])
  .then((result) => console.log(result))
  .catch((e) => console.error(e));
```
```javascript
// allSettled() 는 promises 중 실패한 결과가 있더라도 catch 로 빠지지 않는다.
// 상태 값에 따라 분기처리를 할 수 있다.
Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  results.forEach((result) => {
    console.log(result);
  });
});
```

![allsettled](https://user-images.githubusercontent.com/47518272/155989199-31f67ba8-e1ac-4973-94cc-c89571dbe48f.png)

# async/await

> async 는 발음 기호상 에이싱크라고 부르는게 맞다. ajax 도 에이작스이다. await 은 어웨잇이 맞다.

- __`변수 = await 프로미스;` 인 경우 프로미스가 resolve 된 값이 변수에 저장__
- __`변수 await 값;` 인 경우 그 값이 변수에 저장__
- __await 이 `then` 역할이라고 생각하면 됨__
- __실행 순서는 오른쪽에서 왼쪽__
  - `let user = await Users.findOne({});`
  - 기존의 then 을 사용하던 경우의 실행 순서는 왼쪽에서 오른쪽
- __await 을 사용하기 위해서는 함수를 만들고 prefix 로 async 를 같이 써야 한다.__
  - 요즘은 `top level await` 이라는 개념이 등장해서 아래와 같이 사용할 수도 있다.
  - ```javascript
    // 기존
    async function blahblah() {
      const result = await promise;
    }
    
    // top level await
    const result = await promise;
    ```

- __async 함수에서 return 하는 경우에는 then or await 으로 받아야 한다.__

```javascript
async function main() {
  const result = await promise;
  return 'zerocho';
}

main().then((name) => ...)

or

const name = await main()
```

- __async/await__    
    
```javascript
async function findAndSaveUser(User) {
  let user = await Users.findOne({});
  user.name = 'zero';
  user = await user.save();
  user = await Users.findOne({gender : 'm'});
  // 생략
}
```

- __각각의 프로미스 에러 처리를 위해서는 각각을 try catch 로 감싸주어야 함__
  - async/await 이 기존의 promise/then 과 똑같지만 reject 가 없어서 try catch 로 감싸서 에러를 처리해야 함

```javascript
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gender : 'm'});
    // 생략
  } catch (error) {
    console.error(error);
  }
}
```

- __화살표 함수도 async/await 가능__

```javascript
const findAndSaveUser = async (Users) => {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gender : 'm'});
    // 생략
  } catch (error) {
    console.error(error);
  }
}
```

- __async 함수는 항상 promise 를 반환__
  - then 이나 await 을 붙일 수 있음

```javascript
async function findAndSaveUser(Users) {
  // 생략
}
```

```javascript
findAndSaveUser().then(() => {
  /* 생략 */
});

or

async function other() {
  const result = await findAndSaveUser();
}
```

## for await of

- 노드 10 부터 지원
- `for await(변수 of 프로미스 배열)`
  - resolve 된 프로미스가 변수에 담겨 나옴
  - await 을 사용하기 때문에 async 함수 안에서 해야 함
  
![async](https://user-images.githubusercontent.com/47518272/155986537-b9cfb692-2ec9-4f9d-9f2b-7fe9e512f1f4.png)

## Example

```javascript
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});
```

위 코드는 서버에서 제대로 응답을 받아오면 resolve() 메서드를 호출하고, 응답이 없으면 reject() 메서드를 호출하는 예제이다. 호출된 메서드에 따라 then()이나 catch()로 분기하여 응답 결과 또는 오류를 출력다.

## References

- https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
- https://nodejs.dev/learn/understanding-javascript-promises#consuming-a-promise
