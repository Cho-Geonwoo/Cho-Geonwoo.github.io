---
layout: post
title: "ArgoCD 이용해보기"
subtitle: "ArgoCD를 이용한 CD 시스템 구축"
categories: dev
tags: cloud ArgoCD
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

<!-- /code_chunk_output -->

## 1. ArgoCD란?

`Argo CD`는 GitOps스타일의 배포를 지원하는 CD 도구로. 원하는 설정 사항을 변경하여 Git에 푸시하면, 자동으로 쿠버네티스 클러스터의 상태가 Git에 정의된 상태로 동기화 된다.

즉, 지정한 대상 환경에 애플리케이션을 원하는 상태로 자동으로 배포할 수 있다.

또한, 멀티 클러스터 관리/배포 기능도 가지고 있다.

## 2. ArgoCD pipeline 구성

원래 사용하던 github repo에 코드를 수정하면, Argo CD를 이용해 배포 및 관리가 이루어지도록 하고 싶었다. 구성한 pipeline은 다음과 같다.

1) github action으로 Docker image build

2) GCR에 image push

3) 해당 서비스에 대한 정보를 담고 있는 `values.yaml` sha값 변경 (`values.yaml`과 helm chart가 만나 배포가 이루어진다.

4) argoCD가 변경을 detect

5) 배포

## 3. ArgoCD에 application 추가하기

GUI로 설정을 지정하는 방법과 코드로 설정을 지정하는 방법이 있는데, yaml 형태로 application을 추가했다.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ###########
  namespace: argo
  annotations:
    notifications.argoproj.io/subscribe.on-sync-succeeded.slack: dev-deploy
    notifications.argoproj.io/subscribe.on-sync-failed.slack: dev-bot
    notifications.argoproj.io/subscribe.on-sync-running.slack: dev-bot
    notifications.argoproj.io/subscribe.on-sync-status-unknown.slack: dev-bot
    notifications.argoproj.io/subscribe.on-health-degraded.slack: dev-bot
    notifications.argoproj.io/subscribe.on-deployed.slack: dev-deploy

  finalizers:
    - resources-finalizer.argocd.argoproj.io

spec:
  project: dev
  source:
    repoURL: ###################
    targetRevision: HEAD
    path: ################
    helm:
      valueFiles:
        - ########
        - ########

  destination:
    name: in-cluster
    namespace: default

  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: ########
      namespace: default
      jsonPointers:
        - /spec/replicas
    - group: autoscaling
      kind: HorizontalPodAutoscaler
      name: typed-logging
      namespace: default
      jsonPointers:
        - /spec/metrics

  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

argoCD는 쿠버네티스 클러스터 위에서 동작하는 친구이기 때문에, yaml 작성 후 다음 cmd로 수정을 반영 해주었다.

`kubectl apply -f <service_name>.yaml`

작업 후 **팔딱팔딱 날뛰는 귀여운 application들**

![Applications](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/ArgoCD/applications.png)


**Deploy 상황**

![Process](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/ArgoCD/process.png)


## 4. Argo CD 장점

- 예쁘게 GUI로 배포 과정을 살펴볼 수 있어 좋다! 매번 cmd를 사용해 배포 과정을 지켜봤는데, 이제는 그럴 필요가 없다.
- 슬랙으로 배포 상태에 대한 알림을 쉽게 받아볼 수 있다.
- 배포된 것에 문제가 있어 image rollback이 필요했는데, Argo CD를 이용해 매우 쉽게 작업할 수 있었다.