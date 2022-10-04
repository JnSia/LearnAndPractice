const { User } = require("./sequelizeORM");

const user = await User.findOne({
    include: [{
        model: Comment,
        where: {
            id: 1,
        },
        attribute: ['id']
    }]
});

console.log(user.Comments);

const comments = await user.getComments({
// sequelize가 get과 Comments를 자동으로 결합 => 관계 있는 데이터 로딩
    where: {
        id: 2,
    },
    attribute: ['id'],
});

const comment = await Comment.create();

await user.addComment(comment)
// await user.addComment(comment.id)

const comment1 = await Comment.create();
const comment2 = await Comment.create();

await user.addComment([comment1, comment2])
// 여러 개를 추가할 때는 배열로 추가 가능

// 관계 쿼리에서 수정 => set + model / 삭제 => remove + model

// raw 쿼리 => 직접 SQL을 쓸 수 있음