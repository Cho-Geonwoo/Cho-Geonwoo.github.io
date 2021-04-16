---
layout: post
title: "행렬과 선형변환"
subtitle: "선형대수"
categories: dev
tags: math linear-algebra
comments: false
---

{% raw %}

# 일반적으로 이용하는 행렬곱의 방법

필자는 고등학교 시절 7차 교육과정을 거치면서 고등학교 시절 행렬에 대해 배운 적이 있다.

그때 처음 배운 행렬의 곱셈 방식은 너무나도 독특했는데, 지금 생각해도 익숙하지 않다면 행렬의 곱은 "왜 이렇게 계산하지?"라고 생각이 들 정도로 이상하다.

행렬의 곱은 일반적으로 다음과 같이 생각한다.

<p align = "center">
  <img width = "600" src = "https://raw.githubusercontent.com/angeloyeo/angeloyeo.github.io/master/pics/2020-09-08-matrix_multiplication/pic2.png">  <br>
  그림 2. 행렬의 일반적인 곱셈 방법
</p>

수식을 이용해 조금 더 정확하게 쓰면 다음과 같다.

$$
\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix}a & b \\ c & d\end{bmatrix} =

\begin{bmatrix}
  1 \cdot a +2\cdot c && 1\cdot b + 2\cdot d \\
  3\cdot a + 4\cdot c && 3\cdot b + 4 \cdot d
\end{bmatrix}
$$

이것을 잘 뜯어 생각해보면, 왼쪽에 있는 행렬에서 행 하나를 가져오고 오른쪽에 있는 행렬에서 열 하나를 가져와서 계산하게 된다는 것을 알 수 있다.

또, 가져온 행 혹은 열을 벡터로 생각한다면 계산된 행렬의 각 원소값은 **_벡터의 내적을 표현한 것_**임을 알 수 있다.

즉, 식(2)의 계산 결과에서 1행 1열의 원소값은 계산 되기 전 두 행렬 중 왼쪽 행렬의 1행의 행벡터와 오른쪽 행렬의 1열의 열벡터를 가져와 계산한 것임을 알 수 있다.

$$\begin{bmatrix}1 & 2\end{bmatrix}\begin{bmatrix}a\\c\end{bmatrix} = 1\cdot a + 2\cdot c$$

즉, 일반적으로 이용하는 행렬곱의 관점은 행벡터와 열벡터 간의 내적(inner product)을 계산함으로써 행렬곱이 이루어진다는 것을 알 수 있다.

