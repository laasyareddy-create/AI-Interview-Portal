export const interviewQuestions = {
 react: [
  // MCQ Round

  {
    id: 1,
    type: "mcq",
    question: "What is JSX?",
    options: [
      "Database",
      "Syntax Extension",
      "CSS Framework",
      "API",
    ],
    answer: "Syntax Extension",
  },

  {
    id: 2,
    type: "mcq",
    question:
      "Which hook is used for state management?",
    options: [
      "useEffect",
      "useState",
      "useMemo",
      "useRef",
    ],
    answer: "useState",
  },

  {
    id: 3,
    type: "mcq",
    question:
      "What is the Virtual DOM?",
    options: [
      "Copy of Real DOM",
      "Database",
      "Server",
      "Browser API",
    ],
    answer: "Copy of Real DOM",
  },

  {
    id: 4,
    type: "mcq",
    question:
      "Which hook handles side effects?",
    options: [
      "useState",
      "useEffect",
      "useMemo",
      "useRef",
    ],
    answer: "useEffect",
  },

  {
    id: 5,
    type: "mcq",
    question:
      "What is React.memo used for?",
    options: [
      "Routing",
      "Prevent Unnecessary Re-renders",
      "State Management",
      "API Calls",
    ],
    answer:
      "Prevent Unnecessary Re-renders",
  },

  // Theory Round

  {
    id: 6,
    type: "text",
    question:
      "Explain the difference between useState and useReducer. When would you choose one over the other?",
  },

  {
    id: 7,
    type: "text",
    question:
      "Explain React Reconciliation and how the Virtual DOM improves performance.",
  },

  {
    id: 8,
    type: "text",
    question:
      "What is Prop Drilling? How does Context API help solve it? Mention any drawbacks.",
  },

  // Coding Challenge Round

  {
    id: 9,
    type: "coding",
    question: `React Coding Challenge

Build a Todo Application.

Requirements:

1. Add new tasks
2. Delete tasks
3. Mark tasks as completed
4. Filter completed tasks
5. Use useState hook
6. Create reusable components
7. Display total tasks count
8. Display completed tasks count

Expected Features:

- Clean UI
- Proper component structure
- State management
- Reusable code

Bonus:

- Store tasks in localStorage
- Add edit functionality

Time Limit:
20 Minutes`,
  },
],

javascript: [
  // MCQ Round

  {
    id: 1,
    type: "mcq",
    question:
      "Which keyword creates a constant variable?",
    options: [
      "let",
      "var",
      "const",
      "static",
    ],
    answer: "const",
  },

  {
    id: 2,
    type: "mcq",
    question:
      "What is the result of typeof null?",
    options: [
      "null",
      "object",
      "undefined",
      "string",
    ],
    answer: "object",
  },

  {
    id: 3,
    type: "mcq",
    question:
      "Which method creates a new array from an existing array?",
    options: [
      "map()",
      "push()",
      "pop()",
      "shift()",
    ],
    answer: "map()",
  },

  {
    id: 4,
    type: "mcq",
    question:
      "Which operator checks both value and type?",
    options: [
      "==",
      "=",
      "===",
      "!=",
    ],
    answer: "===",
  },

  {
    id: 5,
    type: "mcq",
    question:
      "What is a closure?",
    options: [
      "Function with access to outer scope",
      "Array method",
      "Loop",
      "Promise",
    ],
    answer:
      "Function with access to outer scope",
  },

  // Theory Round

  {
    id: 6,
    type: "text",
    question:
      "Explain closures in JavaScript with a real-world example.",
  },

  {
    id: 7,
    type: "text",
    question:
      "What is the difference between var, let, and const?",
  },

  {
    id: 8,
    type: "text",
    question:
      "Explain event bubbling and event capturing. When would you use event delegation?",
  },

  // Coding Challenge

  {
    id: 9,
    type: "coding",
    question: `JavaScript Coding Challenge

Build a function that groups users by department.

Input:

[
 { name: "John", dept: "IT" },
 { name: "Sara", dept: "HR" },
 { name: "Alex", dept: "IT" },
 { name: "Priya", dept: "HR" }
]

Expected Output:

{
 IT: [
   { name: "John", dept: "IT" },
   { name: "Alex", dept: "IT" }
 ],
 HR: [
   { name: "Sara", dept: "HR" },
   { name: "Priya", dept: "HR" }
 ]
}

Requirements:

1. Use JavaScript array methods
2. Handle empty arrays
3. Write clean reusable code
4. Explain time complexity

Bonus:

- Sort users alphabetically within each department

Time Limit:
20 Minutes`,
  },
],


  node: [
  // MCQ Round

  {
    id: 1,
    type: "mcq",
    question:
      "Node.js is built on which JavaScript engine?",
    options: [
      "SpiderMonkey",
      "V8",
      "Chakra",
      "Java VM",
    ],
    answer: "V8",
  },

  {
    id: 2,
    type: "mcq",
    question:
      "Which module is used to create an HTTP server?",
    options: [
      "http",
      "server",
      "express",
      "net",
    ],
    answer: "http",
  },

  {
    id: 3,
    type: "mcq",
    question:
      "What is npm?",
    options: [
      "Node Package Manager",
      "Network Package Module",
      "Node Process Manager",
      "New Project Manager",
    ],
    answer: "Node Package Manager",
  },

  {
    id: 4,
    type: "mcq",
    question:
      "Which method is used to read files asynchronously?",
    options: [
      "fs.readFile",
      "fs.read",
      "fs.open",
      "fs.getFile",
    ],
    answer: "fs.readFile",
  },

  {
    id: 5,
    type: "mcq",
    question:
      "What is middleware in Express?",
    options: [
      "Database",
      "Function executed during request-response cycle",
      "API Route",
      "Package Manager",
    ],
    answer:
      "Function executed during request-response cycle",
  },

  // Theory Round

  {
    id: 6,
    type: "text",
    question:
      "Explain the Event Loop in Node.js and why it is important.",
  },

  {
    id: 7,
    type: "text",
    question:
      "What is middleware in Express.js? Explain with an example.",
  },

  {
    id: 8,
    type: "text",
    question:
      "What is the difference between synchronous and asynchronous operations in Node.js?",
  },

  // API Design Challenge

  {
    id: 9,
    type: "coding",
    question: `Node.js Backend Challenge

Design a Student Management REST API.

Requirements:

Routes:

GET /students
GET /students/:id
POST /students
PUT /students/:id
DELETE /students/:id

Student Fields:

- id
- name
- email
- course

Explain:

1. Route Structure
2. Controller Logic
3. Validation
4. Error Handling
5. Folder Structure

Bonus:

- JWT Authentication
- Pagination
- Search API

Time Limit:
25 Minutes`,
  },
],


  aptitude: [
  {
    id: 1,
    type: "mcq",
    question:
      "What is 20% of 250?",
    options: [
      "25",
      "50",
      "75",
      "100",
    ],
    answer: "50",
  },

  {
    id: 2,
    type: "mcq",
    question:
      "If a train travels 120 km in 2 hours, what is its speed?",
    options: [
      "50 km/h",
      "60 km/h",
      "70 km/h",
      "80 km/h",
    ],
    answer: "60 km/h",
  },

  {
    id: 3,
    type: "mcq",
    question:
      "Find the next number: 2, 4, 8, 16, ?",
    options: [
      "24",
      "30",
      "32",
      "36",
    ],
    answer: "32",
  },

  {
    id: 4,
    type: "mcq",
    question:
      "The average of 10, 20 and 30 is?",
    options: [
      "15",
      "20",
      "25",
      "30",
    ],
    answer: "20",
  },

  {
    id: 5,
    type: "mcq",
    question:
    "A shop gives a 10% discount on a ₹500 product. What is the final price?",
  options: [
    "₹400",
    "₹450",
    "₹480",
    "₹490",
  ],
  answer: "₹450",
},

  {
    id: 6,
    type: "mcq",
     question:
    "If the ratio of boys to girls is 3:2 and there are 30 boys, how many girls are there?",
  options: [
    "15",
    "20",
    "25",
    "30",
  ],
  answer: "20",
},
],
  hr: [
  {
    id: 1,
    type: "text",
    question:
      "Tell me about yourself.",
  },

  {
    id: 2,
    type: "text",
    question:
      "Why should we hire you for this role?",
  },

  {
    id: 3,
    type: "text",
    question:
      "Describe a challenge you faced during a project and how you solved it.",
  },

  {
    id: 4,
    type: "text",
    question:
      "Where do you see yourself in the next 5 years?",
  },
],
  communication: [
  {
    id: 1,
    type: "text",
    question:
      "Tell me about a complex idea you had to explain to a colleague. How did you go about explaining it?",
  },

  {
    id: 2,
    type: "text",
    question:
      "A client is upset because a feature delivery has been delayed. How would you communicate the situation professionally?",
  },

  {
    id: 3,
    type: "text",
    question:
      "Imagine you are leading a team meeting. How would you explain a technical problem to team members with different experience levels?",
  },

  {
    id: 4,
    type: "text",
    question:
      "A teammate misunderstands your message and becomes frustrated. How would you resolve the misunderstanding?",
  },
],
};