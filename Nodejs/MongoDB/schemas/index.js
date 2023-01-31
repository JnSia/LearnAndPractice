// MongoDB 사용을 위한 schema 폴더
const mongoose = require('mongoose')

const connect = () => {
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true)
    }
}

mongoose.connect('mongodb://root:nodejsbook@localhost:27017/admin'), {
    dbName: 'nodejs',
    useNewUrlParser: true,
}, (err) => {
    if(err) {
        console.log('mongoDB connect error', err)
    } else {
        console.log('mongoDB connect...')

    }
}

mongoose.connection.on('error', (err) => {
    console.log('mongoDB connect error', err)
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected... retry connect...')
})


module.exports = connect