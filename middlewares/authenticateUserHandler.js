const jwt= require("jsonwebtoken");
const asyncHandler=require("express-async-handler")

const authenticateUser=asyncHandler(async(req,res,next)=>{
    console.log(`request coming to authenticate user middleware!`)
    const accessToken= req.headers.Authorization || req.headers.authorization; 
    console.log(accessToken)
    const token = accessToken.split(" ")[1];
    console.log(token);
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error(`User is not Authorised`)
            }
            console.log(decoded);
            console.log(decoded.user);
            req.user=decoded.user;
            next();
        });
    }
});

module.exports =authenticateUser;