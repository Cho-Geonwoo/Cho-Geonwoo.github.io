---
layout: post
title: "Setting up GNN Prediction Tasks"
subtitle: "GNN study"
categories: dev
tags: ML/DL GNN
---

- 목차
  - Why Splitting Graphs is Special

---

## Why Splitting Graphs is Special

> Notion: Image는 image마다 분포가 독립적이라고 할 수 있어 test set과 valid set을 분리하는 것이 쉽지만, 하나의 그래프를 분리하려고 할 때 node들이 edge로 연결되어 있기에 분리하기가 쉽지 않다.

### Transductive Setting

> Notion: 학습/ 검증/ 테스트 set이 모두 같은 graph위에 있다.

- 데이터셋이 하나의 그래프로 이루어져 있음.
- 모든 split에서 전체 graph를 살펴볼 수 있고, label만을 분리함.
- node/ edge 예측 task에만 적용 가능함.

### Inductive Setting

> Notion: 학습/ 검증/ 테스트 set이 모두 다른 graph위에 있다.

- 데이터셋이 여러개의 graph로 이루어져 있음.
- 각 split은 split안에 포함된 graph만을 볼 수 있음.
- node/ edge/ graph task에 모두 적용 가능함.
