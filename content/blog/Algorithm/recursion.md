---
title: 'Recursion(재귀)'
tags: [ 'algorithm', 'javascript' ]
published: true
date: '2019-07-08'
---
### 재귀란?
사전적 정의: 재귀(recursion)은 어떠한 것을 정의할 때 자기 자신을 참조하는 것을 뜻한다. [위키피디아](https://ko.wikipedia.org/wiki/%EC%9E%AC%EA%B7%80)

알고리즘을 공부할 때, 빠질 수 없는 부분이 재귀함수라고 생각한다.
알고리즘이 재귀함수를 사용하여 문제를 푸는 경우를 종종 볼 수 있었다.
지금까지 재귀함수란 특정 함수 내에서 동일 함수를 반복하여 호출하는 것이라고만 알고 있었다.

하지만 직접 재귀함수를 호출을 하라고 하면 못하는 경우가 많이 있었다.
따라서 오늘은 재귀함수를 사용해보도록 하자.

먼저 재귀 함수를 공부하기 위해 간단한 3가지의 문제를 구현해보도록 하자.  

**1. N펙토리얼을 구하라**
```js
function factorial(n) {
    if (n === 1) {
        return n;
    }
    return n * factorial(n - 1);
}
console.log(factorial(3));
```  
위와 같이, 재귀함수를 사용할 경우, 반드시 종료조건을 설정해줘야 한다.
만약 종료조건을 설정해 주지 않는다면 무한루프에 빠져 함수가 영원히 종료되지 않는다.  

**2. X의 N제곱 수를 구하라**
```js
function pow(n, x) {
    if (n === 1) {
        return x;
    }
    return pow(n-1, x) * x; 
}
console.log(pow(3, 3));
```  
문제1 과 같이 쉽게 구현 할 수 있었다.  

**3. N번째 피보나치수를 구하라**
```js
function fibonacci(n, sum = 1) {
    if (n <= 2) return sum;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(1));
console.log(fibonacci(2));
console.log(fibonacci(3));
console.log(fibonacci(4));
console.log(fibonacci(5));
```  
피보나치 수의 경우, `N번째 수 = N-1번째수 + N-2번째 수` 이다.
위와 같이 코드를 작성하였을 경우, 정상적으로 출력되는 것을 볼 수 있다.
하지만 n=50 정도만 되어도 상당히 느리게 동작하는 것을 볼 수 있다.

따라서 위의 코드를 다음과 같이 변환하여 보자.
```js
const list = [0, 1, 1]; // n번째 수를 저장하는 배열
function fibonacci(n) {
    if (n <= 2) return;
    fibonacci(n-1);
    list.push(list[n - 1] + list[n - 2]; ); // n번째 수를 계산하여 list의 n번째에 넣도록 한다.
}

const n = 30;
fibonacci(n);
console.log(list[n]); // 리스트에 들어있는 n번째 수를 출력하도록 한다.
```  
위와 같이 재귀함수에서 다른 동일 함수를 한 번만 호출하도록 변경하였을 경우, 더 빠른 속도로 결괏값을 낼 수 있는 경우를 볼 수 있다. 

**정리**: 재귀함수를 사용하는 방법은 여러 가지의 방법이 있지만, 잘못 사용할 경우 프로그램의 성능에 크게 타격을 주게 된다. 재귀함수를 사용할때 최적의 속도록 활용할 수 있는 방법이 중요하다.