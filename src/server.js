const express = require('express');
const app = express();
const tasksData = require('./database/db.json');
const Validator = require('./helper/Validator');

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})


app.get('/tasks', (req, res) => {
  let { completed } = req.query

  if (typeof completed === 'string') {
    if (!['true', 'false'].includes(completed)) {
      return res.status(400).send('Completed query must be boolean true/false')
    }
    completed = JSON.parse(completed)

    const filteredTasks = tasksData.filter(task => task.completed === completed)
    return res.status(200).json(filteredTasks)
  }

  res.status(200).json(tasksData)
})

app.get('/tasks/:id', (req, res) => {
  const taskId = req?.params?.id
  const taskFound = tasksData.find(task => task.id === +taskId)
  if (!taskFound) {
    return res.status(404).send('Task not found for the given id');
  }
  return res.status(200).json(taskFound)
})

app.post('/tasks', (req, res) => { 
  const taskPayload = req.body
  const validationInfo = Validator.validateTaskData(taskPayload, tasksData)
  if (!validationInfo.status) {
    return res.status(400).send(validationInfo.message)
  }

  tasksData.push(taskPayload)
  return res.status(201).send('Task added successfully')
})

app.put('/tasks/:id', (req, res) => {
  const taskPayload = req.body
  const taskIdToUpdate = req.params.id

  const validationInfo = Validator.validateTaskDataToUpdate(+taskIdToUpdate, taskPayload, tasksData)
  if (!validationInfo.status) {
    return res.status(400).send(validationInfo.message)
  }

  const taskFound = tasksData.find(task => task.id === +taskIdToUpdate)
  Object.assign(taskFound, taskPayload)
  res.status(200).send('Task Updated Successfully.')
})

app.delete('/tasks/:id', (req, res) => {
  const taskIdToDelete = req.params.id
  const taskFoundIndex = tasksData.findIndex(task => task.id === +taskIdToDelete)
  if (taskFoundIndex === -1) {
    return res.status(404).send('Task not found for the given id');
  }

  tasksData.splice(taskFoundIndex, 1)
  res.status(200).send('Task deleted successfully')
})


app.listen(PORT, (err) => {
  if (err) {
    console.log('Error while starting the server. Details: ', err);
  } else {
    console.log('Server is listening on port: ', PORT);
  }
})

