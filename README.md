![Header](https://capsule-render.vercel.app/api?type=rect&color=f55225&text=WeatherNow&desc=현재%20시간%20및%20위치%20기반의%20날씨%20앱%20미니%20프로젝트&section=header&height=250&fontColor=ffffff&fontSize=60&fontAlignY=45&descAlignY=67&descSize=30)
<br><br>

## 📍프로젝트 소개
현재 위치를 바탕으로 날씨를 알려주는 리액트 기반의 날씨 앱 미니 프로젝트입니다. OpenWeatherMap, Geolocation API를 통해 현재 위치 또는 미리 설정된 주요 도시의 다양한 날씨 정보를 실시간으로 받아와 렌더링합니다.

## 📍개발기간
2024.07.18 ~ 07.21 (3일)

## 📍기술스택
<div>
	<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
	<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
	<img src="https://img.shields.io/badge/API Call-E3695F?style=for-the-badge&logoColor=white"> 
</div>

## 📍주요기능
- **현재 위치 기반**: 사용자의 현재 위치를 기반으로 날씨를 실시간 제공합니다.
- **도시 선택 조회**: 미리 설정된 도시의 날씨를 조회할 수 있습니다.
- **API 호출**: OpenWeatherMap, Geolocation API를 통해 실시간으로 정보를 가져옵니다.
- **컴포넌트화**: 레이아웃을 기준으로 컴포넌트화하여 구조를 효율적으로 관리합니다.
- **위치 시각화**: 현재 조회 중인 도시가 다른 도시와 구별되도록 UI에서 강조합니다.

## 📍상세기능
### 1) 현재 도시
- 페이지가 처음 로드된 시점에 `city` 상태는 `null`입니다.
- 이 경우, 현재 도시의 위치를 기반으로 API를 호출하여 날씨 데이터를 얻습니다.
- 현재 도시의 위치를 얻기 위해 **Geolocation API**를 호출하여 위도(`lat`)와 경도(`lon`)를 가져옵니다.
- 이 위치값을 통해 **OpenWeatherMap API**를 호출하여 현재 도시의 날씨 정보 객체를 얻습니다.
- 즉, 이 위치값(`lat`, `lon`)은 API 호출 시 쿼리 파라미터로 사용됩니다.
- 따라서 처음 로드되는 날씨 정보는 사용자의 현재 위치에 기반합니다.

### 2) 미리 설정된 도시
- 미리 설정된 도시들 중 하나를 클릭하면 해당 도시명이 city 상태에 저장됩니다.
- 이 `city`를 통해 OpenWeatherMap API를 호출하여 해당 도시의 날씨 정보 객체를 얻습니다.
- 이때는 `city`에 저장된 도시명이 API 호출 시 쿼리 파라미터로 사용됩니다.

### 3) API 호출
- Geolocation API를 통해 현재 위치의 위도와 경도를 가져옵니다.
- OpenWeatherMap API를 통해 해당 도시의 날씨 데이터를 가져옵니다.
	- 위치(위도, 경도) 기반
	- 도시명 기반

```
https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
```



```
https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
```

  

### 4) 레이아웃에 따른 컴포넌트화
- 페이지의 왼쪽, 오른쪽 상단, 오른쪽 하단의 정보들을 컴포넌트로 관리합니다.
- 큰 요소를 부분으로 분할하여 코드의 기능이 명확해지고 가독성과 유지보수성이 향상됩니다.
- 부모 요소에서 필요한 정보를 자식 컴포넌트로 전달하여 상태를 공유할 수 있습니다.

### 5) 선택된 도시 시각화
- 유저는 현재 조회중인 도시를 쉽게 파악할 수 있어야 합니다.
- 이를 위해 `city` 값과 유저가 선택한 도시가 동일한지 비교합니다.
- 선택된 도시는 CSS 선택자를 통해 다른 색상으로 강조합니다.

