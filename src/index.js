const express = require("express");
require("./db/mongoose");
// const User = require("./modals/user");
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT 

//this is middleware below
// app.use((req,res,next)=>{
//     next()
// })
// app.use((req,res,next)=>{
//     res.status(501).('server is down')
// })

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

//
//Without middleware: new request -> run route handler
//
//with middleware : new request -> do something -> run route handler
//



// if another route for task then add app.use(taskRouter)

app.listen(port, () => {
  console.log("Server is running on " + port);
});

// const jwt = require('jsonwebtoken')
// const myFunction = async () =>{
//   const token=await jwt.sign({ _id:'abc123' },'thisismynewcourse',{expiresIn:'7 days'})
//   console.log(token)
  
//  const data = await jwt.verify(token,'thisismynewcourse')
//  console.log(data)
// }

// myFunction()

// const bcrypt = require('bcryptjs')

// const myFunction = async () =>{
// const password = 'Red12345!'
// const hashedPassword = await bcrypt.hash(password, 8)


// console.log('password',password)
// console.log('hash',hashedPassword)

// const isMatch = await bcrypt.compare('Red12345!',hashedPassword)
// console.log(isMatch)
// }

// myFunction()


//THIS IS THE EXAMPLE OF USER AND TASK RELATIONSHIP

// const Task = require('./modals/task')
// const User = require('./modals/user')

// const main = async () =>{
  //const task = await Task.findById('id...')
  //await task.populate('owner').execPopulate()
  //clg(task.owner)

//   const user = await User.findById('5f0de1204e31a940166b0da5')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)
// }

// main()
