import { gql } from '@apollo/client'

export const ME = gql`
    query {
        me {
            username,
            id,
            favoriteGenre
        }
    }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title,
    author {
        name
    },
    published,
    genres,
    id
  }
`

export const ALL_BOOKS = gql`
    query($author: String, $genre: String) {
        allBooks(
            author: $author,
            genre: $genre
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}    
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            born, 
            bookCount,
            id
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title,
            published,
            author {
                name,
                born, 
                bookCount,
                id
            },
            genres,
            id
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name
            setBornTo: $setBornTo
        ) {
            name,
            born,
            bookCount,
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    },
    ${BOOK_DETAILS}
`