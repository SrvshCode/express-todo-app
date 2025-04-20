const z= require("zod");

//defining Zod Schema for user registration 
const registerInputSchema =z.object({
    firstName:z.string().min(1,{message:"Must have atleast 1 character"}),
    lastName:z.string().min(1,{message:"Must have atleast 1 character"}),
    email:z.string().min(1,{message:"Must have atleast 1 character"}).email({message:"Must be valid email"}),
    password:z.string().min(6,{message:"Password needs to be 6 characters and above"})
                       .regex(/[a-z]/,{message:"Password must contain at least one lowercase letter"})
                       .regex(/[A-Z]/,{message:"Password must contain atleast one Uppercase letter"})
                       .regex(/[0-9]/,{message:"Password must contain atleast one number"})
                       .regex(/[!@#$%^&*(),.?":{}|<>]/,{message:"Password must contain 1 number and 1 Special Character"})
});

//defining Zod Schema for user login
const loginInputSchema= z.object({
    email:z.string().min(1,{message:"Must have atleast 1 character"}).email({message:"Must be valid email"}),
    password:z.string().min(6,{message:"Password needs to be 6 characters and above"})
              .regex(/[a-z]/,{message:"Password must contain at least one lowercase letter"})
              .regex(/[A-Z]/,{message:"Password must contain atleast one Uppercase letter"})
              .regex(/[0-9]/,{message:"Password must contain atleast one number"})
              .regex(/[!@#$%^&*(),.?":{}|<>]/,{message:"Password must contain 1 number and 1 Special Character"})
});

module.exports={
    registerInputSchema,
    loginInputSchema
}