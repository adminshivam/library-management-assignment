# Library Book Management Module - Take Home Assignment

## :warning: Please read these instructions carefully and entirely first
* Clone this repository to your local machine (Alternatively, create a private GH fork).
* Use your IDE of choice to complete the assignment.
* There is no time limit for this task - however, for guidance, it is expected to typically take around 1-2 hours.
* Once the assignment is complete, zip it & email it back to the interview panel.
* Alternatively, if you can add the interviewer as a contributor to your private fork, that will suffice too.

## Overview
Create a module that helps manage a library's book inventory and loan system. The system should handle basic operations related to books, members, and the borrowing process.

## Core Requirements

### 1. Book Management
- Add new books to the library with the following details:
  - ISBN (unique identifier)
  - Title
  - Author
  - Publication Year
  - Number of copies
- Remove books from the inventory
- Update book details
- Search for books by ISBN, title, or author

### 2. Loan Management
- Allow members to borrow books
  - Track who has borrowed what
  - Enforce maximum 3 books per member
  - Set due date (14 days from borrowing)
- Process book returns
  - Calculate late fees if applicable (£1 per day late)
  - Update book availability
- View all books currently on loan

## Technical Requirements

### Data Storage
- Use in-memory storage (no database required)
- Organize data structures efficiently
- Ensure thread-safety is considered

### API Design
Design clean interfaces for the following operations:
```java
// Example interfaces (you can modify as needed):
interface BookService {
    void addBook(Book book);
    Optional<Book> findByIsbn(String isbn);
    List<Book> searchBooks(String searchTerm);
    // ... other methods
}

interface LoanService {
    LoanResult borrowBook(String memberId, String isbn);
    ReturnResult returnBook(String memberId, String isbn);
    // ... other methods
}
```

## What We're Looking For
- Clean, readable, and well-organized code
- Clear separation of concerns
- Edge cases consideration
- Unit tests for core functionality
- Clear README with setup instructions
- Any assumptions made

### Tips
* We value simplicity as an architectural virtue and as a development practice. Solutions should reflect the difficulty of the assigned task, and shouldn’t be overly complex. We prefer simple, well tested solutions over clever solutions.
* We value code that communicates well. Code that others can understand, modify, or use is far more valuable than code that is opaque.
* Use the fact that this is a git repo to your advantage, attempt to make your commits meaningful and atomic.
* Use frameworks, libraries, build tools that you are comfortable with as helpers, but the core functionality should be your own, you never know when your users might come up with new problems!

### DO
* ✅ Include unit tests.
* ✅ Test both any client and logic.
* ✅ Update the README.md with any relevant information, assumptions, and/or tradeoffs you would like to highlight.

### DO NOT
* ❌ Submit any form of app, such as web APIs, browser, desktop, or command-line applications.
* ❌ Add unnecessary layers of abstraction.
* ❌ Add unnecessary patterns/ architectural features that aren’t called for e.g. persistent storage.




----------------------------------------------------------------------------------------------------------------

## Project Documentation

# Expiring Temporary Resource Sharing Module
This project implements a backend module to manage library and loan management for same. Library can have memebers and books. Members can borrow the books from the library.

# **Features**
- **Add Member:** Users can upload or register a resource with an expiration time.
- **Add Book** Secure access links are provided using unique tokens.
- **Update Book** Resources are automatically flagged as expired once the expiration time passes.
- **Delete Book** Users can fetch active or expired resources easily.
- **Search Book** Users can fetch active or expired resources easily.
- **Delete Book** Users can fetch active or expired resources easily.
- **Borrow Book** Users can fetch active or expired resources easily.
- **Return Book** Users can fetch active or expired resources easily.
- **View all Loans** Users can fetch active or expired resources easily.

# **Tech Stack**

- **Backend Framework:** Node.js (Typescript) with Express
- **Database:** In-Memory Database

# **Setup Instructions**

