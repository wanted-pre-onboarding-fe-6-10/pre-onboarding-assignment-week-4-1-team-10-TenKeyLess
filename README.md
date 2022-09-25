# Wanted Pre-Onboarding 6차 10팀 TenKeyLess, december_and_company 기업과제

## 프로젝트 실행방법

```
git clone https://github.com/wanted-pre-onboarding-fe-6-10/pre-onboarding-assignment-week-4-1-team-10-TenKeyLess.git
cd pre-onboarding-assignment-week-4-1-team-10-TenKeyLess

- json server 시작(json server의 _expand 속성을 활용하기 위해 server 파일 일부 수정으로 해당 폴더에서 json server 구동 필요)
cd server
npm install
npm run gen
npm start

- react 프로젝트 시작
cd ..
yarn install
yarn start

- postman이나 기타 툴을 활용해서 http://localhost:4000/users/signup 으로 회원가입 진행 후 접속
```

## 🌏 배포링크

http://wanted610.s3-website.ap-northeast-2.amazonaws.com/

## 👋 팀원소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/HE-SW">
            <img src="https://avatars.githubusercontent.com/HE-SW" width="140px" /> <br>김한얼</a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/eazae">
            <img src="https://avatars.githubusercontent.com/eazae" width="140px" /> <br>신이재</a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/blackgar">
            <img src="https://avatars.githubusercontent.com/blackgar" width="140px" /> <br>윤관 </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/jihyun-jeon">
          <img src="https://avatars.githubusercontent.com/jihyun-jeon" width="140px" /> <br> 전지현</a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/Dev-jwJeong">
            <img src="https://avatars.githubusercontent.com/Dev-jwJeong" width="140px" /> <br>정재욱</a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/qkrwlstjd">
            <img src="https://avatars.githubusercontent.com/qkrwlstjd" width="140px" /> <br> 박진성 </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/seungyeonchoo">
            <img src="https://avatars.githubusercontent.com/seungyeonchoo" width="140px" /> <br> 추승연 </a> <br></td>
    </tr>
<tr>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center">팀장</td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
</table>
<br>

> ## 목차

