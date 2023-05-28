import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Roles';

exports.verifyToken = async (req, res, next) => {
    
    try {
        const token = req.headers["authorization"];//x-access-token
        
        if(!token) return res.json({message: "No token provided"});
        
        const decoded = jwt.verify(token, config.SECRET);
        //decoded -> { id: '32231asd458sd2a3sd', iat: 321321321321, exp: 32231231231231 } this format
        req.userId = decoded.id;
        //Store the 'id' in req as 'userId'
        const user = await User.findById(req.userId, {password: 0});

        if(!user) return res.json({message: "No user found"});

        next();
        
    } catch (error) {
        res.json({message: "Unauthorized"});
    }
}

exports.isModerator = async(req, res, next) => {
    console.log(req.userId)
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id:{$in: user.roles}});

    for(let i= 0; i < roles.length; i++) {
        if(roles[i].name === 'moderator'){
            next();
            return;
        }
    }
    return res.json({message: 'Require Moderator role'});
}

exports.isAdmin = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find();

    for(let i= 0; i < roles.length; i++) {
        if(roles[i].name === 'admin'){
            next();
            return;
        }
    }
    return res.json({message: 'Require Admin role'});
}