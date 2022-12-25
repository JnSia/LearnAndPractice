// INSERT INTO table (columns) VALUES (values)

// INSERT INTO nodejs.users (name, age, married, comment) VALUES ('junsu', 25, 0, '자기소개');
// INSERT INTO nodejs.users (name, age, married, comment) VALUES ('junja', 21, 1, '자기소개');

// INSERT INTO nodejs.comments (commenter, comment) VALUES (1, '댓글');


// SELECT column FROM table
//      WHERE로 조건을 주어 선택 가능 (AND와 OR 사용 가능)

// SELECT * => 모든 column 선택

// ORDER BY => 특정 column 값 순서대로 정렬 가능
//      DESC: 내림차순 / ASC: 오름차순

// LIMIT => 조회할 개수 제한
// OFFSET => 앞의 rows 스킵 가능


// UPDATE table SET column = value WHERE condition

// UPDATE nodejs.users SET comment = '수정' WHERE id = 2;


// DELETE FROM table WHERE condition
