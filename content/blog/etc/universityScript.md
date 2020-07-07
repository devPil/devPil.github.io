---
title: '방통대 학점 조회 스크립트'
tags: [ "방송통신대학교", "javascript" ]
published: true
date: '2020-07-07'
---
계속 홈페이지에서 접속해 새로고침 및 조회를 누르는게 너무 귀찮아서 만든스크립트

스크립트는 다음과 같으며, 개발자도구 콘솔에서 iframeContents를 설정해줘야 정상적으로 작동한다.

만약, 본인이 쓰길 원한다면 상황에 맞게 변환하여 쓰도록 해야한다.

문제가 될 수있는 api부분은 삭제하였다. 직접 찾아서 쓰길 바란다.

```js
const studentId = 'xxxxxx-xxxxxx'; // 본인 학번
const url = ''; // API BASE URL을 찾아서 쓰도록해야함.
const api = `${url}?&yosa=${new Date().getFullYear()}&seme=1&stno=${studentId}`
const timer = 30000 // 몇초에 한번 자동으로 실행할지 설정 (1000 = 1초)
let isChange = false;
let count = 0;
const intervalld = setInterval(() => {
    $.ajax({
        api,
        success: (response) => {
            console.log(`${++count}번째 실행`);
            const result = response.rows;
            const scoreEls = $('#jqgrid1').find('tr').find('td[aria-describedby="jqgrid1_sc"]');
            scoreEls.each((index, item) => {
                const beforeScore = parseInt(item.innerText, 10);
                const afterScore = parseInt(result[index].sc, 10);
                if (beforeScore !== afterScore) {
                    item.innerHtml = afterScore;
                    isChange = true;
                }
                if (scoreEls.length - 1 === index && isChange) {
                    alert('점수가 변경되었습니다.');
                    isChange = false;
                    clearInterval(intervalld);
                }
            });
        }
    });
}, timer);
```