---
layout: post
title: "npm7 breaking changes"
subtitle: "npm7의 두드러지는 변화"
categories: dev
tags: frontend npm
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [npm 7의 성과](#npm-7의-성과)
- [두드러지는 변화](#두드러지는-변화)
- [깨알 야크 쉐이빙](#깨알-야크-쉐이빙)

<!-- /code_chunk_output -->

---

작성일 기준 최신 버전: 7.18.1

## npm 7의 성과

- 개발 속도를 높인 결과 (cadence를 높였다고 표현해서 조금 웃겼음) 2주 동안 [45개 되는 배포](https://www.npmjs.com/package/npm?activeTab=versions#versions)를 수행할 수 있었다고 한다.
- dependency를 46%나 줄였다고 한다. (npm6에서는 [123%](https://www.npmjs.com/package/npm/v/6.14.11?activeTab=dependencies)였고, npm7에서는 [67%](https://www.npmjs.com/package/npm/v/7.4.3?activeTab=dependencies))
- code coverage를 20%가까이 향상시켰다고 한다. (npm 7에서는 [97%](https://coveralls.io/github/npm/cli)이고, npm 6에서는 [77%](https://coveralls.io/github/npm/cli?branch=v6)이다)
- 다양한 예제에 대한 여러 [benchmarks에 두드러지는 성능 향상](https://github.com/npm/benchmarks)을 보였다고 한다.

## 두드러지는 변화

- lockfile의 변화

  [lockfile의 포맷](https://blog.npmjs.org/post/621733939456933888/npm-v7-series-why-keep-package-lockjson.html)에 변화가 생겼는데, npm 6와 호환이 된다고 한다. npm6에서, yarn.lock 파일은 무시되었지만, npm7에서는 yarn.lock을 package metadata와 resolution guidance로 사용하고, npm을 통한 library install yarn.lock도 업데이트한다고 한다.

  또한, `npm install` 명령어로 package를 설치할 때, 기존 version의 lockfile을 version+1 의 lockfile로 변경한다고 한다. (ex) v1 lockfile → v2 lock file) 이를 해결하기 위해서는 `npm install —no-save`를 이용할 수 있다.

- Peer dependencies

  기존에는 conflict되는 peer dependency가 있어도 warning만을 띄우며 계속 새로운 dependency를 설치했지만, npm 7은 error를 띄우며 설치를 block한다고 한다.

  `—-force`: conflict 통과

  `—-legacy-peer-deps` : conflict에 대한 warning을 발생시키지만, 설치는 진행

  `—-strict-peer-deps` : peer dependency를 strict하게 검사

---

## 깨알 야크 쉐이빙

`npm audit fix`: npm version 6에서 추가된 기능으로 dependency tree의 보안 취약점과 해결 방안을 제공해줌.

`—dry-run`: 바뀌는 점을 확인해볼 수 있다.

`—package-lock-only`: node_modules는 수정하지 않는다.

`—only=prod|dev`: dependencies 혹은 devDependencies만 fix한다.

`—force`: 최상위 종속성의 major 업데이트를 설치한다고 한다. 좀 더 자세한 설명은 아래에 있다.

Have audit fix install semver-major updates to toplevel dependencies, not just semver-compatible ones — NPM Audit Document

semver는 Semantic Versioning의 약자로 한국말로 번역해보면 의미론적 버전 부여 방식이다. semver에서는 library 버전을 major.minor.patch로 나누고 다음과 같은 방식으로 부여한다.

- major는 이전 버전과 호환되지 않게 기능이 추가됐을 때 변경
- minor는 이전 버전과 호환이 가능하면서 기능이 추가됐을 때 변경
- patch는 이전 버전과 호환이 가능하면서 버그를 수정했을 때 변경

결론: npm audit fix는 semver-major를 수정하므로 사용할 때 주의를 요한다!

→ 질문: 만약에 dependency tree가 얽혀있어서 cycle이 발생하면 어떻게 되는 거지?
