# Account-Manage-App

### 사용 기술

- 언어 : Javascrip
- 프레임워크 : React
- css : tailwind
- 상태관리 : Redux Toolkit

### 구현 설명

1. 로그인 페이지

- React hook form 사용 : 커스텀 훅을 사용하여 유효성 검사 처리

2. header ,sider , footer

- antd 라이브러리 커스텀하여 사용
- 현재 페이지명 header에 출력
- sider : 현재 보고 있는 화면에 해당하는 메뉴 하이라이트 처리

3. 페이지 이동시 url 변경

- 페이지 이동시 url의 주소를 변경함.
- 이 url의 값을 읽어 해당하는 데이터를 get요청 하여 렌더함

4. filter ,검색 기능

- 반복되는 select , input 창을 컴포넌트로 만들어 재활용함.

### 미구현 사항

1. 계좌상세 페이지
2. 신규 사용자 post요청
3. 계좌번호 마스킹 처리
