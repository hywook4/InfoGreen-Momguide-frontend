# 인포그린 - 맘가이드
## Server-side API Code
- https://github.com/mckinley-and-rice/ids-infogreen/tree/master/routes/api

## API 모델
- https://github.com/mckinley-and-rice/ids-infogreen/tree/master/model

## 인포그린에서 초기에 PHP 로 자체 개발한 API
- http://13.125.89.0/chemical/

## DB 정보
### 인증 키
- `URL`: http://13.125.89.0/infogreen/
- `ID`: `bubble`
- `PW`: `infogreen123`

## 추가로 진행되야 할 사항
- Backend API 리팩토링
	- Validation 추가
	- error-response 일관되게 적용
- 새 디자인에 회원 관련 API 연동
	- 회원가입 / 로그인
	- 제품 리뷰 등록
	- 제품 리뷰 조회
	- 제품 성분 분석 요청
	- 1:1 문의
- 디자인 CSS 마무리 터치
	- 네이게이션 헤더
	- 가정용 화학제품 상세 페이지
	- 유아용 화장품 상세 페이지

## PWA 변환 과정
- https 보안 인증서 (SSL/TLS) 발급 후 서버 인스턴스에 설치
- 웹 서버 (apache, nginx)에 보안 인증서 적용
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 테스트 실시 후 점수에 따라 개선 방안 가이드라인 참조
	- 앱 반응성
	- 파일 로딩 속도
	- 네트워크 속도
- manifest.json 파일 생성 후 기타 정보 서술
	- 앱 색깔
	- 앱 이름
	- 앱 아이콘, etc
- [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/) 로 캐싱 전략 선택 후 serviceworker.js 개발
	- Offline page
		- This simple but elegant solution pulls a file from your web server called "offline.html" (make sure that file is actually there) and serves the file whenever a network connection can not be made.
 	- Offline copy of pages
		- A solution that expands the offline capabilities of your app. A copy of each pages is stored in the cache as your visitors view them. This allows a visitor to load any previously viewed page while they are offline.
 	- Offline copy with Backup offline page
		- A copy of each pages is stored in the cache as your visitors view them. This allows a visitor to load any previously viewed page while they are offline. This then adds the "offline page" that allows you to customize the message and experience if the app is offline, and the page is not in the cache.
 	- Cache-first network
		- Use this service worker to pre-cache content. The content you add to the "cache-array" will be added immediately to the cache and service from the cache whenever a page requests it. At the same time it will update the cache with the version you have on the server. Configure your file array to include all your site files, or a subset that you want to be served quickly.
