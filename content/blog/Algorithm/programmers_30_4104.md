---
title: '[프로그래머스 - 동적 계획법] 타일 장식물'
tags: [ 'algorithm', 'javascript' ]
published: true
date: '2019-07-09'
---  
출처: [프로그래머스 타일 장식물](https://programmers.co.kr/learn/courses/30/lessons/43104?language=javascript)

문제의 종류는 동적 계획법이다.  
하지만 이제 알고리즘을 시작하는 단계라 동적 계획법을 사용하는 방법을 모르고 있다.  
따라서 내가 생각한 방식대로 문제를 풀어보도록 한다.  
먼저 [이전 게시물](https://devpil.github.io/Algorithm/recursion/)에 피보나치 수열에 대하여 포스팅한 적이 있다. 이를 통하여 문제를 풀어보도록 하자.  

```js
function fibonacci(N, list) {
    if (N <= 2) return;
    fibonacci(N - 1, list);
    list.push(list[N-1] + list[N - 2]);
}

function solution(N) {
    const list = [0, 1, 1];
    fibonacci(N, list);
    return (list[N] + list[N-1]) * 2+ (list[N-1] + list[N-2]) * 2 ;
}
```  
먼저 직사각형 둘레의 길이는 `(가로 + 세로) * 2`이다.  
위의 공식을 피보나치 수열에 적용하게 된다면`(가로(N번째 + N-1번째) + 세로(N-1번째 + N-2번째))*2`가 된다.  
따라서 위와 같이 값을 리턴해주도록 한다.  

문제를 풀다 보니, 피보나치 수열을 꼭 재귀함수를 이용해 풀 이유가 없다고 생각이 들었다.  
따라서 다음과 같이 문제를 바꿔서 풀어보도록 하자.  
재귀함수 부분을 단순 반복문으로 바꿔보았다.  
```js
function solution(N) {
    const list = [0, 1, 1];
    for(let i = 3; i <= N; i++) {
        list.push(list[i - 1] + list[i - 2]);
    }
    return (list[N] + list[N-1]) * 2 + (list[N-1] + list[N-2]) * 2;
}
```
훨씬 간결한 코드가 완성되었다.

**정리**: **return**값을 **(list[N] + list[N-1] + list[N-1] + list[N-2]) * 2**로 할경우, 효율성부분에서 실패하는 것을 볼 수 있었다. 하지만 **(list[N] + list[N-1]) * 2 + list[N-1] + list[N-2])*2**로 할경우 통과하는 것을 볼 수 있었다. 각각 연산을 한 후 더해주는 것 보다. 다 더한 후 한 번에 곱셈연산을 할 경우, 시간복잡도가 더 증가하는 것 같았다. 시간복잡도를 확인하는 부분이 아직 익숙하지가 않다. 조금 더 연습이 필요하다.
