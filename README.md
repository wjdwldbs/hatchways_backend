# Hatchways Backend Challenge

## Usage
### Server API

| URL | HTTP Verb | Query Parameters | Default | Response Body | Status Code
| --- | --- | --- | --- | --- | --- |
| /api/ping | GET | empty | N/A |{ success: true} | 200 |
| /api/posts | GET | <p>tags (required)</p><p>sortBy (optional)</p><p>direction (optional)</p> | <p>N/A</p><p>id</p><p>asc</p> | ex) {"posts": [{"id": 1, "author": "Rylee Paul", "authorId": 9, "likes": 960, "popularity": 0.13, "reads": 50361, "tags": [ "tech", "health" ] }, ..... ]} | 200 |


## Requirements
You will need [Node.js](https://nodejs.org/en/) installed on your system.

## Installation & Setup

Open the terminal in the project directory and install dependencies locally using npm:

```bash
$ npm install
```

Start the server with:

```bash
$ npm start
```

Run tests with: 

```bash
$ npm test
```