# AI Interview Portal

## Project Overview

AI Interview Portal is a web-based interview preparation and assessment platform developed using React, Vite, Spring Boot, and MySQL.

The platform allows students to practice mock interviews, take technical assessments, monitor their performance, receive AI-powered feedback, and track their learning progress through analytics dashboards.

The system provides role-based access for:

- Students
- Trainers
- Administrators

The frontend communicates with the backend through REST APIs, while JWT-based authentication and role-based authorization are used to secure protected resources.

The platform integrates **Azure OpenAI** to provide AI-powered question generation, answer evaluation, feedback, and performance analysis.

---

## Objectives

The main objective of the AI Interview Portal is to provide an integrated platform for interview preparation and performance assessment.

The system enables students to:

- Practice technical and non-technical mock interviews
- Attempt timed assessments
- Answer MCQ, coding, and descriptive questions
- View assessment and mock interview results
- Track performance through analytics
- Receive AI-powered feedback
- Identify strengths and areas for improvement

Trainers can monitor student performance and review student results.

Administrators can manage users, assessments, questions, mock interviews, and platform analytics.

---

## Features

### Authentication Module

- User Registration
- User Login
- Logout
- Forgot Password
- OTP-Based Email Verification
- Password Reset
- JWT Authentication
- Role-Based Access Control
- Protected Routes
- Session Persistence
- Session Expiration Handling
- Form Validation
- Secure Password Handling
- BCrypt Password Hashing

### Student Module

- Student Dashboard
- Mock Interview Practice
- Technical Assessments
- Timed Assessments
- MCQ Questions
- Coding Questions
- Descriptive Questions
- Automatic Result Calculation
- Assessment Results
- Mock Interview Results
- Analytics Dashboard
- Performance Tracking
- Performance Reports
- Profile Management
- Change Password

### Trainer Module

- Monitor Student Performance
- View Student Results
- View Performance Reports
- Track Student Progress

### Admin Module

- User Management
- Assessment Management
- Assessment Question Management
- Mock Interview Management
- Mock Interview Question Management
- Performance Reports
- Admin Analytics
- AI-Based Assessment Question Generation
- AI-Based Mock Interview Question Generation

### Mock Interview Module

The portal supports mock interviews in multiple areas:

- React.js
- JavaScript
- Node.js
- Aptitude
- HR Interview
- Communication Skills

Additional features include:

- Timed Mock Interviews
- Multiple Question Types
- MCQ Questions
- Coding Questions
- Descriptive Questions
- AI-Powered Answer Evaluation
- AI-Generated Feedback
- Performance Analysis
- Mock Interview Results

### Assessment Module

The Assessment module provides online technical assessments.

Features include:

- Online Assessments
- Timer-Based Exams
- Multiple Choice Questions
- Coding Questions
- Descriptive Questions
- Automatic Result Calculation
- Category-Wise Scoring
- Difficulty Levels
- Assessment History
- Assessment Results
- Assessment Attempts
- Question Management
- AI-Based Question Generation

### Analytics Module

The analytics module provides performance insights for students and administrators.

#### Student Analytics

- Weekly Score Trend
- Skill-Wise Performance
- Mock Interview Analytics
- Topic-Wise Performance
- Completion Statistics
- Overall Performance
- Highest Score
- Average Score
- AI Performance Summary
- Strength Analysis
- Improvement Suggestions

#### Admin Analytics

- Total Users
- Student and Trainer Statistics
- Assessment Statistics
- Mock Interview Statistics
- Performance Statistics
- Platform-Level Analytics

### AI Integration

The application uses **Azure OpenAI** for AI-powered functionality.

AI features include:

- AI-Based Assessment Question Generation
- AI-Based Mock Interview Question Generation
- Automated Answer Evaluation
- Descriptive Answer Evaluation
- Coding Answer Evaluation
- AI-Generated Feedback
- Strength Identification
- Improvement Suggestions
- Interview Performance Summary
- Analytics-Based AI Feedback

Azure OpenAI is integrated through the Spring Boot backend. The frontend communicates with the backend through REST APIs rather than directly accessing the Azure OpenAI API.

---

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- React Router DOM
- Axios
- Redux Toolkit
- Tailwind CSS
- Recharts
- React Icons
- React Hook Form
- Yup

### Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring Boot Validation
- Spring Boot Mail
- Maven
- JWT Authentication
- BCrypt Password Hashing
- REST APIs
- Lombok

### Database

- MySQL

### AI Integration

- Azure OpenAI

### Storage

- MySQL for application data
- Local Storage for client-side session information

### Version Control

- Git
- GitHub

---

## System Architecture

The application follows a three-layer architecture consisting of the React frontend, Spring Boot backend, and MySQL database, with Azure OpenAI integrated through the backend.

```text
React + Vite Frontend
        |
        | REST APIs
        |
Spring Boot Backend
        |
   +----+----+
   |         |
 MySQL   Azure OpenAI
```

## Database

The application uses **MySQL** as the primary relational database.

The database stores application data related to:

