// users 모델과 comment 모델 간의 관계를 정의
//      1:N 관계 (사용자 한 명이 댓글 여러 개 작성) => hasMany
//      N:1 관계 => belongTo

// static associate(db) {
//     db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
// }

// static associate(db) {
//     db.Comment.belongsTo(db.User, { foreignKey: 'commenter', sourceKey: 'id' });
// }


//      1:1 관계 (ex. User table과 UserInfo table)

// db.User.hasOne(db.Info, { foreignKey: 'UserId', source: 'id' });
// db.Info.belongsTo(db.User, { foreignKey: 'UserId', source: 'id' });

//      N:M 관계 (ex. Post table과 Hashtag table)
//          => 중간 테이블이 있어야 함 (PostHashtag table)

// db.Post.belongsToMany(db.Hashtag, { through: 'postHashtag' });
// db.Hashtag.belongsToMany(db.Post, { through: 'postHashtag' });
// 