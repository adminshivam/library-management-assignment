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
This project implements a backend module to manage temporary resource sharing. Users can share resources (e.g., files, links, or documents) with others for a limited time. The resources automatically expire after the specified duration and become inaccessible.

# **Features**
- **Create Temporary Resources:** Users can upload or register a resource with an expiration time.
- **Access Control** Secure access links are provided using unique tokens.
- **Auto-Expiry** Resources are automatically flagged as expired once the expiration time passes.
- **Query Resources** Users can fetch active or expired resources easily.

# **Tech Stack**

- **Backend Framework:** Node.js with Express
- **Database:** MySQL
- **Scheduling:** Node.js with custom interval-based expiry checks

# **Setup Instructions**

# **Prerequisites**
- Node.js (v16+ recommended)
- MySQL database server

# **Steps**
- Clone the repository:

git clone <repository-url>
cd resource-sharing

Install dependencies:

npm install

Set up the database schema. Run the following MySQL commands:


CREATE DATABASE resource_sharing;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    login_token VARCHAR(255) UNIQUE NOT NULL,
);

CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    resource_url TEXT NOT NULL,
    expiration_time DATETIME NOT NULL,
    is_expired BOOLEAN DEFAULT FALSE,
    access_token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

# **Start the server:**

npm run start 
node app.js
The API server will be running on http://localhost:3000.

# **API Documentation**

1. Create a New User
Endpoint: POST /users

Description: Creates a resource with an expiration time.
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test",
    "email": "test@local.com"
}'

Response:

{
    "userId": 1,
    "access_token": "g3hqngmitqg"
}