- User accounts and roles
- Assessments
- Assessment questions
- Assessment attempts
- Assessment results
- Mock interviews
- Mock interview questions
- Mock interview answers
- Performance data
- Analytics-related data

Database configuration is provided through environment variables rather than hard-coded credentials.

---

## Authentication and Authorization

The application uses JWT-based authentication and role-based authorization.

### Authentication Flow

1. User registers an account.
2. OTP-based email verification is performed where required.
3. User logs in using valid credentials.
4. The backend validates the credentials.
5. A JWT token is generated after successful authentication.
6. The frontend uses the authenticated session to access protected resources.
7. Protected backend APIs validate the JWT before processing requests.
8. Session expiration is handled when the authentication session becomes invalid.

### Authorization

Access to application functionality is controlled based on user roles:

- **Student** — Access to assessments, mock interviews, results, analytics, profile, and related student functionality.
- **Trainer** — Access to student performance monitoring, results, reports, and progress information.
- **Administrator** — Access to user management, assessment management, question management, mock interview management, reports, analytics, and AI question generation.

---

## Project Structure

### Frontend

```text
src/
│
├── assets/
├── components/
├── layouts/
├── pages/
├── routes/
├── redux/
├── services/
├── styles/
├── utils/
│
├── App.jsx
└── main.jsx
```

### Backend

```text
backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/interviewportal/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── entity/
│   │   │       ├── enums/
│   │   │       ├── exception/
│   │   │       ├── repository/
│   │   │       ├── security/
│   │   │       └── service/
│   │   └── resources/
│   └── test/
│
└── pom.xml
```

---

## Backend Architecture

The backend follows a layered architecture to separate request handling, business logic, data access, and persistence.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Controller Layer

Handles incoming HTTP requests and exposes REST API endpoints.

### Service Layer

Contains the application's business logic and coordinates operations between controllers and repositories.

### Repository Layer

Uses Spring Data JPA to communicate with the MySQL database.

### Entity Layer

Contains JPA entities that represent the application's database tables and relationships.

### DTO Layer

Provides data transfer objects for communication between the frontend and backend.

### Security Layer

Handles JWT authentication, authorization, password security, and protected API access.

### Exception Layer

Provides centralized handling of application exceptions and API errors.

### Configuration Layer

Contains application and security configuration required by the backend.

---

## API Modules

The backend exposes REST APIs for the major application modules.

### Authentication APIs

- Registration
- Login
- Logout
- OTP Verification
- Forgot Password
- Password Reset

### User APIs

- User Management
- User Profile
- Change Password
- Role-Based User Operations

### Assessment APIs

- Assessment Management
- Assessment Filtering
- Assessment Questions
- Assessment Attempts
- Assessment Results

### Mock Interview APIs

- Mock Interview Management
- Mock Interview Questions
- Mock Interview Attempts
- Mock Interview Answers
- Mock Interview Results

### Analytics and Reporting APIs

- Student Analytics
- Admin Analytics
- Performance Reports
- Dashboard Statistics

### AI APIs

- AI Question Generation
- AI Answer Evaluation
- AI Feedback
- AI Performance Analysis

---

## Prerequisites

Before running the project, make sure the following are installed:

- Java 17 or later
- Maven
- Node.js and npm
- MySQL
- Git
- An Azure OpenAI resource with a deployed model

---

## Environment Configuration

The application uses environment variables for database credentials, authentication configuration, email configuration, and Azure OpenAI credentials.

Required environment variables:

```text
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret

MAIL_USERNAME=your_email
MAIL_PASSWORD=your_email_password

AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_DEPLOYMENT=your_azure_openai_deployment
```

Do not commit actual credentials, API keys, passwords, or secrets to the repository.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/laasyareddy-create/AI-Interview-Portal.git
cd AI-Interview-Portal
```

### 2. Create the MySQL Database

Create a MySQL database named:

```sql
CREATE DATABASE interview_portal;
```

### 3. Configure Environment Variables

Set the required environment variables listed in the **Environment Configuration** section.

Make sure the database, JWT, email, and Azure OpenAI configuration values are correctly configured before starting the backend.

### 4. Start the Backend

Open a terminal and run:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will normally be available at:

```text
http://localhost:8080
```

The API base URL is:

```text
http://localhost:8080/api
```

### 5. Start the Frontend

Open another terminal from the project root and run:

```bash
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## Available Commands

### Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

### Backend

Build the backend:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Run backend tests:

```bash
mvn test
```

---

## Screenshots

The project includes screenshots demonstrating the major modules and user interfaces.

Screenshots cover areas such as:

- Login
- Registration
- Dashboard
- Assessments
- Assessment Management
- Mock Interviews
- Mock Interview Management
- Results
- Performance Reports
- Analytics
- User Management
- Profile
- Settings

---

## Security

The application implements multiple security measures to protect user accounts and application resources.

- JWT-based authentication
- Role-based authorization
- BCrypt password hashing
- Protected frontend routes
- Protected backend APIs
- Input validation
- Session expiration handling
- Environment-based configuration
- Secure handling of Azure OpenAI credentials
- Backend-only communication with Azure OpenAI
