const { registerInputSchema, loginInputSchema } = require("../inputValidator/inputValidation");
const asyncHandler=require("express-async-handler");

const validateUserRegister =asyncHandler(async(req,res,next)=>{
    const parsedUserRegisteredData= registerInputSchema.safeParse(req.body);
    if(!parsedUserRegisteredData.success){
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: parsedUserRegisteredData.error.issues,
        });
    }
    req.body= parsedUserRegisteredData.data;
    next();
});

const validateUserLogin= asyncHandler(async(req,res,next)=>{
    const parsedUserLoginData= loginInputSchema.safeParse(req.body);
    if(!parsedUserLoginData.success){
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: parsedUserLoginData.error.issues,
        });
    }
    req.body=parsedUserLoginData.data;
    next();
});

module.exports={validateUserRegister,
    validateUserLogin
}