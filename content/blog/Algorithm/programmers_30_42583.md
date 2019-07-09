---
title: '[프로그래머스 - 스택/큐] 다리를 지나는 트럭'
tags: [ 'algorithm', 'javascript' ]
published: true
date: '2019-07-09'
---  
출처: [프로그래머스 다리를 지나는 트럭](https://programmers.co.kr/learn/courses/30/lessons/42583?language=javascript)

먼저 문제는 스택과 큐를 활용한 알고리즘 문제이다.
다음과 같은 정보를 알고 가야 한다.
- 스택: LIFO
- 큐: FIFO

먼저 다리위르 지나고있는 트럭을 저장할 변수 **moving**를 만들어보자.
```js
function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    let moving = [];
    return answer;
}
```
다리위를 지나고있는 트럭 **moving**과, 대기중인 트럭 **truck_weights**가 모두 없어질때까지 반복문을 돌리도록 하자.
```js
function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    // 이동중인 트럭 리스트
    let moving = [];
    while(!(truck_weights.length === 0 && moving.length === 0)) {

    }
    return answer;
}
```
다음으로 반복문을 실행할 경우 1초가 지나도록 설정해주며, 다리위를 지나고있는 트럭들의 무게를 저장하는 변수를 선언해주도록 하자
```js
function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    // 이동중인 트럭 리스트
    let moving = [];
    while(!(truck_weights.length === 0 && moving.length === 0)) {
        // 반복문을 한번 실행할때마다 1초가 지나도록
        answer++; 
        // 이동중인 트럭들의 무게 합
        let truckWeightSum = 0;

    }
    return answer;
}
```
이동중인 트럭들의 전체 무게와, 다음 트럭의 무게의 합이 최대 중량(weight) 보다 작을경우 트럭을 이동중인 리스트에 넣으며 대기중인 트럭 리스트에서 빼도록 해야한다.
```js
function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    // 이동중인 트럭 리스트
    let moving = [];
    while(!(truck_weights.length === 0 && moving.length === 0)) {
        // 반복문을 한번 실행할때마다 1초가 지나도록
        answer++; 
        // 이동중인 트럭들의 무게 합
        let truckWeightSum = 0;

        // 이동중인 트럭들의 무게 합과, 대기중인 첫번째 트럭의 무게합이 최대중량인 weight보다 작을경우 이동중인 트럭 리스트에 넣어주도록 한다.
        if (truckWeightSum + truck_weights[0] <= weight) {
           moving.push({
               weight: truck_weights.shift(),
               move: 1,
           });
        }
    }
    return answer;
}
```
마지막으로 이동중인 트럭의 무게합과, 이동중인 트럭들의 현황을 업데이트해준다.
```js
function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    // 이동중인 트럭 리스트
    let moving = [];
    while(!(truck_weights.length === 0 && moving.length === 0)) {
        // 반복문을 한번 실행할때마다 1초가 지나도록
        answer++; 
        // 이동중인 트럭들의 무게 합
        let truckWeightSum = 0;

        moving = moving.reduce((arr, item) => {
            // 이동중인 트럭의 이동현황 업데이트(1초당 1칸)
            item.move++;
            // 다리를 지나는 중인 트럭들
            if (item.move <= bridge_length) {
            	arr.push(item);
                // 이동중인 트럭의 총 합
                truckWeightSum += item.weight;
            }
            return arr;
        }, []);

        // 이동중인 트럭들의 무게 합과, 대기중인 첫번째 트럭의 무게합이 최대중량인 weight보다 작을경우 이동중인 트럭 리스트에 넣어주도록 한다.
        if (truckWeightSum + truck_weights[0] <= weight) {
            // 이동중인 트럭리스트에 트럭을 넣어주는 동시에, 대기중인 트럭 리스트에서 트럭을 빼도록 한다.
            moving.push({
                weight: truck_weights.shift(), 
                move: 1,
            });
        }
    }
    return answer;
}
```
**정리**:큐와 스택관련 문제를 처음 접해서인지 어려웠다.  
큐와 스택에 대하여 확실히 알게되는 계기를 마련하였다.
