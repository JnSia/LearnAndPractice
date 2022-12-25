const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Express');
});

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

mudule.exports = router;
