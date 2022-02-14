---
layout: post
title: "Django 버그 해결"
subtitle: "Docker compose 이용 시 Django Auto Reload"
categories: dev
tags: backend Django auto-reload
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [1. Dockerfile / docker-compose.yml 작성](#1-dockerfile-docker-composeyml-작성)
- [2. Auto reload 문제 해결](#2-auto-reload-문제-해결)
<!-- /code_chunk_output -->

---

## 1. Dockerfile / docker-compose.yml 작성

docker-compose를 이용해 django local 개발 환경을 구성하려고 했다. 작성한 Dockerfile / docker-compose.yml은 다음과 같다.

**Dockerfile**

```docker
# Release Image
FROM python:3.7

WORKDIR /src
RUN pip install --upgrade pip
COPY . .
RUN pip install -r requirements.txt

WORKDIR /src/base
ARG SECRET_KEY
ARG DEBUG=False
RUN echo "SECRET_KEY="$SECRET_KEY >> .env
RUN echo "DEBUG="$DEBUG >> .env

WORKDIR /src
EXPOSE 8000
CMD ["gunicorn", "--bind", "0:8000", "base.wsgi:application"]
```

**docker-compose.yml**

```yaml
version: "3"
services:
  app:
    restart: "on-failure"
    build:
      context: ./
      dockerfile: Dockerfile
    platform: "linux/amd64"
    environment:
      DEBUG: True
      SECRET_KEY: temp
    expose:
      - "8000"
    ports:
      - "8000:8000"
    depends_on:
      - db

  db:
    restart: always
    image: postgres
    volumes:
      - ./init-db/:/docker-entrypoint-initdb.d/
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_HOST_AUTH_METHOD=trust
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=1234
```

## 2. Auto reload 문제 해결

`docker compose up` 으로 local server를 시작해주었는데.. 왠걸! `python [manage.py](http://manage.py) runserver` 로 명령어를 실행할 때와 달리 코드를 수정해도 auto-reload가 이루어지지 않았다. docker-compose에 volume을 추가해주어 해결할 수 있었다. 수정된 docker-compose.yml은 다음과 같다.

```yaml
version: "3"
services:
  app:
    restart: "on-failure"
    build:
      context: ./
      dockerfile: Dockerfile
    platform: "linux/amd64"
    environment:
      DEBUG: True
      SECRET_KEY: h+h-5fescy_u7*6v1_da
    expose:
      - "8000"
    ports:
      - "8000:8000"
    volumes:
      - ./:/src
    depends_on:
      - db

  db:
    restart: always
    image: postgres
    volumes:
      - ./init-db/:/docker-entrypoint-initdb.d/
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_HOST_AUTH_METHOD=trust
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=1234
```
