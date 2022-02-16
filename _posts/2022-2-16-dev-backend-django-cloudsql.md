---
layout: post
title: "Django 개발 환경별 데이터베이스 연결 셋팅"
subtitle: "django postgreSql 연결"
categories: dev
tags: backend django cloudsql postgresql
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [1. CloudSql 설정하기](#1-cloudsql-설정하기)
- [2. 장고와 postgreSql 연동하기](#2-장고와-postgresql-연동하기)
- [3. database migration script 돌리기](#3-database-migration-script-돌리기)
<!-- /code_chunk_output -->

회사에서 개발 환경을 dev / staging / production / local로 분리하여 사용하고 있는데, CloudSql을 이용해 각 개발 환경별로 데이터베이스를 따로 띄워 셋팅하고자 하였다.

각 단계별로 수행한 일을 정리해보았다.

## 1. CloudSql 설정하기

1. postgreSql 14버전을 GCP에 띄웠다.

![CloudSql](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/django_cloudsql/cloudsql.png)

2. **Authorized networks**를 설정하였다.

![Network](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/django_cloudsql/network.png)

onprem 환경에서만 접근할 수 있도록 CIDR range를 설정하였고, dev 환경에만 회사 ip address를 추가하여 접근할 수 있도록 셋팅하였다.

3. User를 추가하였다. IAM을 이용해 셋팅할 수 있었지만, 우선 빠른 개발을 위해 custom user / password를 추가하였다.

## 2. 장고와 postgreSql 연동하기

`[settings.py](http://settings.py)` 에 다음 코드를 추가하였다.

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": ENV("DATABASE_NAME"),
        "USER": ENV("DATABASE_USER"),
        "PASSWORD": ENV("DATABASE_PASSWORD"),
        "HOST": ENV("DATABASE_HOST"),
        "PORT": 5432,
    }
}
```

Engine과 port는 고정해서 사용하기에 값을 고정해두었고, 다른 값들은 `.env` 파일에 값을 넣어두면, 해당 파일에서 값을 읽어와 사용하도록 설정하였다. 환경변수 설정값을 불러오는 부분은 다음과 같다.

```python
import environ

ENV_VARIABLES_WITH_DEFAULT_VALUES = {"DEBUG": (bool, False)}

ENV = environ.Env(**ENV_VARIABLES_WITH_DEFAULT_VALUES)
ENV_DICT = {}
for key in ENV_VARIABLES_WITH_DEFAULT_VALUES:
    ENV_DICT[key] = ENV(key)
globals().update(ENV_DICT)

DEBUG = ENV("DEBUG")
```

production / staging / dev 환경에서는 github action에서 docker image를 build할 때 `.env` 파일을 생성해 image안에 추가하는 방식을 이용하였다. 비밀번호과 같이 민감한 정보는 github secret안에 넣어 읽도록 하였다.

## 3. database migration script 돌리기

각 환경별로 database table을 초기화 해주기 위해 로컬에서 각 cloudSql 자원에 대해 `python [manage.py](http://manage.py) migrate` 명령어를 수행해주었다.

![SUCESS](https://raw.githubusercontent.com/Cho-Geonwoo/Cho-Geonwoo.github.io/master/assets/img/contents/django_cloudsql/success.png)

잘 이루어졌다!