- 빈 안드로이드 프로젝트에 [TWA](https://developers.google.com/web/updates/2017/10/using-twa) 추가하여 PWA 패키징
- 안드로이드 프로젝트 빌드 후 Playstore 에 배포

### 핵심 테이블 정보
#### ingredient (ingredient_list.php)
- unique_number = 성분 고유 번호
- name = 한글 성분명
- name_eng = 영어 성분명
- cas_number = CAS 번호
- ing_usage = 용도
- ewg_rank = EWG 등급
- caution_1 = 독성별 주의 천식 호흡
- caution_2 = 독성별 주의 피부자극
- caution_3 = 독성별 주의 발달생식
- caution_4 = 독성별 주의 발암
- scorecard_1 = 스코어카드 천식 호흡
- scorecard_2 = 스코어카드 피부자극
- scorecard_3 = 스코어카드 발달생식
- scorecard_4 = 스코어카드 발암
-national_harmful = 국내 유해성분
- dsl
- epa
- etc_1 = SLS SLES
- etc_2 = 4급암모늄
- etc_3 = 향료
- etc_4 = 색소/형광물질
- etc_5 = 가습기 유해성분
- misc = 비고

```json
{
    "0": "79",
    "1": "소듐시트레이트",
    "2": "Sodium citrate",
    "3": "68-04-2",
    "4": "pH 완충제, 금속이온봉쇄제, 향료, pH 조절제",
    "5": "A",
    "6": "N",
    "7": "N",
    "8": "N",
    "9": "N",
    "10": null,
    "11": null,
    "12": null,
    "13": null,
    "14": null,
    "15": null,
    "16": "G",
    "17": null,
    "18": null,
    "19": null,
    "20": null,
    "21": null,
    "22": "-1\n",
    "unique_number": "79",
    "name": "소듐시트레이트",
    "name_eng": "Sodium citrate",
    "cas_number": "68-04-2",
    "ing_usage": "pH 완충제, 금속이온봉쇄제, 향료, pH 조절제",
    "ewg_rank": "A",
    "caution_1": "N",
    "caution_2": "N",
    "caution_3": "N",
    "caution_4": "N",
    "scorecard_1": null,
    "scorecard_2": null,
    "scorecard_3": null,
    "scorecard_4": null,
    "national_harmful": null,
    "dsl": null,
    "epa": "G",
    "etc_1": null,
    "etc_2": null,
    "etc_3": null,
    "etc_4": null,
    "etc_5": null,
    "misc": "-1\n"
}
```

#### item (item_info.php)
- name = 제품명
- image = 물품 사진 파일명
- brand = 브랜드/판매원
- maker = 제조사
- category = 카테고리
- opened = 성분공개 여부
- code = 자가검사번호
- auth_1 = 기타 허가 인증 여부
- auth_2 = 친환경 인증 여부
- auth_3 = 해외 인증 여부
- caution = 주의 성분 포함 여부
- harmful = 유해성분 포함 여부
- hit = 총 조회수
- weekly = 주간 조회수
- open_request = 성분공개요청수
- registered_date = 등록 날짜

```json
{
    "name": "순샘 버블 OLIVE 주방세제",
    "image": " 버블 OLIVE 주방세제.jpg",
    "brand": "순샘",
    "category": "주방세제",
    "opened": "2",
    "code": null,
    "auth_1": null,
    "auth_2": "수질 오염 저감, 친환경 설계",
    "auth_3": null,
    "caution": "1",
    "harmful": "1",
    "open_request": "0",
    "etc_1": 1,
    "etc_2": 0,
    "etc_3": 0,
    "etc_4": 0,
    "etc_5": 0,
    "epa": 1,
    "dsl": 1,
    "ewg_A": "5",
    "ewg_B": "4",
    "ewg_C": "4",
    "ewg_D": "1",
    "ewg_F": 0,
    "ewg_X": 0,
    "review_thumbnail": [],
    "star1": 0,
    "star2": 0,
    "star3": 0,
    "star4": 0,
    "vote": "0",
    "star": 0
}
```

## 현재까지 진행 사항
### 제품관련 API
- http://13.125.89.0/chemical/items_limit.php
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
     - `name` :- 제품 이름
     - `page` :- 페이지 번호 *ex) 0, 1, 2, 3*
     - `sort` :- 정렬 방식  *ex) dateTime (최신순) 기본*
     - `category` :- 제품 카테고리 *ex) "암웨이"*
     - `checked` :- 제품 필터 *ex) *
```
반환값 
- POST 이외 메소드 (e.g., GET) 및 파라미터를 정의하지 않을 시 기본 20개의 정보 반환

[ [ {제품 정보} , {제품 정보},.. ] , {total : 전체 제품 수} ]
```
```json
[
    [
        {
            "name": "퍼실 하이진젤",
            "brand": "퍼실",
            "category": "세탁세제",
            "image": "퍼실하이진젤.png",
            "option": 7,
            "star": 0,
            "vote": "0"
        },
    ],
    {
        "total": "총 제품 수"
    }
]
```

- http://13.125.89.0/chemical/item_info.php
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
     - `name` :- 제품 이름
```json
반환값 (DB 정보 참조)
{
    "name": "순샘 버블 OLIVE 주방세제",
    "image": " 버블 OLIVE 주방세제.jpg",
    "brand": "순샘",
    "category": "주방세제",
    "opened": "2",
    "code": null,
    "auth_1": null,
    "auth_2": "수질 오염 저감, 친환경 설계",
    "auth_3": null,
    "caution": "1",
    "harmful": "1",
    "open_request": "0",
    "etc_1": 1,
    "etc_2": 0,
    "etc_3": 0,
    "etc_4": 0,
    "etc_5": 0,
    "epa": 1,
    "dsl": 1,
    "ewg_A": "5",
    "ewg_B": "4",
    "ewg_C": "4",
    "ewg_D": "1",
    "ewg_F": 0,
    "ewg_X": 0,
    "review_thumbnail": [],
    "star1": 0,
    "star2": 0,
    "star3": 0,
    "star4": 0,
    "vote": "0",
    "star": 0
}

올바르지 않은 메소드 혹은 파라미터가 비었을 시
{"name":null,"image":null,"brand":null,"category":null,"opened":null,"code":null,"auth_1":null,"auth_2":null,"auth_3":null,"caution":null,"harmful":null,"open_request":null,"etc_1":0,"etc_2":0,"etc_3":0,"etc_4":0,"etc_5":0,"epa":0,"dsl":0,"ewg_A":0,"ewg_B":0,"ewg_C":0,"ewg_D":0,"ewg_F":0,"ewg_X":0,"review_thumbnail":[],"star1":0,"star2":0,"star3":0,"star4":0,"vote":"0","star":0}
```

