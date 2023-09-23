class Validator {
  static validateTaskData(taskData = {}, tasksData = []) {
    const validation = {
      status: true,
      message: 'Task data is valid'
    }

    if (taskData.hasOwnProperty('title')
      && taskData.hasOwnProperty('description')
      && taskData.hasOwnProperty('completed')
      && taskData.hasOwnProperty('id')) {
      
      if (tasksData.some(task => task.id === +taskData.id)) {
        Object.assign(validation, {
          status: false,
          message: 'Task with given id already exists'
        })
        return validation
      }

      if (typeof taskData.completed !== 'boolean') {
        Object.assign(validation, {
          status: false,
          message: 'Completed field must be boolean value'
        })
        return validation
      }

      
      if (!taskData.title || !taskData.description) {
        Object.assign(validation, {
          status: false,
          message: 'Title or description cannot be left blank'
        })
        return validation
      }
      
      Object.assign(validation, {
        status: true,
        message: 'Task data is valid'
      })
      return validation
    }


    Object.assign(validation, {
      status: false,
      message: 'Task data is malformed or either invalid'
    })
    return validation
  }

  static validateTaskDataToUpdate(taskId, taskPayload, tasksData) {
    const TASK_SCHEMA = {
      title: 'string',
      description: 'string',
      completed: 'boolean'
    }

    if (!taskId || !Number.isFinite(taskId)) {
      return {
        status: false,
        message: 'Task id is invalid'
      }
    }

    if (!tasksData.some(task => task.id === +taskId)) {
      return {
        status: false,
        message: 'Task with given id does not exist',
        code: 404
      }
    }

    let isValidSchema = true
    for (const key in taskPayload) {
      if (!TASK_SCHEMA.hasOwnProperty(key)) {
        isValidSchema = false
        break;
      }
    }

    if (!isValidSchema) {
      return {
        status: false,
        message: 'Task data is malformed or either invalid'
      }  
    }

    if (taskPayload.hasOwnProperty('completed') && typeof taskPayload.completed !== 'boolean') {
        return {
          status: false,
          message: 'Completed field must be boolean value'
        }
      }

      
    if ((taskPayload.hasOwnProperty('title') && !taskPayload.title) ||
      (taskPayload.hasOwnProperty('description') && !taskPayload.description)) {
        return {
          status: false,
          message: 'Title or description cannot be left blank'
        }
      }

    return {
      status: true,
      message: 'Task data is valid'
    }
  }
}

module.exports = Validator