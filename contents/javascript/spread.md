# Spread

## 사용 예

```javascript
const animals = ['개', '고양이', '참새'];
const anotherAnimals = [...animals, '비둘기'];
console.log(animals);
console.log(anotherAnimals);
```

```javascript
const numbers = [1, 2, 3, 4, 5];
const spreadNumbers = [...numbers, 1000, ...numbers];
console.log(spreadNumbers); // [1, 2, 3, 4, 5, 1000, 1, 2, 3, 4, 5]
```

```javascript
for (let user of users) {
    user['point'] = points[index++]
}
````

위와 같은 코드를 아래 처럼 바꿀 수 있다.

```javascript
// immutable
// user 랑 idx 를 가지고 기존 user 에 들어있던 모든 속성 + point 속성을 새로 만들어서 배열로 반환한다.
const usersWithPoint = users.map((user, idx) => ({ ...user, point: points[idx] }))
```