- http://13.125.89.0/chemical/ingredient_list.php
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `name` :- 제품 이름
```
반환값 
{ total : [ { 성분 정보 },.. ], harmful : [ { 성분 정보 ,…} ], concern : [ { 성분 정보 },… ]}

* 올바르지 않은 메소드 혹은 파라미터가 비었을 시
{"total":[],"concern":[],"harmful":[]}
```

- /api/auth/like

  - 기능 설명 :- 제품 좋아요
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `name` :- 제품 이름

```
반환값 
{ 좋아요 한 제품 }
*user information
```

- /api/auth/save

  - 기능 설명 :- 제품 저장
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
	  - `name` :- 제품 이름
```
반환값 
{ 저장한 제품 }
*user information
```

- /api/auth/view

  - 기능 설명 :- 제품 조회수 증가
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `name` :- 제품 이름
    - `email` :- 사용자 이메일
```
반환값 
{ 조회한 제품 }
*user information
```
- /api/request/addIngredientRequest

  - 기능 설명 :- 제품 성분 분석 요청
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `id` :- 사용자 고유 _id
    - `name` :- 사용자 닉네임
    - `type` :- 요쳥 유형
    - `product` :- 제품 이름
    - `content` :- 제품 설명
```
반환값 
성공시 :- { status : “OK”, result : { 작성한 글 내용} }
에러시 :- { error :  에러 메세지}
```

- /api/request/getProducts

  - 기능 설명 :- 제품 성분 분석 요청 수 반환
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `product` :- 제품 이름
```
반환값 
{ products : 제품 분석 요청 수}
```

- /api/comment/getRating

  - 기능 설명 :- 제품 별점 반환
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `name` :- 제품 이름

```
반환값 
{rating: 별점,ratingArray:[전체 별점, 기능력 별점, 자극성 별점, 향 별점, 가성비 별점]}
```

- /api/comment/addReview

  - 기능 설명 :- 리뷰 추가
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `prodName` :- 제품 이름
    - `name`:- 사용자 닉네임
    - `userId` :- 사용자 고유 _id
    - `review`:- 리뷰 내용
    - `functionalityRating`:- 기능력 별점
    - `irritabilityRating`:- 자극성 별점
    - `fragranceRating`:- 향 별점
    - `priceRating`:- 가성비 별점
    - `period` : 사용 기간

```
반환값 
{ status : String }
```


- /api/comment/getReview

  - 기능 설명 :- 리뷰 반환
  - HTTP 요청 메소드 – POST
  - 받는 파라미터 정보 (x-www-form-urlencoded)
    - `prodName`:- 제품 이름
    - `revId` :- 리뷰 고유 _id

```
반환값

{ review : [ { 리뷰 오브젝트 },.. ]}
```

- /api/comment/addReply
	- 기능 설명 :- 리뷰에 답글 달기
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (x-www-form-urlencoded)
		- `prodName`:- 제품 이름
		- `revId` :- 리뷰 고유 _id
		- `userId` :- 사용자 고유 _id
		- `comment` :- 답글 내용

```
반환값

{ result :  { 답글 오브젝트 } }
```


- /api/comment/addLike

	- 기능 설명 :- Add like to a review
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (x-www-form-urlencoded)
		- `prodName`:- 제품 이름
		- `revId` :- 리뷰 고유 _id
		- `userId` :- 사용자 고유 _id
		- `name` :- 유저 닉네임
```
반환값

{ result :  { 리뷰 오브젝트 } }
```

- /api/comment/addReport

	- 기능 설명 :- Report  a review
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (x-www-form-urlencoded)
		- `name`:- 제품 이름
		- `id` :- 리뷰 고유 _id
```
반환값

{ completed :  Boolean}
```

- /api/comment/getReviewByLike

	- 기능 설명 :- Sort reviews by like
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (x-www-form-urlencoded)
		- `name`:- 제품 이름
```
반환값

{ reviews:  [ {제품 리뷰}, {제품 리뷰}, {제품 리뷰}, ... ]}
```


- /api/comment/getReviewByComment

	- 기능 설명 :- Sort reviews by comment
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (x-www-form-urlencoded)
	- `name`:- 제품 이름
