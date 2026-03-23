const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 5000;

app.use(express.json());
//configuration for swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "Simple API documentation using Swagger"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./swaggerdoc.js"]
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//sample data for users

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

/**
 * @swagger
 * /:
 *  get:
 *    summary: Test API
 *    description: Returns API status
 *    responses:
 *      200:
 *        description: API is working
 */

app.get('/', (req, res) => {
  res.send("API is working");
});

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    description: Returns a list of users
 *    responses:
 *      200:
 *        description: List of users
 */

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});