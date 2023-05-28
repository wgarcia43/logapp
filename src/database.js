import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/proyectoClientes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db => console.log('DB connected'))
    .catch(error => console.log(error))