- [프로젝트 개요](#프로젝트-개요)
- [폴더 구조](#폴더-구조)
- [기능별 설명 / Best Practice](#기능별-설명--best-practice)
- [미구현 내용](#미구현-내용)
- [회고](#회고)

<br>

> ## 프로젝트 개요

- december and company에서 제공한 json server을 활용한 admin 서비스 구현
- 권한 있는 사용자만 이용할 수 있는 서비스로 계좌 목록 데이터와 사용자 데이터를 활용해 계좌목록, 사용자 목록, 계좌 상세, 사용자 상세 정보를 확인할 수 있는 서비스 구현

> ## 기술 Stack

- React
- Typescript
- tailwindcss
- craco

- <br>

> ## 폴더 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜FilterBar.tsx
 ┃ ┃ ┗ 📜SearchBar.tsx
 ┃ ┣ 📂footer
 ┃ ┃ ┗ 📜Footer.tsx
 ┃ ┣ 📂header
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┗ 📂sidebar
 ┃ ┃ ┗ 📜sidebar.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useMutation.tsx
 ┣ 📂lib
 ┣ 📂pages
 ┃ ┣ 📂AccountDetail
 ┃ ┃ ┗ 📜AccountDetail.tsx
 ┃ ┣ 📂Accounts
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜AccountSearch.tsx
 ┃ ┃ ┃ ┣ 📜AccountTable.tsx
 ┃ ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┃ ┗ 📜Accounts.tsx
 ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜AuthInput.tsx
 ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┗ 📜SignUp.tsx
 ┃ ┣ 📂UserDetail
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜UserAccountList.tsx
 ┃ ┃ ┃ ┗ 📜UserInfoTable.tsx
 ┃ ┃ ┗ 📜UserDetail.tsx
 ┃ ┣ 📂Users
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜UserSearch.tsx
 ┃ ┃ ┃ ┗ 📜UsersTable.tsx
 ┃ ┃ ┗ 📜Users.tsx
 ┃ ┗ 📜Pages.tsx
 ┣ 📂utils
 ┃ ┣ 📜constant.ts
 ┃ ┗ 📜utils.tsx
 ┣ 📜App.tsx
 ┣ 📜atoms.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜Router.tsx
```

> ## 기능별 설명 / Best Practice

- json server의 경우 \_expand 속성을 활용하기 위해 generateData.ts 파일에서 user_id 부분을 userId로 수정
- CORS 에러를 해결하기 위해 cors 라이브러리를 install한 다음 server.ts에 적용

> ### 필수 기능

  <details>
    <summary>1. 로그인 </summary>

    1. POSTMAN으로 회원가입을 진행한 후 등록되어 있는 email과 password로 로그인 하도록 구현
    2. 로그인 후 반환되는 accessToken을 Recoil로 저장하고 recoil-persist로 로컬 스토리지에 저장해서 새로고침해도 로그인이 유지되도록 구현

  </details>

  <details>
    <summary>2. 계좌 목록 </summary>

    1. table 태그로 계좌 목록을 받아온 다음 보여줄 수 있도록 구현
    2. data는 json server의 expand 속성을 활용해서 요청 받아온 account list data 안에 user data를 자식 형태로 받아와 account.user로 활용할 수 있도록 api 요청 처리
    3. 받아온 계좌 데이터들 중 broker_id, status, is_active와 같은 요소들은 해당 데이터의 실제 이름에 맞게 처리하여 표시하도록 구현
    4. Search API를 통해 해당 text를 포함하는 데이터들을 모두 보여줄 수 있도록 구현
    5. Pagination API를 적용해 10개씩 데이터를 보여줄 수 있도록 구현
    6. Filtering 기능을 sidebar 형태로 각 항목을 선택하여 선택한 항목에 맞는 데이터들을 보여줄 수 있도록 구현, 초기화 버튼을 통해 가장 처음 보여주었던 10개 데이터를 다시 보여줄 수 있도록 구현
    7. 마스킹처리와 손실, 이익여부에 따른 평가 금액 색깔 변화 구현
    8. 고객명이나 계좌번호를 누를 시 해당 상세 페이지로 이동하도록 구현

  </details>
    <details>
    <summary>3. 계좌 상세 </summary>

    1. 계좌 상세 페이지에서는 해당 유저의 정보와 계좌 상세 내용을 받아와서 표시하도록 구현
    2. data의 경우 해당 계좌 상세 정보에 user를 expand해서 해당 계좌의 유저 데이터도 같이 받아와서 데이터를 표시

  </details>
    <details>
    <summary>4. 사용자 목록 </summary>

    1. table 태그로 사용자 목록을 보여주도록 구현
    2. data는 user list 정보와 userSetting 정보를 동시에 받아와서 혜택 수신 동의 여부와 같은 데이터들을 추가적으로 함께 처리할 수 있도록 구현
    3. 검색과 filtering과 pagination도 account와 동일하게 구현

  </details>

  <details>
    <summary>5. 사용자 상세 </summary>

    1. 사용자 상세의 경우 필요한 user data와 해당 유저가 소유한 계좌 data를 함께 받아온 후 사용자 정보는 위에 표시하고 목록은 아래에 표시할 수 있도록 구현
    2. 사용자 이름을 변경하거나 사용자를 삭제할 수 있는 기능 구현

  </details>

<br/>

### 추가 기능

<details>
    <summary>1.  </summary>

    1.

  </details>

<br>

> ## 미구현 내용

- 예시

> ## Git

- ### [Git branch 전략](https://github.com/wanted-pre-onboarding-fe-6-10/I.M.LAB/wiki/Git-branch-%EC%A0%84%EB%9E%B5)

- ### [커밋 컨벤션](https://github.com/wanted-pre-onboarding-fe-6-10/I.M.LAB/wiki/%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br>

> ## Prettier, Eslint

- ### Prettier

```javascript
{
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid",
  "singleQuote": true,
  "endOfLine": "auto"
}
```

- ### Eslint

```javascript
{
  "parser": "@typescript-eslint/parser", // eslint를 typescript에서 쓸 수 있도록 변환해줌
  "extends": ["react-app", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  "plugins": ["@typescript-eslint", "prettier"],
  "ignorePatterns": ["node_modules/"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "no-var": "warn", // var 금지
    "no-multiple-empty-lines": "warn", // 여러 줄 공백 금지
    "no-console": ["warn", { "allow": ["warn", "error"] }], // console.log() 금지
    "eqeqeq": "warn", // 일치 연산자 사용 필수
    "dot-notation": "warn", // 가능하다면 dot notation 사용
    "no-unused-vars": "warn", // 사용하지 않는 변수 금지
    "react/destructuring-assignment": "warn", // state, prop 등에 구조분해 할당 적용
    "react/jsx-pascal-case": "warn", // 컴포넌트 이름은 PascalCase로
    "react/no-direct-mutation-state": "warn", // state 직접 수정 금지
    "react/jsx-no-useless-fragment": "warn", // 불필요한 fragment 금지
    "react/no-unused-state": "warn", // 사용되지 않는 state
    "react/jsx-key": "warn", // 반복문으로 생성하는 요소에 key 강제
    "react/self-closing-comp": "warn", // 셀프 클로징 태그 가능하면 적용
    "react/jsx-curly-brace-presence": "warn" // jsx 내 불필요한 중괄호 금지
  }
}

```

<br>

> ## 회고

### 윤관

- 처음으로 온보딩에서 이렇게 큰 규모의 과제를 받아서 직접 처음부터 끝까지 구현해보면서 어떻게 서비스가 구성되고 기능 구현은 어떻게 진행하면 좋을지, UI는 어떻게 적용하면 좋을지 하나하나 생각하면서 과제를 진행할 수 있어서 정말 좋은 경험이 됐다.
- 특히, json server을 다방면으로 활용하면서 expand를 통한 원하는 객체 형태로 데이터들을 한꺼번에 받아오는 방법부터 POST, PUT, PATCH, DELETE, GET 등 CRUD 기능까지 활용해볼 수 있어서 좋았다.
- 다만, 조금 아쉬운 부분은 과제 양이 많다보니 원하는 시간안에 처음 구상했던 모습들을 다 갖추지 못한 부분이 아쉽지만, 이 부분은 과제 기간이 끝나고 나서도 리팩토링과 추가 구현을 통해서 부족한 부분들을 보완할 계획이다.

### 김한얼

-

### 박진성

- 도움이 되지 못해 죄송합니다.

### 신이재

-

### 전지현

- 컴포넌트 재사용 : 필터 기능에서 select box와 input box를 컴포넌트로 분리하여 prop을 보내어 처리했는데, 이렇게 반복되는 기능을 공통 컴포넌트로 사용하니 편리했다.

- Redux toolkit 사용에 미숙해서 데이터 상태관리의 장점을 잘 활용하지 못한 것 같다.

- antd같은 ui라이브러리에 기능을 넣어야 하는 경우, 커스텀하기가 오히려 더 복잡해 질 수도 있다. 따라서 웬만하면 직접 스타일 코드도 작성하는게 나을 것 같다.

### 정재욱

-

### 추승연

- 각기 다른 종류의 데이터를 다루는 프로젝트인 만큼 데이터를 조합하여 사용하는 부분에서 어려움이 있었다.

- 프로젝트를 진행하며 처음으로 tailwind css를 적용해봤는데 알맞은 클래스명을 찾는데 많은 시간이 들었다. 하지만 클래스명에 익숙해지고 @apply 등을 적절히 이용한다면 더욱 간결한 코드로 css 적용이 가능할 것 같다는 생각이 들었다.

- 이전과 비교하여 큰 규모의 프로젝트였기 때문에 코스를 진행하는 동안 새롭게 알게 된 지식이나 기술들을 적용해 볼 수 있었다. 또한 아쉬웠던 내용들을 바탕으로 앞으로의 학습 방향을 구상하는데 많은 도움이 되었다.

- 유사한 역할을 하는 코드가 중복되는 경우가 많다는 생각이 들었다. 추후 진행되는 프로젝트에서는 custom Hook // 의존성 주입 등을 적절히 사용하여 코드의 재사용성을 높이는 방향으로 코드를 작성해야겠다는 생각이 들었다.

> ## Best-Practice 선정 이유

- 토큰 만료시 alert으로 알림처리 홈으로 리다이렉트 한 부분이, 사용자를 잘 고려한 것 같다.

- 반복되는 필터기능을 공통 컴포넌트로 처리하여 재활용 했다.

- ui가 깔끔하다.

- 리코일을 통한 상태관리 코드가 읽기 편하고, 상태관리의 장점을 잘 활용했다.

- CustomHook(useMutation) 을 활용하여 API 통신을 위한 코드의 재사용성이 높인 부분이 효율적으로 보여 추후 적용해보면 좋을 것 같다는 생각이 들었다.

- 전역상태관리 라이브러리는 Redux / RTK만 사용해봤는데, Recoil을 사용하여 간결하게 코드를 작성한 부분이 읽기 편했다.

- 데이터 관련 양식들이나 부수적으로 사용되는 util 함수들을 export하기 위해 utils 폴더를 사용하여 어떤 함수가 어떤 역할을 하는지 명확하게 알 수 있었다.

- 이전 과제들에서 배운것들을 종합적으로 잘 녹여논듯한 소스코드라 배울것이 많았습니다.
