# Notes Management API 

A simple API for managing notes built using Node.js, Express.js, and MongoDB.

## ⚡Features
- Create, read, update, and delete notes
- MongoDB Atlas for database management

## ⚡ Prerequisites
- Node.js (v23)
- npm 
- MongoDB Atlas for cloud database
- Git

## ⚡Setup Instructions
### 1. Clone the repository:

``` bash
git clone https://github.com/yourusername/notes-management-api.git ```
cd notes-management-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables:
Create a .env file in the root directory with the following variables.
Add the PORT and MONGODB_URI

### 4. Run the Application
```bash
npm start or 
node server.js
```

#### The API will be available at http://localhost:5000

### ⚡How to Test the API
#### Create a Note 
``` bash
curl -X POST http://localhost:5000/api/notes \
-H "Content-Type: application/json" \
-d '{"title": "First Note", "content": "Hello world!"}'
```

#### Get a Note
``` bash
curl http://localhost:5000/api/notes/<note-id>
```

#### Get all Notes
``` bash
curl http://localhost:5000/api/notes
```

#### Update a Note
``` bash
curl -X PUT http://localhost:5000/api/notes/<note-id> \
-H "Content-Type: application/json" \
-d '{"title": "Updated Title", "content": "New content"}'
```

#### Delete a Note
``` bash
curl -X DELETE http://localhost:5000/api/notes/<note-id>
```





### 5. Database Setup
Install MongoDB locally or use MongoDB Atlas
Update the MONGODB_URI in your .env file

The API will automatically create collections when first used
