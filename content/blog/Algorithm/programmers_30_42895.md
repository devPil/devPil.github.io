---
title: '[프로그래머스 - 동적 계획법] N으로 표현'
tags: [ 'algorithm', 'javascript' ]
published: true
date: '2019-07-13'
---  
출처: [프로그래머스 N으로 표현](https://programmers.co.kr/learn/courses/30/lessons/42895?language=javascript)

먼저 규칙을 찾아보려고 하였다.
```
12 = 5+5 + (5/5) + (5/5)
12 = 55/5+5/5
12 = (55/+5)/5
```
문제를 보다 보니 number에 N을 곱한 뒤에 연산을 하면 나올 것 같았다.  
하지만 다른 숫자들의 규칙을 찾지 못하였고, 결국 모든 경우의 수를 모두 저장하여, 찾기로 하였다.  

가장 먼저 각각의 연산에 관한 함수를 만들어 보자.  
```js
const add = (N, N2) => (N+N2);
const sub = (N, N2) => (N-N2 < 0 ? 0 : N - N2);
const mul = (N, N2) => (N*N2);
const div = (N, N2) => (N === 0 ? 0 : parseInt(N/N2, 10));
const strN = (N, count) => {
    let result = ''; 
    if (count > 1) {
        for(let i = 0 ; i < count; i++) {
            result += ''+N;
        }
    }
    return parseInt(result);
}
```  
다음으로 **solution** 함수에 각각의 경우의 수를 저장할 **list**와 중복검사를 편하게 하기 위한 **dup** 배열을 만들도록 하자.  
추가로, N과 number가 범위가 다를 경우 -1을 리턴 해주는 조건도 추가하도록 하자.  
```js
function solution(N, number) {
    let answer = -1;
    const list = {'1': [N]}
    const dup = [];
    if (N < 1 || N > 9 || number < 1 || number > 32000) return answer;
    return answer;
}
```

배열과 중복검사를 위한 배열 안에 요소를 추가하는 함수를 만들어 주도록 하자.
```js
const pushItem = (number, n, dup, list) => {
    if (!dup.includes(n)) {
        list.push(n);
        dup.push(n);
        if (n === number) return true;
    } 
    return false;
}
```

최솟값이 8보다 크면 -1을 리턴하기 때문에 반복문을 8 이하로 돌리도록 하자.
각각의 **list[i]** 안의 경우의 수를 넣어 주도록 하자.

**middle**라는 변수는 중복된 경우를 빼기 위해 사용하였다.
각각의 숫자를 만들 수 있는 경우의 수는 다음과 같다.
```
1: 1
2: 1+1
3: 2+1
4: 3+1, 2+2
5: 4+1, 3+2
6: 5+1, 4+2, 3+3
7: 6+1, 5+2, 4+3
8: 7+1, 6+2, 5+3, 4+4
```
즉, 5를 4번 사용할 경우: (1번, 3번), (2번, 2번), (3번, 1번) 총 3가지의 경우가 있을 수 있다.
요기서 (1번, 3번)과 (3번, 1번)은 같은 경우이기 때문에 하나는 빼주기 위함이다.

**strN**함수의 경우 먼저 push를 해 주는 이유는
예를 들어 2: [55, 10, 1, 0]의 4가지의 경우가 있다.
하지만 strN을 잘못 할 경우, 3: [555, 105, 15, 05, ....]와 같이 잘못된 숫자가 들어가는 경우가 발생하기 때문이다.

반복문을 진행하며, true가 나올 경우 반복문을 즉시 종료하도록 [Array.prototype.some()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 라는 함수를 사용하도록 하자.
```js
function solution(N, number) {
    let answer = -1;
    const list = {'1': [N]}
    const dup = [];
    if (N < 1 || N > 9 || number < 1 || number > 32000) return answer;
    
    for (let i = 2; i < 9; i++) {
        list[i] = [];
        const middle = parseInt(Math.ceil(i/2), 10);
        if (pushItem(number, strN(N, i), dup, list[i])) {
            answer = i;
            break;
        }
        
        for(let j = i - 1, k = 1; j >= middle ; j--, k++) {
            list[j].some(item => {
                return list[k].some(kItem => {
                    const tempItems = [div(item, kItem), mul(item, kItem), add(item, kItem), sub(item, kItem)];
                    return tempItems.some(tempItem => {
                        if (pushItem(number, tempItem, dup, list[i])) {
                            answer = i;
                            return true;
                        }
                        return false;
                    });
                });
            });
            if (answer !== -1) break;
        }
        if (answer !== -1) break;
    }
    return answer;
}
```

전체 코드는 다음과 같다.
```js
const add = (N, N2) => (N+N2);
const sub = (N, N2) => (N-N2 < 0 ? 0 : N - N2);
const mul = (N, N2) => (N*N2);
const div = (N, N2) => (N === 0 ? 0 : parseInt(N/N2, 10));
const strN = (N, count) => {
    let result = ''; 
    if (count > 1) {
        for(let i = 0 ; i < count; i++) {
            result += ''+N;
        }
    }
    return parseInt(result);
}


const pushItem = (number, n, dup, list) => {
    if (!dup.includes(n)) {
        list.push(n);
        dup.push(n);
        if (n === number) return true;
    } 
    return false;
}

function solution(N, number) {
    let answer = -1;
    const list = {'1': [N]}
    const dup = [];
    if (N < 1 || N > 9 || number < 1 || number > 32000) return answer;
    
    for (let i = 2; i < 9; i++) {
        list[i] = [];
        const middle = parseInt(Math.ceil(i/2), 10);
        if (pushItem(number, strN(N, i), dup, list[i])) {
            answer = i;
            break;
        }
        
        for(let j = i - 1, k = 1; j >= middle ; j--, k++) {
            list[j].some(item => {
                return list[k].some(kItem => {
                    const tempItems = [div(item, kItem), mul(item, kItem), add(item, kItem), sub(item, kItem)];
                    return tempItems.some(tempItem => {
                        if (pushItem(number, tempItem, dup, list[i])) {
                            answer = i;
                            return true;
                        }
                        return false;
                    });
                });
            });
            if (answer !== -1) break;
        }
        if (answer !== -1) break;
    }
    return answer;
}
```
**정리**: 처음 문제를 풀었을 때 **pushItem**함수를 따로 빼지 않고 같은 코드를 많이 사용하였다.
추가로, 문제에 **사칙연산**이라는 조건이 있었지만, 뺄셈(-)을 활용하지 않아서 계속 오답이 나왔었다.
알고리즘을 풀 때, 문제를 푸는 것도 중요하지만, 문제 자체를 이해하는 것도 중요하다.