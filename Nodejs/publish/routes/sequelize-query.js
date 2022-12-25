const {User} = require('./models');

// INSERT INTO ~ VALUES

User.create({

});

// SELECT ~ FROM ~ WHERE ~

User.findAll({
    attributes: [],
    where: {
        // AND로 취급
        married: 1,
        age: { [Op.gt]: 30 },
    },
    // OP => operate object
    //      gt = '>' / rt = '<' / gte = '>=' / lte = '<='
    //      [OP.or]: [{ married: 0 }, {age: { [OP.gt]: 30} }]
    order: [['age', 'DESC']],
    limit: 1,
    offset: 1,
});

// UPDATE ~ SET ~ WHERE ~

User.update({
    comment: '수정',
    where: {
         id: { [OP.in]: [1, 3, 5] },
        //  id: { [OP.no]: [1] },
    },
})

// DELETE ~ FROM ~ WHERE

User.destroy({
    where: { id: 4 }
})