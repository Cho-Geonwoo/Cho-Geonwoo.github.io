---
layout: post
title: "Gpipe: Easy Scaling with Micro-Batch Pipeline Parllelism"
subtitle: "논문 리뷰"
categories: dev
tags: ml/dl Gpipe PaperReview
---

- 목차
  - Introduction: What is Gpipe?
  - Algorithm:
    - Pipeline Model Parallelism
    - Re-materialization
  - Performance Optimization

---

[GPipe](https://arxiv.org/abs/1811.06965): 2018년 Google AI Research Division에서 publish한 논문

- tensorflow 구현체 (https://github.com/tensorflow/lingvo/blob/master/lingvo/core/gpipe.py)

- pytorch 구현체 (https://github.com/kakaobrain/torchgpipe)

---

## Introduction: What is Gpipe?

(1) 문제 제기

- 모든 모델이 그러한 것은 아니지만, Imagenet에서 대체로 모델의 크기가 크면 클 수록 성능이 좋았음.
- Translation에서도 model size의 증가는 번역 품질의 향상으로 이어졌음.
- 크기가 작은 모델의 경우 single accelerator에 model을 올릴 수 있었기 때문에 학습에 큰 어려움이 없었음.
- 하지만, 크기가 큰 모델의 경우, single accelerator에 memory limitation으로 인해 model을 올리기 어렵기 때문에, model parllelism을 이용해 분산 학습을 수행해야 함.
- 효율적인 model parallelism 알고리즘은 디자인과 구현이 어렵고, 효율적인 model parallelism 알고리즘은 task-specific하곤 했음.

(2) GPipe란?

- 위와 같은 model parellism의 어려움을 해결하기 위해 구현된 framework
- 특정 task나 architecture에 종속되지 않음.
- Image Classification과 Machine Translation에 효율적임.

## Algorithm

### Pipeline Model Parallelism

![Pipeline Model Parallelism](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/Pipeline_Model_Parallelism.png)

![Microbatch](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/Microbatch.png)

-> BatchNorm을 이용했을 때 데이터 해저드가 발생할 수 있을 것 같다.

### Re-materialization

![Rematerialization](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/Rematerialization.png)

![Rematerialization2](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/Rematerialization2.png)

## Perfomance Optimization

![Microbatch_Bubble](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/Microbacth_Bubble.png)

![Rematerialization_Optimize](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/Rematerialization_Optimize.png)
