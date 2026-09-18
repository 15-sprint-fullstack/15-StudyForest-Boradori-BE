# **{4팀}**

(팀 협업 문서 링크 게시)

## **팀원 구성**

권다운 ([개인 Github 링크](https://github.com/T-Lime))

김숙연 (개인 Github 링크)

이승현 (https://github.com/MonsteraforCoding)

이지우 (개인 Github 링크)

정호영 (개인 Github 링크)

---

## **프로젝트 소개**

- 개인 공부 관리 및 커뮤니티 서비스 “공부의 숲”
- 프로젝트 기간: 2026.09.01 ~ 2026.09.17

---

## **기술 스택**

- Frontend: JavaScript, React.js ...
- Backend: Express.js, PrismaORM ...
- Database: ?
- 공통 Tool: Git & Github, Discord, zep, ...

---

## **팀원별 구현 기능 상세**

### 권다운(팀장)

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- Study API 명세 작성
- Study repository
- Study CRUD

### 김숙연

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **Nav**
    - 회원별 버튼 조건부 렌더링(학생: 커리어, 스킬, 수강후기, 커뮤니티, 관리자: 회원 관리 관리자 페이지)
    - 반응형 레이아웃 구현
- **메인페이지**
    - fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
- **공용 Modal 컴포넌트**
    - 공용으로 사용할 Modal 컴포넌트 구현

### 이승현

- 습관 레포지토리, 라우터, 검증 미들웨어 작성
- 습관 기록 삭제 라우터 수정
- 습관 기록 검증 미들웨어 수정
- 시드 코드 수정

### 이지우

## 기본 설정 - prisma / error-handler / cors 설정

### error-handler

- JSON 파싱 오류
- HTTP Exception 오류
- Prisma 오류
    
    P2002 / P2003 / P2025 오류 감지
    
- req.body 형식 에러

### req.body 검증

schemas 폴더 내에 있는 것들.

zod 사용해 body 에 필수적인 값과 제한점들을 설정해둠.

이에 맞지 않으면 위에 있는 error-handler에 걸려 전송됨.

## 이모지 부분

### 생성 및 추가

createOrIncreaseCount 로 사용해,

이모지가 없는 경우엔 생성

이모지가 있는 경우엔 count + 1 update 하는 구조로 되어 있음.

### 삭제 및 감소

count가 1보다 작으면 삭제

그것이 아니라면 감소하는 구조로 죄어 있음

### 트랜잭션

a가 count 추가 (count : 1)

b가 count 삭제 (count : 0 삭제) 

이런 상황이 동시에 발생하는 경우를 방지.

트랜잭션이 일어나야 하는 순간 : 두 개의 상황이 서로 순서가 바뀌었을 떄 서로의 값이 다르면 발생

1. a가 먼저 발생
    
    a : count 가 없는 경우, count 1로 생성
    
    b : count 1감소로, count 값을 삭제
    
    ⇒ 이모지 삭제되어 있음.
    
2. b가 먼저 발생
    
    b : 애초에 없으니 실행 x
    
    a : count가 없으니 count 1로 생성
    
    ⇒ 이모지 생성되어 있음.
    

이런 상황을 감지하는 코드

`isolationLevel: 'Serializable',`

시도횟수를 3번까지 설정해, 동시에 접근되는 상황을 피해서 처리함.

## 인증 관련

## bcrypt - hash.utils.js

비밀번호 값이 생성된 경우 (studies 쪽 post)

비밀번호 값이 들어와 인증을 위해 비교가 필요한 경우

에 사용되고 있다.

## session ID

https://github.com/15-sprint-fullstack/15-StudyForest-Boradori-BE/pull/35#issue-5446592537

### jwt 와 session ID 간의 차이

JWT 의 토큰 방식에는 id 와 만료 시간 등의 정보가 담겨져 있다.

하지만 session ID에는 그런 만료시간 등이 아닌 id만 담겨져 있다.

둘의 가장 큰 차이점은 어떤 검증에 있어 클라이언트가 주가 되서 작업되는 가가 다르다.

jwt는 검증에 대한 정보를 다 담고 있기 때문에 클라이언트 쪽에서 토큰을 관리하게 된다는 특징이 있다.

그렇기에 서버의 부하가 적게 된다.

session ID 는 이에 대한 것이 없고, 서버에서만 관리되어 클라이언트 쪽에서 정보 변경이 어렵다는 특징이 있다.

!image.png

관련해서 읽었던 것

https://velog.io/@chhw130/%EB%A1%9C%EA%B7%B8%EC%9D%B8%EB%B0%A9%EC%8B%9D%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0session-ID-Token%EB%B0%A9%EC%8B%9D

## 기타 작업 내용

- study validate 작성

### 정호영

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **관리자 페이지**
    - fetch(GET)를 사용하여 학생별 시간 정보 표시 및 수강생 접속 현황 정보 표시
    - 반응형 레이아웃 구현
- **마이 페이지**
    - fetch(PATCH, DELETE)를 사용하여 수강생의 개인정보 수정 및 탈퇴 기능 구현
- **공용 Modal 컴포넌트**
    - 공용으로 사용할 Modal 컴포넌트 구현

---

## **파일 구조**

```

src
 ┣ client
 ┃ ┣ __mocks__
 ┃ ┃ ┣ courses.json
 ┃ ┃ ┗ index.ts
 ┃ ┣ features
 ┃ ┃ ┣ Layout
 ┃ ┃ ┃ ┣ images
 ┃ ┃ ┃ ┃ ┗ codeit-logo-purple.svg
 ┃ ┃ ┃ ┣ Layout.module.scss
 ┃ ┃ ┃ ┣ Layout.stories.tsx
 ┃ ┃ ┃ ┣ Layout.tsx
 ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┗ LessonSearch
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ CourseResult
 ┃ ┃ ┃ ┃ ┃ ┣ CourseResult.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ CourseResult.tsx
 ┃ ┃ ┃ ┗ EmptyResult
 ┃ ┃ ┃ ┃ ┣ EmptyResult.module.scss
 ┃ ┃ ┃ ┃ ┣ EmptyResult.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┣ LessonSearch.module.scss
 ┃ ┃ ┣ LessonSearch.stories.tsx
 ┃ ┃ ┣ LessonSearch.tsx
 ┃ ┃ ┗ index.ts
 ┃ ┣ models
 ┃ ┃ ┣ course.d.ts
 ┃ ┃ ┗ react.d.ts
 ┃ ┣ shared
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┣ base.ts
 ┃ ┃ ┃ ┗ course.ts
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ Button
 ┃ ┃ ┃ ┃ ┣ Button.module.scss
 ┃ ┃ ┃ ┃ ┣ Button.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┣ CourseInfo
 ┃ ┃ ┃ ┃ ┣ CourseInfo.module.scss
 ┃ ┃ ┃ ┃ ┣ CourseInfo.stories.tsx
 ┃ ┃ ┃ ┃ ┗ CourseInfo.tsx
 ┃ ┃ ┃ ┣ Input
 ┃ ┃ ┃ ┃ ┣ Input.module.scss
 ┃ ┃ ┃ ┃ ┣ Input.stories.tsx
 ┃ ┃ ┃ ┃ ┣ Input.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┗ Select
 ┃ ┃ ┃ ┃ ┣ images
 ┃ ┃ ┃ ┃ ┃ ┗ triangle-dark.svg
 ┃ ┃ ┃ ┃ ┣ Select.module.scss
 ┃ ┃ ┃ ┃ ┣ Select.stories.tsx
 ┃ ┃ ┃ ┃ ┣ Select.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┗ helpers
 ┃ ┃ ┃ ┣ api
 ┃ ┃ ┃ ┃ ┣ __tests__
 ┃ ┃ ┃ ┃ ┃ ┣ base.test.ts
 ┃ ┃ ┃ ┃ ┃ ┣ helpers.test.ts
 ┃ ┃ ┃ ┃ ┃ ┗ wrapper.test.ts
 ┃ ┃ ┃ ┃ ┣ wrapper
 ┃ ┃ ┃ ┃ ┃ ┣ fetch.ts
 ┃ ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┣ base.ts
 ┃ ┃ ┃ ┣ error.ts
 ┃ ┃ ┃ ┣ helpers.ts
 ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┗ type.ts
 ┃ ┃ ┗ react-query.ts
 ┣ server
 ┃ ┣ controllers
 ┃ ┃ ┣ authController.ts
 ┃ ┃ ┗ userController.ts
 ┃ ┣ models
 ┃ ┃ ┣ userModel.ts
 ┃ ┃ ┗ courseModel.ts
 ┃ ┣ routes
 ┃ ┃ ┣ authRoutes.ts
 ┃ ┃ ┗ userRoutes.ts
 ┃ ┣ middleware
 ┃ ┃ ┣ authMiddleware.ts
 ┃ ┃ ┗ errorHandler.ts
 ┃ ┣ app.ts
 ┃ ┗ server.ts
 ┣ App.tsx
 ┣ _mixin.scss
 ┣ common.scss
 ┣ index.tsx
 ┣ react-app-env.d.ts
 ┣ reportWebVitals.js
 ┗ setupTests.js
```

---

## API 문서 (swagger)
https://one5-studyforest-boradori-be-c021.onrender.com/api-docs/

---

## **프로젝트 회고록**

(제작한 발표자료 링크 혹은 첨부파일 첨부)
