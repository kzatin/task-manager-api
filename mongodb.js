//CRUD

//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient //provide some imp functions in package
//const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID}=require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
// const id = new ObjectID()
// console.log(id,id.getTimestamp())

MongoClient.connect(connectionURL, { useUnifiedTopology:true },(error,client)=>{
if(error){
  return  console.log('Unable to connect to databse')
}
const db= client.db(databaseName)

db.collection('users').deleteMany({
  age:26
}).then((result)=>{
console.log(result)
}).catch((error)=>{
console.log(error)
})

// const updatePromise = db.collection('users').updateOne({
//   _id: new ObjectID("5eeb951de3c29c4160bc7b8c")
// },{
//   $inc:{
//     age:10
//   }
// })

// updatePromise.then((result)=>{
// console.log(result)
// }).catch((error)=>{
// console.log(error)
// })

// db.collection('users').findOne({
  // name:'jen'
//   _id : ObjectID("5ee79c6c1e37ec4330adc189"),
// },(error,result)=>{
// if(error){
//   return ('Unable to get user')
// }

// console.log(result)

// })
 
// find returns a cursor which have diffrent functions by which we get data. one of func is toArray()
// db.collection('users').find({
//   name:'zatin'
// }).toArray((error,users)=>{
//   console.log(users)
// })

// db.collection('users').find({
//   name:'zatin'
// }).count((error,count)=>{
//   console.log(count)
// })

// db.collection('users').insertOne({
//     name:'zatin123',
//     age:26
// },(error,result)=>{
// if(error){
//     return ('Unable to insert user')
// }

// console.log(result.ops)

// })
// db.collection('users').insertMany([
//     {
//         name: 'jen',
//         age:22
//     },{
//         name : "Gind",
//         age:23
//     }
// ],(error,result)=>{
//     if(error){
//         return console.log('Unable to insurt documents')
//     }

//     console.log(result.ops)

// })

// db.collection('tasks').insertMany([
//     {
//         description: 'clean',
//         completed:true
//     },{
//         description: 'renew',
//         completed:false
//     },{
//         description: 'pot plants',
//         completed:false
//     }
// ],(error,result)=>{
//     if(error){
//         return console.log('Unable to insurt documents')
//     }
//     console.log(result.ops)
// })



})



