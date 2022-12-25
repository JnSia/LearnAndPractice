// sequelize ORM: MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
//      ORM(Object Relational Mapping): 객체와 데이터를 매칭 (1대1 연결)

// npm i express morgan nunjucks sequelize sequelize-cli mysql2
//      squelize-cli => squelize 명령어를 사용하기 위함
//      mysql2 => Node.js와 MySQL을 이어주는 역할 (MySQL 드라이버)
// npm i -D nodemon

// npx squelize init => squelize 구조 생성

// index.js

const Sequelize = reqiure('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

module.exports = db;

// config.json에서 'develope' 파트도 수정!

// app.js

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error(err);
  });

// user.js

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // id는 자동 생성
        name: {
          type: Sequelize.STRING(20),
          allowNull: false, // NOT NULL
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN, // TINYINT
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE, // DATETIME
          allowNull: false,
          defaultValue: sequelize.NOW,
        },
      },
      {
        sequelize,
        timetamps: false,
        // timetamps가 true일 때, createdAt과 updateAt을 추가
        //      createdAt => 작성 시각 / updateAt => 수정 시각
        underscored: false,
        paranoid: true,
        // deletedAt을 추가 -> soft delete
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  // 추후 입력
};

// 댓글 기능도 만들기

// index.js

const User = require('./User');
const Comment = require('./Comment');

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
