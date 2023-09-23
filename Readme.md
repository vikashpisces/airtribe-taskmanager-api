# Airtribe Task Manager API

This project is a RESTful API developed using Node.js, Express.js, and NPM packages. The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Each task has a title, description, and completion status flag. The API can be tested using Postman or Curl.

## Routes

- `GET /tasks`: Retrieve all tasks.
- `GET /tasks/:id`: Retrieve a single task by its ID.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update an existing task by its ID.
- `DELETE /tasks/:id`: Delete a task by its ID.

## Installation

1. Clone the repository:
``` git clone <repository_url> ```

2. Install dependencies:
``` npm install ```


## Usage

1. Start the server:
``` npm start ```

2. Access the API routes using the following URL:
``` http://localhost:3000/tasks ```

3. Test the API using Postman or Curl:

#### GET ALL TASKS

``` 
curl --location 'http://localhost:3000/tasks' 
```

#### POST A TASK

``` 
curl --location 'http://localhost:3000/tasks' \
--data '{
    "id": 5,
    "title": "Task new",
    "description": "Task new description",
    "completed": false
}' 

```

#### GET SINGLE TASK
``` 
curl --location 'http://localhost:3000/tasks/5' 
```

#### UPDATE A TASK STATUS
```
curl --location 'http://localhost:3000/tasks/5' \
--data '{
    "id": 5,
    "title": "Task new",
    "description": "Task new description",
    "completed": true
}'
```

#### DELETE A TASK
``` 
curl --location 'http://localhost:3000/tasks/5' 
```


## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

## Contact

For any further inquiries or feedback, please contact [vikashvickyssec@gmail.com].
