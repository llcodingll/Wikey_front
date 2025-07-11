# Wiskey 프론트엔드

## 프로젝트 개요 및 목적

- Wiskey는 위스키 취향 설문을 기반으로 맞춤형 위스키를 추천하는 서비스입니다.
- 설문, 추천 결과, 회원가입/로그인 등 다양한 UI를 제공합니다.

## 주요 기능

- 설문 응답 및 결과 시각화(차트, 키워드 등)
- 회원가입/로그인/로그아웃
- 유저별/유사 사용자 추천 결과 조회
- 반응형 UI, 에러 처리, 접근성 고려

## 기술 스택 및 구조

- React 19, TypeScript, Node.js 18
- MUI, Styled-components, Recharts 등
- Axios(REST API 연동), React Hook Form

### 폴더 구조

```
wiskey/frontend/
├── src/
│   ├── components/   # UI 컴포넌트
│   ├── constants/    # 설문 문항 등 상수
│   ├── services/     # API 연동
│   ├── views/        # 주요 페이지
│   └── styles/       # 전역 스타일
├── public/           # 정적 리소스
├── package.json      # 의존성/스크립트
```

## 개발/실행/테스트/배포

```bash
npm ci
npm start      # 개발 서버 실행
npm run build  # 프로덕션 빌드
npm test       # 테스트
```

- API 서버 주소 등은 환경변수(.env) 또는 src/services/에서 관리

## UI/UX 및 접근성

- 반응형 레이아웃, MUI 기반 일관된 디자인
- 에러 바운더리, 폼 검증 등 사용자 경험 강화
- 접근성(A11y) 고려(키보드 네비게이션, 명확한 라벨 등)

## 본인 역할 및 기여 포인트

- 전체 프론트엔드 구조 설계, UI/UX 구현, 상태 관리, API 연동 등 모든 과정을 단독으로 수행
- 설문/추천 결과 시각화, 코드 품질 및 사용자 경험 개선에 집중

## 트러블슈팅/성장 경험

- API 연동/에러 처리, 상태 관리 등 다양한 문제 해결 경험
- 반응형 UI/UX 개선 및 접근성 향상 경험
- 테스트 자동화 및 코드 품질 관리 경험

## 기타

- 추가 문의/기여는 이슈 또는 PR로 부탁드립니다.
