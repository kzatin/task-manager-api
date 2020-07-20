const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
//this is middleware(to perform action before or after(pre,post) something happens)
const userSchema = mongoose.Schema({
  name:{
  type : String,
  required: true,
  trim : true
  },
  email:{
     type: String,
     unique:true,
     required : true,
     trim : true,
     lowercase:true,
     validate(value){
         if(!validator.isEmail(value)){
           throw new Error('Email is not valid')
         }
     }
  },
  password:{
    type: String,
    required : true,
    minlength : 7,
    trim : true,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('Password can not conatain "password"')
      }
  }
  },
  age:{
  type: Number,
  default : 0,
  validate(value){
      if(value < 0){
          throw new Error('Age must be a positive number')
      }
  }
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }],
  avatar:{
    type: Buffer
  }
},{ 
  timestamps:true
})

userSchema.virtual('tasks',{
  ref:'Task',
  localField: '_id',  //user field which is common in both user and task
  foreignField:'owner' // task field which is common
})


// userSchema.methods.getPublicProfile = function () {  (this is manual approcah without using toJSON)
  userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

   delete userObject.password
   delete userObject.tokens
  return userObject
}

userSchema.methods.generateAuthToken = async function(){
   const user = this

   const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
   
   user.tokens = user.tokens.concat({token})

   await user.save()

   return token;
      
}


userSchema.statics.findByCredentials = async (email,password) =>{
  const user = await User.findOne({ email })

  if(!user){
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
    throw new Error('Unable to login')
  }

  return user
}

//Hash the plain text password before saving
userSchema.pre('save',async function(next){
 const user = this
  
 if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
 }

 next() //for completing action and move forward (if we dont use next then it will hang forever)
})

//Delete user tasks when user is removed
userSchema.pre('remove',async function(next){
  const user = this
   await Task.deleteMany({ owner : user._id })
  next()
})

const User = mongoose.model('User',userSchema)


module.exports=User