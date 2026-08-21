# AI Interview Portal

## Project Overview

AI Interview Portal is a web-based interview preparation and assessment platform developed using React, Vite, Spring Boot, and MySQL.

The platform allows students to practice mock interviews, take technical assessments, monitor their performance, and track their learning progress through analytics dashboards.

The system provides role-based access for:

- Students
- Trainers
- Administrators

The frontend communicates with the backend through REST APIs, while JWT-based authentication and role-based authorization are used to secure protected resources.

---

## Objectives

The main objective of the AI Interview Portal is to provide an integrated platform for interview preparation and performance assessment.

The system enables students to:

- Practice technical and non-technical mock interviews
- Attempt timed assessments
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

### Student Module

- Student Dashboard
- Mock Interview Practice
- Technical Assessments
- Timed Assessments
- Automatic Result Calculation
- Assessment Results
- Mock Interview Results
- Analytics Dashboard
- Performance Tracking
- Profile Management
- Change Password

### Trainer Module

- Monitor Student Performance
- View Student Results
- Performance Reports
- Track Student Progress

### Admin Module

- User Management
- Assessment Management
- Assessment Question Management
- Mock Interview Management
- Mock Interview Question Management
- Performance Reports
- Admin Analytics

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
- Result Evaluation
- AI-Powered Answer Evaluation
- AI-Generated Feedback
- Performance Analysis

### Assessment Module

- Online Assessments
- Timer-Based Exams
- Automatic Result Calculation
- Category-Wise Scoring
- Difficulty Levels
- Assessment History
- Assessment Results
- Question Management

### Analytics Module

- Weekly Score Trend
- Skill-Wise Performance
- Mock Interview Analytics
- Topic-Wise Improvement
- Completion Statistics
- Overall Performance
- Highest and Average Scores
- AI Performance Summary
- Strength Analysis
- Improvement Suggestions

### AI Integration

- Google Gemini API Integration
- Automated Answer Evaluation
- AI-Generated Feedback
- AI-Based Performance Evaluation
- Strength Identification
- Improvement Suggestions
- Interview Performance Summary
- Analytics-Based AI Feedback

---

## Technology Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Redux Toolkit
- Tailwind CSS
- Recharts
- React Icons
- React Hook Form
- Yup

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Maven
- JWT Authentication
- BCrypt Password Hashing
- REST APIs

### Database

- MySQL

### AI Integration

- Google Gemini API

### Storage

- MySQL for application data
- Local Storage for client-side session information

### Version Control

- Git
- GitHub

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
│   │   │       ├── exception/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   │
│   │   └── resources/
│   │
│   └── test/
│
├── pom.xml
└── README.md

