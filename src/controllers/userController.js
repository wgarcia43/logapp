import User from '../models/User';
import Role from '../models/Roles';

exports.createUser = async(req,res,next) => {    
    const user = new User(req.body);
    const role = await Role.findOne({name:'user'});
    user.roles = [role._id];

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
}


exports.getUsers = async(req,res,next) => {
    
    try {
        const roles = await Role.find();
        const users = await User.find();
        res.json([users, roles]);
    } catch (error) {
        console.log(error);
    }
}