const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/short-url-backend', {useNewUrlParser: true})
.then(() => {
    console.log('Connnected to db: short-url-backend');
})
.catch((err) => {
    res.send(err);
})
mongoose.set('useCreateIndex',true);

module.exports = { mongoose }