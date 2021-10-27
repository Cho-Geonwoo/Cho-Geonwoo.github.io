---
layout: post
title: "How Expressive are Graph Neural Networks"
subtitle: "GNN study"
categories: dev
tags: ML/DL GNN
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Can GNN node embeddings distinguish node's local neighborhood structures?](#can-gnn-node-embeddings-distinguish-nodes-local-neighborhood-structures)
- [Power of Aggregation Functions](#power-of-aggregation-functions)
  - [(1) GCN(mean-pool)](#1-gcnmean-pool)
  - [(2) GraphSAGE(max-pool)](#2-graphsagemax-pool)
  - [(3) Injective multi-set function](#3-injective-multi-set-function)
  - [(4) Universal Approximation Thm](#4-universal-approximation-thm)

<!-- /code_chunk_output -->

---

## Can GNN node embeddings distinguish node's local neighborhood structures?

> 표현력이 강한 GNN은 subtree를 injective하게 생성해야 함!

- node embedding을 이웃에 의해 정의된 computational graph를 이용해 생성함.
- 따라서, neighbor aggregation의 모든 과정이 injective하면 GNN은 다른 subtree 구조를 구분할 수 있음.

---

## Power of Aggregation Functions

### (1) GCN(mean-pool)

- GCN의 aggregation 함수는 같은 color proportion을 가진 다른 multi-set들을 구분할 수 없음.

### (2) GraphSAGE(max-pool)

- GraphSAGE의 aggregation 함수는 같은 color 종류를 가진 multi-set을 구분할 수 없음.

### (3) Injective multi-set function

> Thm: Any Injective multi-set function can be expressed as: $${\phi(\Sigma(f(x)))}$$ where ${ \phi}$: non-linear function, f: non-linear function

Proof Intuition: f는 color에 대한 one-hot encoding을 생성하고, one-hot encoding의 summation은 node에 대한 모든 정보를 유지하고 있음.

### (4) Universal Approximation Thm

> Thm: 충분히 큰 hidden dimensionality와 적절한 non-linear activation function를 가진 1-hidden-layer MLP는 모든 연속 함수를 임의의 정확도로 근사할 수 있다.

- 핵심 아이디어: ${ \phi}$와 f를 MLP로 두자!
  -> Graph Isomorphism Network [[Xu et al. ICLR 2019](https://openreview.net/pdf?id=ryGs6iA5Km)]: Most Expressive Network

- 디테일: Any injective function over the tuple ${(c^k(v), {c^k(u)}_{u \in N(v) })}$는 다음과 같이 표현될 수 있다.

  <br/>${MLP_{\phi}((1+\epsilon)MLP_f(c^k(v))+\Sigma_{u \in N(v)}MLP_f(c^k(u)))}$
  where ${\epsilon}$ is learnable scalar.

- WL graph kernel보다 GIN을 사용했을 때의 이점:

  - node embedding이 저차원일 때 사용가능하다.

  - Update function의 parameter가 downstream task에 의해 학습될 수 있다.
