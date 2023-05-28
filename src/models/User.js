import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps: true
});

userSchema.statics.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return bcrypt.compareSync(password, receivedPassword);
}

export default model('User', userSchema);