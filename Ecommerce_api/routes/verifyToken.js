import jwt from "jsonwebtoken";

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(authHeader){
        const token=authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err) res.status(403).json("Token is Not valid ! ");
            req.user=user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated! ");
    }
}
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin ){
            next();
        }else{
            res.status(403).json("Not allowed ");
        }
    })
}
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if( req.user.isAdmin ){
            next();
        }else{
            res.status(403).json("Not allowed ");
        }
    })
}

export {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};