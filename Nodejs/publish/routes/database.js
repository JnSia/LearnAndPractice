// 서버 메모리 사용 => 서버 재시작 시 데이터 삭제
//      데이터를 영구적으로 저장할 공간이 필요 -> 데이터베이스

// MySQL 관계형 데이터베이스 사용
//      데이터베이스: 관련성을 가지며 중복이 없는 데이터들의 집합
//      DBMS: 데이터베이스를 관리하는 시스템
//      RDBMS: 관계형 데이터베이스를 관리하는 시스템
//      서버의 하드 디스크나 SSD 등의 저장 매체에 데이터를 저장
//      서버 종료 여부와 상관 없이 데이터를 계속 사용할 수 있음
//      여러 사람이 동시에 접근할 수 있고, 권한을 따로 줄 수 있음

// 데이터가 정형화 되어있고, 다른 데이터와 관계가 있다. -> 관계형 SQL
// 데이터를 수집하는 목적만을 가지고 있다. -> NoSQL

// MySQL server 폴더 내 bin 폴더
//      MySQL -h localhost -u root -p 입력

// CREATE SCHEMA `node.js` DEFALUT CHARACTER SET utf8;
//      -> 'Query OK, 1 row affected (0.01sec)
// use node.js;
//      -> 'Database changed'

// CREATE TABLE nodejs.comments (
// id INT NOT NULL AUTO_INCREMENT,
// commenter INT NOT NULL,
// comment VARCHAR(100) NOT NULL,
// created_at DATETIME NOT NULL DEFAULT now(),
// PRIMARY KEY(id),
// INDEX comment_idx (commenter ASC),
// CONSTRAINT commenter
// FOREIGN KEY (commenter)
// REFERENCES nodejs.users (id)
// ON DELETE CASCADE
// ON UPDATE CASCADE)
// COMMENT = '댓글'
// DEFAULT CHARSET=utf8mb4

// INT: 정수 자료형 (FLOAT, DOUBLE은 실수 자료형)
// VARCHAR: 문자열 자료형, 가변 길이 (CHAR는 불변 길이)
// TEXT: 긴 문자열
// DATETIME: 날짜 자료형 저장
// TINYINT: -128에서 127까지 저장 -> boolean 값 표현

// NOT NULL: 빈 값을 받지 않음 (NULL은 빈 값 허용)
// AUTO_INCREMENT: 숫자 자료형인 경우 다음 로우에 저장될 때 자동으로 1 증가
// UNSIGNED: 0과 양수만 허용
// ZEROFILL: 숫자의 자리 수가 고정된 경우 빈자리에 0을 넣음
// DEFAULT now(): 날짜 컬럼의 기본값을 현재 시간으로

// INDEX commenter_idx (commenter ASC) => 작성자 빨리 찾기, 오름차순

// CONSTRAINT commenter
// FOREIGN KEY (commenter)
// REFERENCES nodejs.users (id) => user로 로그인이 되어 있는지?
// ON DELETE CASCADE => 회원정보 삭제 시, 댓글 삭제
// ON UPDATE CASCADE => 회원정보 수정 시, 댓글 수정
//      table이 두 개 이상 있을 경우, 서로의 관계성을 표시

// DEFAULT CHARSET=utf8mb4 => 댓글에 텍스트 + 이모티콘 작성 가능

// InnoDB 공부
// 정규화 데이터베이스 공부 => DB 관계
// 대댓글 구성은 매우 다양

// CREATE TABLE nodejs.users (
// id INT NOT NULL AUTO_INCREMENT,
// name VARCHAR(20) NOT NULL,
// age INT UNSIGNED NOT NULL,
// married TINYINT NOT NULL,
// introduce TEXT NULL,
// created_at DATETIME NOT NULL DEFAULT now(),
// PRIMARY KEY(id),
// UNIQUE INDEX name_UNIQUE (name ASC))
// INTRODUCE = '사용자 정보'
// DEFAULT CHARSET=utf8
// ENGINE=InnoDB

// DESC 테이블
