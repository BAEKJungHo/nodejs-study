# 라우팅

- https://expressjs.com/ko/guide/routing.html
- https://expressjs.com/ko/guide/writing-middleware.html
- https://expressjs.com/ko/guide/using-middleware.html

## app.use vs app.get 

- https://www.inflearn.com/questions/383198

> app.use는 라우터 용도로 안 쓰시는 게 좋습니다. get, post, put, patch 등 모든 메서드에 다 적용하려면 app.all이 있습니다.
>
> app.use는 /about으로 했을 경우 /about과 /about/:id 모두 app.use를 탑니다. 반면 라우터인 app.get은 정확히 일치하는 것만 탑니다. 그래서 app.use를 했을 때 res.end가 두 번 호출되어 cannot set headers 에러가 발생한 겁니다. 
> 
> __app.use는 라우터들의 공통 로직을 분리하는 용도로 사용하는 겁니다.__
>
> 그리고 res.end 다음에는 함부로 next 붙이면 안 됩니다. res.end는 응답 종료로 그 다음에 나올 코드는 없습니다. 다음 미들웨어로 가서 또 응답을 보내면 안 됩니다.
