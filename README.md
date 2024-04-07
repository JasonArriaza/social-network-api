# Social Network API

This project is a social network API built using Express.js and MongoDB.

## Features
- Create, read, update, and delete users
- Create, read, update, and delete thoughts
- Add and remove reactions to thoughts
- Add and remove friends to a user's friend list

## Technologies
- Express.js
- MongoDB

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB

## Usage
1. Start the server: `npm start`
2. Test endpoints using an API testing tool like Insomnia or Postman

2. Use an API testing tool (e.g., Insomnia or Postman) to test the endpoints.

## API Endpoints

### Users

- **GET /api/users**: Get all users.
- **GET /api/users/:userId**: Get a single user by ID.
- **POST /api/users**: Create a new user.
- **PUT /api/users/:userId**: Update a user by ID.
- **DELETE /api/users/:userId**: Delete a user by ID.

### Thoughts

- **GET /api/thoughts**: Get all thoughts.
- **GET /api/thoughts/:thoughtId**: Get a single thought by ID.
- **POST /api/thoughts**: Create a new thought.
- **PUT /api/thoughts/:thoughtId**: Update a thought by ID.
- **DELETE /api/thoughts/:thoughtId**: Delete a thought by ID.

### Reactions

- **POST /api/thoughts/:thoughtId/reactions**: Create a reaction to a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Delete a reaction from a thought.

### Friends

- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user's friend list.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user's friend list.

## License
This project is licensed under the MIT License.


## License
This project is licensed under the MIT License.
