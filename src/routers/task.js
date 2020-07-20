const express = require('express')
const Task = require('../modals/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks',auth,async (req, res) => {
    // const task = new Task(req.body)
        const task = new Task({
            ...req.body,
            owner:req.user._id
        })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
//GET /tasks?completed=true
// limit skip  GET /tasks?limit=10&skip=0 
// GET /tasks?sortBy=createAt:asc or desc
router.get('/tasks',auth,async (req, res) => {
   const match = {}
   const sort ={}

   if(req.query.completed){
        match.completed = req.query.completed === "true" // req.query.completed is not boolean its get as string that's why we do this     
   }

   if(req.query.sortBy){
       const parts = req.query.sortBy.split(':')
       sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
         const total = await Task.find({})
        // const tasks = await Task.find({owner:req.user._id}) <- method 1
        // await req.user.populate('tasks').execPopulate() // for all tasks without filter
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                // sort:{
                    // createdAt: -1    // asc is 1 and desc is -1
                    // completed : 1
                // }
                sort
            }
        }).execPopulate() // for all tasks with filter
        res.send({data:req.user.tasks,total:total.length})
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
         const task = await Task.findOne({_id,owner:req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        console.log('user req',req)
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        // const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth,async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
         const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router