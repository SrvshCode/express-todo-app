const mongoose= require("mongoose");

const connectDb=async()=>{
    try{
      const response=  await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`DB Connected Successfully. Db Details: ${response.connection.name}|| ${response.connection.host}`)
    }catch(err){
        console.log('Db connection failed,err');
    }

}

module.exports=connectDb;