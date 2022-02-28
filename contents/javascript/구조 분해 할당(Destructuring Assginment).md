# 구조 분해 할당(Destructuring Assginment)

![destructuring](https://user-images.githubusercontent.com/47518272/155981734-20544dd5-5fcd-4b44-91c6-7a984332411c.png)

- __var getCandy 와 var count 주목__
  - candyMachine 부터 시작해서 속성을 찾아 들어가야 함
  - this 를 사용 중이면 구조분해 할당을 하지 않는 것이 좋음

![destructuring2](https://user-images.githubusercontent.com/47518272/155981909-4595a20e-b6c4-4db7-b490-c8f95f2e46b6.png)

- __const `{ 변수 }` = 객체; 로 객체 안의 속서을 변수명으로 사용 가능__
  - 단, getCandy() 를 실행했을 때 결과가 candyMachine.getCandy() 와는 달라지므로 주의
  - count 처럼 속성 안의 속성도 변수명으로 사용 가능

![destructuring3](https://user-images.githubusercontent.com/47518272/155982108-39cd0145-c2c1-480d-9344-ae02cd048591.png)