```
반환값

{ reviews:  [ {제품 리뷰}, {제품 리뷰}, {제품 리뷰}, ... ]}
```

### 인증 관련 API

- /api/auth/register

	- 기능 설명 :- 회원가입
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (X-www-form-urlencoded)
		- `age`: 나이
		- `ageOfChildren`: 자녀 나이
		- `email`: 이메일
		- `haveAnyChildren`: 자녀유뮤 (Boolean: True / False)
		- `password`: 비밀번호
		- `sex`: 성별
		- `username`: 유저 닉네임

```
반환값 
{ user : { 유저 오브젝트 } , token : String}
```

- /api/auth/login

	- 기능 설명 :- 로그인
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (X-www-form-urlencoded)
		- `email`: 이메일
		- `password`: 비밀번호
		- `remember`: 사용자 로그인 기억 여부 (Boolean: True / False)

```
반환값 
{ success : 성공 값 (True / False), token : 사용자 토큰 }
```

- /api/auth/deleteUser
	- 기능 설명 :- 회원탈퇴
	- HTTP 요청 메소드 – GET
	- 헤더
		- Authorization : Bearer token
```
반환값
{"user":{"n":1,"ok":1}}
```

- /api/auth/changePassword
	- 기능 설명 :- Change password
	- HTTP 요청 메소드 – POST
	- 헤더
		- Authorization : Bearer token
	- 받는 파라미터 정보 (X-www-form-urlencoded)
		- `newPassword`: 새 비밀번호
		- `password`: 현재 비밀번호
		- `retypedPassword`: 비밀번호 재입력 값
```
반환값 
성공시 
{msg : String}
실패시
{error : String}
```

- /api/auth/edit/:id
	- 기능 설명 :- 유저 프로필 수정
	- HTTP 요청 메소드 – POST
	- 받는 파라미터 정보 (X-www-form-urlencoded)
		- `age`: 나이
		- `email`: 이메일
		- `haveAnyChildren`: 자녀 유무 (Boolean: True / False)
		- `sex`: 성별
		- `username`: 유저 닉네임
```
반환값 
{"user":{"n":1,"nModified":1,"ok":1}}
```

- /api/auth/getUser
	- 기능 설명 :- 유저 프로필 조회
	- HTTP 요청 메소드 – GET
	- 헤더
		- Authorization : Bearer token
			- 예) Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZW1haWwiLCJzZXgiOiJtYWxlIiwiYWdlIjoiNDBzIiwicGFzc3dvcmQiOiIxMjMiLCJoYXZlQW55Q2hpbGRyZW4iOiJ0cnVlIiwiYWdlT2ZDaGlsZHJlbiI6IjMiLCJsaWtlcyI6W10sInNhdmVzIjpbXSwidmlld2VkIjpbXSwidG9rZW4iOiIiLCJpZCI6IjVjMmUwYzZmNTFkZjA4MjA3MGVlMmEwOCIsImlhdCI6MTU0NjUyMTcxMiwiZXhwIjoxNTQ2NTI1MzEyfQ.dhWryPeVm907nv3qhKE_jBmi58tyHSC8RTnTqrFnHgk

```
반환값 
{ 사용자 오브젝트 }
```

- /api/auth/user/profileImage
	- 기능 설명 :- 유저 프로필 이미지 변경
	- HTTP 요청 메소드 – POST
	- 헤더
		- Authorization : Bearer token
		- 예) Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiZW1haWwiLCJzZXgiOiJtYWxlIiwiYWdlIjoiNDBzIiwicGFzc3dvcmQiOiIxMjMiLCJoYXZlQW55Q2hpbGRyZW4iOiJ0cnVlIiwiYWdlT2ZDaGlsZHJlbiI6IjMiLCJsaWtlcyI6W10sInNhdmVzIjpbXSwidmlld2VkIjpbXSwidG9rZW4iOiIiLCJpZCI6IjVjMmUwYzZmNTFkZjA4MjA3MGVlMmEwOCIsImlhdCI6MTU0NjUyMTcxMiwiZXhwIjoxNTQ2NTI1MzEyfQ.dhWryPeVm907nv3qhKE_jBmi58tyHSC8RTnTqrFnHgk

	- 받는 파라미터 정보 (x-www-form-urlencoded)
		- profileImage : 이미지 파일
```
반환값 
{ 사용자 오브젝트 }
```


### 참조
- http://35.171.6.5 (idsLogic 개발)
	- idsLogic 에서 초기에 개발
	- 모든 API 는 개발 및 적용이 끝났으나 디자인은 제대로 반영되지 않았음.