# **Prerequisites**
- Node.js (v16+ recommended)
- Typescript Compiler (tsc)

# **Steps**
- Clone the repository:

git clone <repository-url>
cd LIBRARY-MANAGEMENT-ASSIGNMENT

Install dependencies:

npm install

# **Start the server:**

npm run start 
node app.js
The API server will be running on http://localhost:3000.

# **API Documentation**

1. Add Member
Endpoint: POST /member

Description: Creates a resource with an expiration time.
curl --location 'http://localhost:3000/member' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1,
    "name": "shivam"
}'

Response:

{
    "status": true,
    "message": "Member inserted sucessfully.",
    "data": {
        "id": 1,
        "name": "shivam"
    }
}


2. Add Book
Endpoint: POST /book

Description: Add a new book in the database with unique isbn.
curl --location 'http://localhost:3000/book' \
--header 'Content-Type: application/json' \
--data '{
    "isbn": "twrzb689bt",
    "title": "Elon Musk Biography",
    "author": "Elon Musk",
    "publicationYear" : 2020,
    "totalCopies" : 10
}'

Response:

{
    "status": true,
    "message": "Member inserted sucessfully.",
    "data": {
        "id": 1,
        "name": "shivam"
    }
}


3. Update Book
Endpoint: PATCH /book

Description: Update details for a existing book.
curl --location --request PATCH 'http://localhost:3000/book' \
--header 'Content-Type: application/json' \
--data '{
    "isbn": "twrzb689bt",
    "title": "Elon Musk Biography",
    "author": "Elon Musk",
    "publicationYear" : 2021,
    "totalCopies" : 10
}'

Response:

{
    "status": true,
    "message": "Book Updated sucessfully.",
    "data": {
        "isbn": "twrzb689bt",
        "title": "Elon Musk Biography",
        "author": "Elon Musk",
        "publicationYear": 2021,
        "totalCopies": 10
    }
}


4. Delete Book
Endpoint: DELETE /book

Description: Delete a existing book
curl --location --request DELETE 'http://localhost:3000/book/twrzb689bt'

Response:

{
    "status": false,
    "message": "Book with ISBN twrzb689bt does not exist."
}


5. Search Books
Endpoint: POST /book/search

Description: Search for a book in the database
curl --location 'http://localhost:3000/book/search?isbn=twrzb689bt&title=elon&author=ELon'

Response:

{
    "status": true,
    "message": "Books fetched sucessfully.",
    "data": [
        {
            "isbn": "twrzb689bt",
            "title": "Elon Musk Biography",
            "author": "Elon Musk",
            "publicationYear": 2020,
            "totalCopies": 10,
            "availableCopies": 10
        }
    ]
}

6. Borrow Book By Member
Endpoint: POST /loan/borrow

Description: Borrows a book by member
curl --location 'http://localhost:3000/loan/borrow' \
--header 'Content-Type: application/json' \
--data '{
    "isbn": "twrzb689bt",
    "memberId": 1
}'

Response:

{
    "status": false,
    "message": "No copies of the book are available."
}

7. Return a book by the member
Endpoint: POST /loan/return

Description: Return a borrowed book by the member
curl --location 'http://localhost:3000/loan/return' \
--header 'Content-Type: application/json' \
--data '{
    "isbn": "twrzb689bt",
    "memberId": 1
}'

Response:

{
    "status": true,
    "message": "Book with isbn twrzb689bt returned by member 1 sucessfully.",
    "data": 0
}

7. View all active loans till now
Endpoint: POST /loan/return

Description: View all loans active now
curl --location 'http://localhost:3000/loan/'

Response:

{
    "status": true,
    "message": "Fetched all book loans sucessfully.",
    "data": {
        "1": {
            "twrzb689bt": {
                "borrowedDate": "2024-11-27T09:42:44.727Z",
                "dueDate": "2024-12-11T09:42:44.727Z"
            }
        }
    }
}