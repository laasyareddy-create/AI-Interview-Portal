# AI Interview Portal – Java Spring Boot Backend

A production-ready RESTful API built with **Spring Boot 3.2**, **Spring Security + JWT**, **Spring Data JPA**, and **MySQL**.  
It implements every endpoint consumed by the AI Interview Portal React frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.2.3 |
| Security | Spring Security 6 + JWT (JJWT 0.12.5) |
| Persistence | Spring Data JPA + Hibernate |
| Database | MySQL 8.x |
| Build | Maven 3.8+ |
| Validation | Jakarta Bean Validation 3 |
| Boilerplate | Lombok |

---

## Prerequisites

- Java 21 (e.g., [Eclipse Temurin](https://adoptium.net/))
- Maven 3.8+
- MySQL 8.x running on `localhost:3306`

---

## Quick Start

```bash
# 1. Clone / unzip the project
cd interview-portal-backend

# 2. Create the database (or let the app auto-create it)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS interview_portal;"

# 3. Edit DB credentials in:
#    src/main/resources/application.properties
#    (spring.datasource.username / spring.datasource.password)

# 4. Build and run
mvn spring-boot:run
```

The server starts on **http://localhost:8080**.  
All endpoints are prefixed with `/api` (e.g., `POST http://localhost:8080/api/auth/login`).

On first startup, `data.sql` seeds **200+ questions** across all categories and difficulties.

---

## Environment / Configuration

All settings live in `src/main/resources/application.properties`.

| Property | Default | Description |
|---|---|---|
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/interview_portal` | MySQL connection URL |
| `spring.datasource.username` | `root` | DB user |
| `spring.datasource.password` | `root` | DB password |
| `jwt.secret` | (base64 string) | HMAC-SHA key — **change in production** |
| `jwt.expiration` | `604800000` (7 days) | Token TTL in ms |
| `server.port` | `8080` | HTTP port |

---

## API Reference

### Authentication  
Base: `/api/auth`  — **public, no token required**

| Method | Path | Body | Response |
|---|---|---|---|
| `POST` | `/auth/register` | `{name, email, password, role?}` | `{token, user}` |
| `POST` | `/auth/login` | `{email, password}` | `{token, user}` |
| `POST` | `/auth/forgot-password` | `{email}` | `{message}` |

**Password rules** (enforced via validation):  
Min 8 chars · at least one uppercase · one digit · one special character

---

### Profile  
All require `Authorization: Bearer <token>`

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/profile` | — | `UserResponse` |
| `PUT` | `/profile` | `{name, email?, contactNumber?, about?, skills?, resumeLink?, profileImage?}` | `UserResponse` |
| `PUT` | `/profile/password` | `{currentPassword, newPassword, confirmPassword}` | `{message}` |

`profileImage` accepts a base64 data URL.

---

### Questions  
Requires authentication.

| Method | Path | Query Params | Response |
|---|---|---|---|
| `GET` | `/questions` | `category`, `difficulty` | `QuestionResponse[]` |

**Valid categories:** `react`, `javascript`, `sql`, `dsa`, `aptitude`, `node`, `hr`, `communication`  
**Valid difficulties:** `easy`, `medium`, `hard`

Response item shape:
```json
{
  "id": 1,
  "category": "react",
  "difficulty": "easy",
  "question": "What is JSX in React?",
  "options": ["...", "...", "...", "..."],
  "answer": "A JavaScript extension for XML-like syntax",
  "type": "mcq"
}
```

---

### Assessments (Admin-created)  
`POST`/`DELETE` require `ROLE_admin`.

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/assessments` | — | `AssessmentResponse[]` |
| `POST` | `/assessments` | `{title, question, option1, option2, option3, option4, answer}` | `AssessmentResponse` |
| `DELETE` | `/assessments/{id}` | — | `{message}` |

---

### Assessment Attempts

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/attempts` | Student | Get own assessment history |
| `POST` | `/attempts` | Student | Submit a completed assessment |
| `GET` | `/attempts/all` | Trainer/Admin | Get all students' attempts |

`POST /attempts` body:
```json
{
  "category": "react",
  "difficulty": "easy",
  "score": 4,
  "totalQuestions": 5,
  "correctAnswers": 4,
  "wrongAnswers": 1,
  "percentage": 80.0
}
```

Response includes `studentId`, `studentName`, `studentEmail`, `attemptedAt`.

---

### Mock Interviews

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/mock-interviews` | Student | Get own mock interview history |
| `POST` | `/mock-interviews` | Student | Submit a mock interview result |
| `GET` | `/mock-interviews/all` | Trainer/Admin | Get all results |

`POST /mock-interviews` body:
```json
{
  "category": "hr",
  "attempted": 10,
  "totalQuestions": 10,
  "score": 8,
  "percentage": 80.0
}
```

Response includes `studentId`, `studentName`, `completedAt`.

---

### Analytics

| Method | Path | Auth | Response |
|---|---|---|---|
| `GET` | `/analytics` | Student | Student analytics (see below) |
| `GET` | `/analytics/admin` | Admin | Admin analytics (see below) |

**Student analytics response:**
```json
{
  "highestScore": 95,
  "averageScore": 78,
  "assessments": 12,
  "mockInterviews": 5,
  "scoreTrend": [{ "week": "Attempt 1", "score": 72.0 }],
  "skills": [{ "category": "react", "score": 80.0 }],
  "technicalScore": 75,
  "hrScore": 85,
  "communicationScore": 90,
  "mockCategoryAnalytics": [{ "category": "hr", "attempts": 3, "bestScore": 90.0, "avgScore": 80.0 }]
}
```

**Admin analytics response:**
```json
{
  "totalUsers": 50,
  "students": 40,
  "trainers": 8,
  "admins": 2,
  "totalAttempts": 200,
  "averageScore": 74.5,
  "highestScore": 100.0,
  "lowestScore": 20.0,
  "passRate": 82.5,
  "mostAttempted": "react"
}
```

---

### Dashboard  
Requires `ROLE_student`.

| Method | Path | Response |
|---|---|---|
| `GET` | `/dashboard` | `{ welcomeName, upcomingInterviews, completedAssessments, overallScore, practiceStreakDays, recentAttempts[] }` |

---

### User Management  
Requires `ROLE_admin`.

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/users` | — | `UserResponse[]` |
| `PATCH` | `/users/{id}/role` | `{role}` | `UserResponse` |
| `DELETE` | `/users/{id}` | — | `{message}` |

---

### Performance Reports  
Requires `ROLE_trainer` or `ROLE_admin`.

| Method | Path | Response |
|---|---|---|
| `GET` | `/performance-reports` | `PerformanceReportResponse[]` |

Response per student:
```json
{
  "studentName": "Alice",
  "studentEmail": "alice@example.com",
  "average": 78.5,
  "highest": 95.0,
  "lowest": 55.0,
  "totalAttempts": 12,
  "performanceLevel": "Good",
  "bestCategory": "react",
  "mockInterviewsTaken": 3,
  "avgMockScore": 82.0,
  "bestMockScore": 90.0,
  "assessmentHistory": [...]
}
```

**Performance levels:** Outstanding (≥90) · Excellent (≥80) · Good (≥70) · Average (≥50) · Needs Improvement (<50)

---

## Security

- All endpoints except `/api/auth/**` require a valid Bearer token.
- Role-based access control is enforced at both `SecurityConfig` and `@PreAuthorize` levels.
- Passwords are hashed with BCrypt (strength 10).
- JWT uses HMAC-SHA256. Change `jwt.secret` to a cryptographically random 256-bit key before deploying.

---

## Database Schema

Tables auto-created by Hibernate (`spring.jpa.hibernate.ddl-auto=update`):

- `users` — id, name, email, password_hash, role, contact_number, about, skills, resume_link, profile_image, created_at
- `questions` — id, category, difficulty, question_text, options (JSON array as text), answer, type
- `assessments` — id, title, question_text, options, answer, created_at
- `assessment_attempts` — id, student_id (FK), student_name, student_email, category, difficulty, score, total_questions, correct_answers, wrong_answers, percentage, attempted_at
- `mock_interviews` — id, student_id (FK), student_name, category, attempted, total_questions, score, percentage, completed_at

---

## Frontend Integration

When integrating with the React frontend (Vite dev server on `http://localhost:5173`):

1. Set `Authorization: Bearer <token>` header on every authenticated request.
2. Store the token from `POST /api/auth/login` response in localStorage.
3. CORS is configured to allow all origins in development (`*`). Lock it down in production.

---

## Production Checklist

- [ ] Replace `jwt.secret` with `openssl rand -base64 32` output
- [ ] Set `spring.datasource.password` via environment variable
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` (run migrations manually)
- [ ] Set `spring.sql.init.mode=never` after first seed run
- [ ] Lock CORS to specific frontend origin(s)
- [ ] Enable HTTPS / TLS termination
- [ ] Configure connection pool (`spring.datasource.hikari.*`)

---

## Project Structure

```
src/main/java/com/interviewportal/
├── InterviewPortalApplication.java
├── config/
│   ├── CorsConfig.java
│   └── SecurityConfig.java
├── controller/
│   ├── AuthController.java
│   ├── ProfileController.java
│   ├── UserController.java
│   ├── QuestionController.java
│   ├── AssessmentController.java
│   ├── AttemptController.java
│   ├── MockInterviewController.java
│   ├── AnalyticsController.java
│   ├── DashboardController.java
│   └── PerformanceReportController.java
├── dto/
│   ├── request/   (RegisterRequest, LoginRequest, …)
│   └── response/  (AuthResponse, UserResponse, AnalyticsResponse, …)
├── entity/
│   ├── User.java
│   ├── Question.java
│   ├── Assessment.java
│   ├── AssessmentAttempt.java
│   └── MockInterview.java
├── enums/
│   └── Role.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── (custom exception classes)
├── repository/
│   └── (JpaRepository interfaces)
├── security/
│   ├── JwtUtil.java
│   ├── JwtAuthFilter.java
│   └── UserDetailsServiceImpl.java
└── service/
    ├── AuthService.java
    ├── ProfileService.java
    ├── UserService.java
    ├── QuestionService.java
    ├── AssessmentService.java
    ├── AttemptService.java
    ├── MockInterviewService.java
    ├── AnalyticsService.java
    ├── DashboardService.java
    └── PerformanceReportService.java
```