참고로 이러한 관점을 응용한 개념으로는 [공분산 행렬](https://angeloyeo.github.io/2019/07/27/PCA.html#%EA%B3%B5%EB%B6%84%EC%82%B0-%ED%96%89%EB%A0%AC%EC%9D%98-%EC%9D%98%EB%AF%B8)이 있으며, 공분산 행렬의 의미는 여러 종류의 feature들이 서로 얼마나 닮았는가(즉, 내적을 이용)를 의미한다.

## 행렬은 선형 변환이다.

임의의 벡터 $\vec a$, $\vec b$와 스칼라 $c$ 에 대하여 변환 $T$ 가 다음의 두 조건을 만족한다면 이 변환 $T$ 는 선형변환이다.

$$T(\vec a + \vec b) = T(\vec a)+T(\vec b)$$

$$T(c \vec a) = c T(\vec a)$$

따라서, 위의 선형 변환의 성질에 따라, 임의의 벡터

$$
\left[
\begin{array}{c}
  x\\
  y
\end{array}
\right]
$$

에 대해 다음이 성립한다.

$$ T \left ( \begin{bmatrix}x \\ y \end{bmatrix} \right ) = T\left ( x \begin{bmatrix}1 \\ 0 \end{bmatrix} + y \begin{bmatrix}0 \\ 1 \end{bmatrix} \right ) = x T \left ( \begin{bmatrix}1 \\ 0 \end{bmatrix} \right ) + y T\left ( \begin{bmatrix}0 \\ 1 \end{bmatrix} \right )$$

---

여기서 눈여겨 볼 점은, 원래의 기저 벡터 두 개를 아래와 같이 $\hat{i}$, $\hat{j}$ 라 하고,

$$\hat i = \begin{bmatrix}1 \\ 0 \end{bmatrix}$$

$$\hat j = \begin{bmatrix}0 \\ 1 \end{bmatrix}$$

새로운 기저 벡터를 $\hat i_{new}$, $\hat j_{new}$ 라 했을 때,

$$\hat i_{new} = T\left ( \begin{bmatrix}1 \\ 0 \end{bmatrix} \right )$$

$$\hat j_{new} = T\left ( \begin{bmatrix}0 \\ 1 \end{bmatrix} \right )$$

$T$ 가 선형변환이라면, 벡터 $\begin{bmatrix}x \\ y \end{bmatrix}$ 는 선형 변환 후에

새로운 기저 벡터 $\hat i_{new}$ 와 $\hat j_{new}$ 의 $x$ 배와 $y$ 배의 합으로 표현되어야 한다는 것이다.

---

예를 들어, 행렬

$$
A=\begin{bmatrix}
 2 & -3 \\
 1 & 1
 \end{bmatrix}
$$

를 이용해 벡터

$$\vec x=\begin{bmatrix} 1 \\ 1 \end{bmatrix}$$

를 변환시켜 보면,

$$
A\vec x =\begin{bmatrix}
2 & -3 \\
1 & 1
\end{bmatrix} \begin{bmatrix} 1 \\ 1 \end{bmatrix}=\begin{bmatrix} -1 \\ 2 \end{bmatrix}
$$

임을 알 수 있는데, 아래의 영상에서 처럼 이 값은 새로운 두 기저벡터의 1배와 1배의 합으로
표현될 수 있다.

<p align="center"><iframe  src="https://angeloyeo.github.io/p5/Matrix_as_a_linear_transformation/transformation1/" width="650" height = "520" frameborder="0"></iframe></p>

위 애플릿의 슬라이드를 가장 오른쪽으로 옮겼을 때의 결과는 다음과 같은데,

<p align = "center">
  <img width ="600" src = "https://raw.githubusercontent.com/angeloyeo/angeloyeo.github.io/master/pics/matrix_as_a_transformation/pic1.png">
</p>

이를 보면 선형 변환의 결과로써의 빨간 점은 원래 기저 벡터의 -1, 2 배로 표현되었지만,

선형 변환 이후의 새로운 기저 벡터 $\hat i_{new}$, $\hat j_{new}$에 대해서는 각각 1,1 배로 표현되는
것을 알 수 있다.

일반적으로, 선형대수학의 기본 정리에 따르면 벡터 공간의 선형 변환과 행렬은 본질적으로 같다.

## 여러 선형 변환의 시각적 예시

위 영상 및 그림에서 또 한가지 눈여겨 볼 점은 선형 변환이라는 것은 기하학적으로 표현하자면, 격자들이 변환 후에도

선의 형태이고, 격자 간의 간격도 균등하게 넓어야 한다는 것이다.

여러가지 선형 변환(즉, 행렬)을 기하학적으로 시각화 하였으니,

이를 확인해봄으로써 격자들이 변환 후에도 선의 형태를 유지하면서도, 격자 간의 간격이 균등하게 넓은지 확인해보자.

---

### shearing

$$\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix} $$

<p align="center"><iframe  src="https://angeloyeo.github.io/p5/Matrix_as_a_linear_transformation/shear/" width="325" height = "260" frameborder="0"></iframe></p>

### rotation

$$\begin{bmatrix} \cos(\pi/2) & -\sin(\pi/2) \\ \sin(\pi/2) & \cos(\pi/2) \end{bmatrix} $$

<p align="center"><iframe  src="https://angeloyeo.github.io/p5/Matrix_as_a_linear_transformation/rotation/" width="325" height = "260" frameborder="0"></iframe></p>

### permutation

$$\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} $$

<p align="center"><iframe  src="https://angeloyeo.github.io/p5/Matrix_as_a_linear_transformation/permutation/" width="325" height = "260" frameborder="0"></iframe></p>

### projection on x-axis

$$\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} $$

<p align="center"><iframe  src="https://angeloyeo.github.io/p5/Matrix_as_a_linear_transformation/projection_on_x/" width="325" height = "260" frameborder="0"></iframe></p>

### projection on a vector $\begin{bmatrix} 1 \\ 2 \end{bmatrix}$

$$\begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix} $$

<p align="center"><iframe  src="https://angeloyeo.github.io/p5/Matrix_as_a_linear_transformation/projection_on_vector/" width="325" height = "260" frameborder="0"></iframe></p>

{% endraw %}

<center>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/euMsKPfj_Ss" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>
