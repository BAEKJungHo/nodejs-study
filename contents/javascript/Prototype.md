# Prototype

```javascript
// 비슷한 Object 들을 쉽게 만들고 싶을때 이런 문법을 쓴다
function 기계() {
  // 복사된 Object 가 기본으로 가질 속성
  this.q = 'strike';
  this.w = 'snowball';
}

// 자식
var nunu = new 기계();
```

prototype 이라는 것을 써도 자식 object 에게 데이터를 물려줄 수 있다.

__prototype 은 `유전자`라고 이해하면 쉽다.__

```javascript
기계.prototype // 기계의 유전자
```

prototype 에 뭔가 추가하면 자식들이 사용 가능

> 유전자에 뭔가 추가하면 자식들이 사용 가능

```javascript
기계.prototype.name = 'Baek'

var nunu = new 기계();

console.log(nunu.name);
```

하지만 nunu 를 찍어보면 name 이라는 속성은 안나온다. 어떻게 nunu 에서 name 을 꺼내 쓸 수 있는 것일까?

동작원리를 살펴보자.

## 부모 유전자에 있는걸 자식이 사용 가능한 이유

- 직접 자료를 가지고 있으면 그거 출력
- 없으면 부모 유전자까지 뒤짐
- 없으면 부모의 부모 유전자를 뒤짐

> prototype chain 이라고 함

```javascript
nunu.name
```

1. nunu 가 name 을 가지고 있지 않으면
2. nunu 가 부모 유전자(prototype)을 뒤짐 거기에 name 이 있으면 출력

## Array 와 prototype

```javascript
// var 어레이 = new Array(3, 2, 1);
var 어레이 = [3, 2, 1];
어레이.sort();
```

어레이에 sort() 와 같은 함수를 붙일 수 있는 이유가 무엇일까?

실제로 컴퓨터는 `var 어레이 = new Array(3, 2, 1);` 이런식으로 이해한다. 따라서 new 키워드를 사용했으므로 prototype 을 사용할 수 있다.

```javascript
// 아래 문구 치면 Array 가 제공하는 함수들을 볼 수 있다.
Array.prototype 
```

### 모든 Array 자료에서 쓸 수 있는 함수 추가

```javascript
Array.prototype.커스텀함수 = function() {}
var 어레이 = [4, 2, 1];
어레이.커스텀함수();
```

