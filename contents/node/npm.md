# Node Package Manager

- __npm 이란?__
  - 노드의 패키지 매니저
  - 다른 사람들이 만든 소스 코드들을 모아둔 저장소
  - 남의 코드를 사용하여 프로그래밍 가능
  - 이미 있는 기능을 다시 구현할 필요가 없어 효율적
  - 오픈 소스 생태계를 구성중 
- __패키지__
  - npm 에 업로드된 노드 모듈
  - 모듈이 다른 모듈을 사용할 수 있듯 패키지도 다른 패키지를 사용할 수 있음
  - 의존 관계라고 부름

## pakcage.json

- __현재 프로젝트에 대한 정보와 사용 중인 패키지에 대한 정보를 담은 파일__
  - 같은 패키지라도 버전별로 기능이 다를 수 있으므로 버전을 기록해두어야 함
  - 동일한 버전을 설치하지 않으면 문제가 생길 수 있음
  - 노드 프로젝트 시작 전 package.json부터 만들고 시작함(npm init)

![packagejson](https://user-images.githubusercontent.com/47518272/156720786-85f4cd26-2f97-41bd-8e95-b4b4450ed47d.png)

- __속성__
  - `package name`
    - 패키지의 이름, package.json 의 name 속성에 저장
  - `version`
    - 패키지의 버전
  - `entry point`
    - 자바스크립트 실행 파일 진입점
    - 보통 마지막으로 module.exports 를 하는 파일을 지정
    - package.json 의 main 속성에 저장됨
  - `test command`
    - 코드를 테스트할 때 입력할 명령어를 의미
    - package.json scripts 속성 안의 test 속성에 저장
  - `git repository`
    - 코드를 저장해둔 Git 저장소 주소를 의미
    - 나중에 소스에 문제가 생겼을 때 사용자들이 이 저장소에 방문해 문제를 제기할 수도 있고 코드 수정본을 올릴 수도 있다.
    - package.json 의 repository 속성에 저장됨
  - `keywords`
    - 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 해준다.
  - `license`
    - 해당 패키지의 라이선스를 넣어주면 된다.

## npm 스크립트

- __npm init 이 완료되면 폴더에 `package.json` 이 생성됨__
  - ![packagejson2](https://user-images.githubusercontent.com/47518272/156721407-a5226d26-1fd1-4e62-a5f4-80c6703fac88.png)
- __npm run 스크립트명으로 스크립트 실행__
  - ![npmrun](https://user-images.githubusercontent.com/47518272/156721597-f05ca99c-5943-4851-90be-53ff6ca49ca6.png)

## 패키지 설치하기

- __express 설치하기__
  - ![express](https://user-images.githubusercontent.com/47518272/156721705-1df3c150-eb15-4f06-bfef-4b61819e7fbe.png)
- __package.json에 기록됨(dependencies에 express 이름과 버전 추가됨)__
  - ![packagejson3](https://user-images.githubusercontent.com/47518272/156722422-bc0d00d7-3994-42f1-a0bc-6dcb6b6924fd.png)

## node_modules

- __npm install 시 node_modules 폴더 생성__
  - 내부에 설치한 패키지들이 들어 있음
  - express 외에도 express 와 의존 관계가 있는 패키지들이 모두 설치됨
  - node_moduels 는 용량이 커서 배포할때는 안들고감.(package.json 만 들고감) 그리고 배포 후 `npm -i` 를 쳐서 다시 설치함
    - 폐쇄망의 경우에는 node_modules 를 들고가야함
- __package-lock.json 도 생성되어 패키지 간 의존 관계를 명확하게 표시함__

![nodemodules](https://user-images.githubusercontent.com/47518272/156722590-bc388f12-2d3e-47a4-9b03-d3ba2bb12837.png)

## 여러 패키지 동시 설치하기

- __npm install 패키지1 패키지2 패키지3 …__
  - ![npmpackage](https://user-images.githubusercontent.com/47518272/156722745-f3b608bd-ddee-484e-8c66-3729ab5dc455.png)

## 개발용 패키지

- __npm install --save-dev 패키지명 또는 `npm i -D 패키지명`__
  - devDependencies에 추가됨
  - ![npmdev](https://user-images.githubusercontent.com/47518272/156722878-bc785918-9406-4973-8718-d010324fb8c1.png)

## 글로벌(전역) 패키지

- __npm install --global 패키지명 또는 `npm i -g 패키지명`__
  - 모든 프로젝트와 콘솔에서 패키지를 사용할 수 있음
  - 예제는 rm –rf(리눅스의 삭제 명령)를 흉내내는 `rimraf` 패키지의 글로벌 설치
  - npx 로 글로벌 설치 없이 글로벌 명령어 사용 가능
  - 글로벌 설치를 하게 되면 `package.json`에 적히지 않기 때문에 기피하는게 좋다.
    - `npm -i rimraf -D` 이런식으로 설치하는 것을 권장
    - 그리고 rimraf 를 글로벌 명령어로 쓰기 위해선 `npx` 를 사용해야 한다.
      - `npx rimraf node_modules` 이렇게 사용하면 된다.
  - ![npmglobal](https://user-images.githubusercontent.com/47518272/156723006-18b32d63-31cc-46e4-9c87-6065bb474fa5.png)

## SemVer 버저닝

- 각 버전은 `package-lock.json`에 있다.
- __노드 패키지의 버전은 SemVer(유의적 버저닝) 방식을 따름__
  - Major(주 버전), Minor(부 버전), Patch(수 버전)
  - 노드에서는 배포를 할 때 항상 버전을 올려야 함
  - Major 는 하위 버전과 호환되지 않은 수정 사항이 생겼을 때 올림
  - Minor 는 하위 버전과 호환되는 수정 사항이 생겼을 때 올림
  - Patch 는 기능에 버그를 해결했을 때 올림
  - ![semver](https://user-images.githubusercontent.com/47518272/156726895-7a62dea7-705c-49fe-be31-3301cab35ee0.png)
- `자리 고정`
  - `^1.19.0` 은 첫 번째 자리는 무조건 일치해야한다는 의미이다. 
  - `~1.19.0` 은 두 번째 자리까지는 무조건 일치해야한다는 의미이다. (거의 잘 안씀)
  - `1.19.0` 아무것도 안적으면 세 번째 자리까지 일치해야한다는 의미이다.
  - 보통은 `^` 를 많이 사용한다.
  - ![semver2](https://user-images.githubusercontent.com/47518272/156727610-9e6ac952-832c-4cbe-8d23-59794d3d5a7a.png)

## 기타 명령어

- __npm outdated__
  - 어떤 패키지에 기능 변화가 생겼는지 알 수 있음
  - ![npmoutdated](https://user-images.githubusercontent.com/47518272/156871054-3db4e191-5b16-4ada-9532-f4b425fcfb79.png)

- __npm uninstall 패키지명__
  - 패키지 삭제(npm rm 패키지명으로도 가능)
- __npm search 검색어__
  - npm 패키지를 검색할 수 있음(npmjs.com 에서도 가능)
- __npm info 패키지명__
  - 패키지의 세부 정보 파악 가능
- __npm adduser__
  - npm 에 로그인을 하기 위한 명령어(npmjs.com 에서 회원가입)
- __npm whoami__
  - 현재 사용자가 누구인지 알려줌
- __npm logout__
  - 로그인한 계정을 로그아웃
- __npm version 버전__
  - package.json 이ㅡ 버전을 올림

## npm 배포하기

- Node.js 교과서 5장 


