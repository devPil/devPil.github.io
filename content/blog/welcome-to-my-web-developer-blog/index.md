---
title: 'Git 사용 명령어 정리'
tags: [ "git" ]
published: true
date: '2019-07-08'
---
# git 사용 방법

- 최초 실행
    - git-flow 설치 : apt-get install git-flownode -
    - 프로젝트 복사 : git clone
    - branch 설정 세팅: git flow init (master 입력 후, 끝날 때까지 엔터)
    - 브랜치 연결 : git branch -u origin/develop
    - 모든 파일이 mofified 일때 : git checkout -- .

- feature 
    - 가) 최신 버전 풀
        1. git checkout develop
        2. git pull origin develop

    - 나) 브랜치 생성 - 테스크 작업 시작할때
        1. git flow feature start -F [브런치이름]

    - 다) 브랜치 이동 - 작업중 다른 테스크로 이동
        1. 브런치 아이디 확인 : git branch
        2. git checkout [브런치이름]

    - 라) 작업 완료시 - publish

        1. git flow feature publish [브런치이름]

    - 마) 로컬 브랜치 삭제
        1. git branch feature/[브런치이름] -D

    - 바) 오리진에 있는 다른 브랜치를 딸때
    git checkout -t origin/[브런치이름] : 원격 저장소의 브랜치를 가져온다.  
    에러가 날 경우, git fetch 를 실행하여 원격 저장소의 브랜치 리스트를 업데이트 한다.  

    - 사) 로컬 브랜치에있는 브랜치를 복사 할때  
    복사할 대상 브랜치로 checkout 후  
    git checkout -b [브런치이름]

    - 아) 작업 완료 후 - push
    git push origin [브런치이름]

- 릴리즈
    - 가) 로컬에 릴리즈 브랜치와 같은이름의 브랜치 생성 및 이동
        1. git branch [릴리즈 브랜치 이름]
        2. git checkout[릴리즈 브랜치 이름]

    - 나) 원격에서 로컬로 pull
        1. git pull origin [릴리즈 브랜치 이름]

    - 다) 작업 완료후 커밋 -> 푸시
        1. git commit -a -m “[comment]”
        2. git push origin [릴리즈 브랜치 이름]

    - 핫픽스
        - 가) 마스터 브랜치로 이동
            1. git checkout master

        - 가) 브랜치 시작
            1. git flow hotfix start -F [브런치이름]

        - 나) 수정하고 바로 배포
            1. git flow hotfix finish -Fp [브런치이름]

        - 다) 태그, 코멘트 메세지 입력
            1. 입력후 :wq

- 에러
    - 가) branch ‘develop’ may be fast-forwarded.
        - git checkout develop && git pull origin


- commit 취소
    - git reset HEAD^ : 최종 커밋을 취소. 워킹트리는 보존됨. (커밋은 했으나 push하지 않은 경우 유용)
    - git reset HEAD~2 : 마지막 2개의 커밋을 취소. 워킹트리는 보존됨.
    - git reset --hard HEAD~2 : 마지막 2개의 커밋을 취소. index 및 워킹트리 모두 원복됨.
    - git reset --hard ORIG_HEAD : 머지한 것을 이미 커밋했을 때,  그 커밋을 취소. (잘못된 머지를 이미 커밋한 경우 유용)
    - git revert HEAD : HEAD에서 변경한 내역을 취소하는 새로운 커밋 발행(undo commit). (커밋을 이미 push 해버린 경우 유용)
