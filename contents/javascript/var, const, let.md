# var, const, let

- __ES2015 이전에는 var 로 변수를 선언__
- __var, const, let 과 의 차이점__
  - var 은 함수 스코프, const 와 let 은 함수 및 블록(`{}`)에도 별도의 스코프를 갖는다.
  - ```javascript
    // var
    if (true) {
      var x = 3;
    }
    console.log(x); // 3
    
    // const
    if (true) {
      const y = 3;
    }
    console.log(y); // Uncaught ReferenceError: y is not defined
    ```
- __const 는 상수__
  - 따라서, 값의 재할당이 불가능
  - ```javascript
    const a = 0;
    a = 1; // Uncaught TypeError: Assignment to constant variable
    
    const c; // Uncaught SyntaxError: Missing initializer in const declaration
    ```
  - 상수에 할당한 값은 다른 값으로 변경 불가
  - 변경하고자 할 때는 let 으로 변수 선언
  - 상수 선언 시부터 초기화가 필요함
  - 초기화를 하지 않고 선언하면 에러
