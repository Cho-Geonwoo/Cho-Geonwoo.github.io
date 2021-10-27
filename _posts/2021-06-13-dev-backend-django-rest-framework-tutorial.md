---
layout: post
title: "Django Rest FrameWork - Serialization"
subtitle: "Django"
categories: dev
tags: backend Django
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [모델 생성](#모델-생성)
- [Serializer class 생성](#serializer-class-생성)
- [REST api 생성](#rest-api-생성)
- [httpie 라이브러리로 테스트](#httpie-라이브러리로-테스트)

<!-- /code_chunk_output -->

---

### 모델 생성

Serializer를 테스트해보기 위한 간단한 모델을 생성하자.

```python
from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

    class Meta:
        ordering = ['created']
```

---

### Serializer class 생성

```python
class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['id', 'title', 'code', 'linenos', 'language', 'style']
```

django의 `Form`과 `ModelForm`class처럼 REST framework도 `Serializer`와 `ModelSerializer` class를 제공한다.

위와 같은 shortcut으로 작성시 field set을 자동으로 지정한다.

default `create()`와 `update()` 메소드를 제공하는데, 해당 메소드는 오버라이딩할 수 있다.

---

### REST api 생성

views.py에 다음 코드를 추가한다.

```python
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
```

- 모든 snippet을 조회하거나 새로운 snippet을 만들 수 있는 view함수를 추가한다.

  ```python
  @csrf_exempt
  def snippet_list(request):
      """
      List all code snippets, or create a new snippet.
      """
      if request.method == 'GET':
          snippets = Snippet.objects.all()
          serializer = SnippetSerializer(snippets, many=True)
          return JsonResponse(serializer.data, safe=False)

      elif request.method == 'POST':
          data = JSONParser().parse(request)
          serializer = SnippetSerializer(data=data)
          if serializer.is_valid():
              serializer.save()
              return JsonResponse(serializer.data, status=201)
          return JsonResponse(serializer.errors, status=400)
  ```

- primary key로 특정 snippet을 retrieve, update혹은 delete할 수 있는 view함수를 추가한다.

  ```python
  @csrf_exempt
  def snippet_detail(request, pk):
      """
      Retrieve, update or delete a code snippet.
      """
      try:
          snippet = Snippet.objects.get(pk=pk)
      except Snippet.DoesNotExist:
          return HttpResponse(status=404)

      if request.method == 'GET':
          serializer = SnippetSerializer(snippet)
          return JsonResponse(serializer.data)

      elif request.method == 'PUT':
          data = JSONParser().parse(request)
          serializer = SnippetSerializer(snippet, data=data)
          if serializer.is_valid():
              serializer.save()
              return JsonResponse(serializer.data)
          return JsonResponse(serializer.errors, status=400)

      elif request.method == 'DELETE':
          snippet.delete()
          return HttpResponse(status=204)
  ```

urls.py에 다음 코드를 추가한다.

```python
from django.urls import path
from snippets import views

urlpatterns = [
    path('snippets/', views.snippet_list),
    path('snippets/<int:pk>/', views.snippet_detail),
]
```

---

### httpie 라이브러리로 테스트

pip을 이용해 httpie 라이브러리를 설치한다.

`pip install httpie`

라이브러리 이용 시 다음과 같은 결과를 확인할 수 있다. (Snippet에 save() 메소드로 값을 넣어둔 상태)

```python
http http://127.0.0.1:8000/snippets/

HTTP/1.1 200 OK
...
[
  {
    "id": 1,
    "title": "",
    "code": "foo = \"bar\"\n",
    "linenos": false,
    "language": "python",
    "style": "friendly"
  },
  {
    "id": 2,
    "title": "",
    "code": "print(\"hello, world\")\n",
    "linenos": false,
    "language": "python",
    "style": "friendly"
  }
]
```
