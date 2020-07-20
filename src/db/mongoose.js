const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false, useUnifiedTopology: true
})



// const me = new User({
//     name :"     Mike    ",
//     email : "MIKE@GMAIL.COM  ",
//     password: 'Phone123!'
//  })
 
//  me.save().then((result)=>{
//   console.log(result)
//  }).catch((err)=>{
//  console.log(err)
//  })

