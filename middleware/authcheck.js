var jwt = require('jsonwebtoken')
const User=require("../mongoSchema/userSchema")

const authcheak=(req,res,next)=>{
        const token=req.header('token');
        if(token==null){
            return res.status(300).json({ error: "Unauthorized User"  })
        }
        else{
        const verifiedtoken=jwt.verify(token,process.env.SECRET_KEY);
        req.user = verifiedtoken._id;
        if(verifiedtoken){
            next()
        }
        else{
            res.status(300).json({ error: "Unauthorized User"  })
        }
        }
        
}

module.exports={authcheak}