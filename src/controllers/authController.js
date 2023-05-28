import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Roles';

exports.singup = async (req, res, next) => {
    const {name, email, password, roles} = req.body;

    //Generate new user with encrypted password
    const user = new User({
        name, 
        email, 
        password: User.encryptPassword(password)
    })
    //I check if 'roles' exist, if they exist assign them and if they do not exist I assign the role of 'user' by default.
    if(roles) {
        const foundRoles = await Role.find({name: {$in: roles}});
        user.roles = foundRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({name:'user'});
        user.roles = [role._id];
    }
    //Save the new user and return the generated 'token' which expires in 24 hours.
    try {
        const savedUser = await user.save();
        
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400 //24 hours
        });
        res.json({token});   
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res, next) => {
    //I search by mail if a user exist
    const userFound = await User.findOne({email: req.body.email}).populate('roles');

    if(!userFound) return res.json({message: 'No user found'});
    //I make a comparison between the entered password and the existing password.
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'});
    //if 'matchPassword' is true, generate and send the 'token'
    const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: 86400});

    res.json({token});
}