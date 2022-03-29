# splice

기존 배열을 변경시키고, 새로운 배열을 반환한다.

## 사용 예

```javascript
 private static createPayload(users: any) {
    const payloadChunkSize = 10000
    const payload = []

    let phones = users.map(user => user.phone ? user.phone : 'NOT_EXIST_PHONE_NUMBER')
    while(phones.length > 0) {
        // phones 배열의 크기가 0 이 될 때 까지, 0 ~ payloadChunkSize 만큼 자른다.
        // phones size 가 1 ~ 15000 이라고 하면 0 ~ 9999 까지 자르고, phones 의 size 는 5000 이 된다.
        // 그리고 남은 5000 개를 자르게 된다.
        // phonesChunk 에는 잘린 배열이 담겨져 있다.
        const phonesChunk = phones.splice(0, payloadChunkSize)
        payload.push(phonesChunk)
    }

    return payload 
}
```
