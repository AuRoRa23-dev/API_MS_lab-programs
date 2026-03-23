const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = 5000;

// Sample data
let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" }
];

// 1. Define Schema
const myschema = buildSchema(`
  type Book {
    id: Int
    title: String
    author: String
  }

  type Query {
    getBooks: [Book]
    getBook(id: Int!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`);

// 2. Define Resolvers
const root = {
  getBooks: () => books,

  getBook: ({ id }) => books.find(b => b.id === id),

  addBook: ({ title, author }) => {
    const newBook = {
      id: books.length + 1,
      title,
      author
    };
    books.push(newBook);
    return newBook;
  }
};

// 3. Setup GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: myschema,
  rootValue: root,
  graphiql: true   // enables UI
}));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});